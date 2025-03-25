import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Connection, PublicKey } from "@solana/web3.js";
import { GmClientService, Order, OrderSide } from "@staratlas/factory";
import nftMetadata from '../data/nfts.json';

const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
const ATLAS_MINT = new PublicKey('ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx');
const GALACTIC_MARKETPLACE_PROGRAM_ID = new PublicKey('traderDnaR5w6Tcoi3NFm53i48FTDNbGjBSZwWXDRrg');

type MarketPriceSummary = {
	name: string
	midpoint: number | null
	sell: number | null
	buy: number | null
	spread: number | null
	symbol: string
	itemType: string
	class: string
	rarity: string
	tier?: number
	category?: string
}

type OrderSummary = {
	name: string;
	mint: string;
	buyOrders: Order[];
	sellOrders: Order[];
	nft: Nft
};

type Nft = {
	name: string;
	mint: string;
	symbol: string;
	attributes: {
		itemType: string
		class: string
		tier?: number
		rarity: string
		category?: string
	}
	// optionally: symbol, description, image, etc.
};

function getNftInfoByMint(mint: string): Nft | undefined {
	return nftMetadata.find(item => item.mint === mint);
}

export class MarketPricesList extends OpenAPIRoute {
	schema = {
		tags: ["Market Prices"],
		summary: "List Market Prices",
		query: z.object({
			itemType: z.string().optional(),
			class: z.string().optional(),
			tier: z.string().optional(), // could parse to number later
			rarity: z.string().optional(),
			category: z.string().optional(),
		}),
		responses: {
			"200": {
				description: "Returns a list of market prices",
				content: {
					"text/csv": {
						schema: z.string(),
					},
				},
			},
		},
	};

	async handle(c) {
		const query = c.req.query();
		const filterItemTypes = parseCsvParam(query.itemType);     // e.g. "resource" → ["resource"]
		const filterClasses = parseCsvParam(query.class);        // e.g. "common,rare" → ["common", "rare"]
		const filterTiers = parseCsvParam(query.tier);         // e.g. "1,2" → ["1", "2"]
		const filterRarities = parseCsvParam(query.rarity);
		const filterCategories = parseCsvParam(query.category);

		const connection = new Connection(c.env.RPC_URL, { commitment: "confirmed" })

		const clientService = new GmClientService();

		const orders = await clientService.getOpenOrdersForCurrency(
			connection,
			ATLAS_MINT,
			GALACTIC_MARKETPLACE_PROGRAM_ID,
		);

		const marketMap = new Map<string, OrderSummary>();

		for (const order of orders) {
			if (!marketMap.has(order.orderMint)) {
				const nft = getNftInfoByMint(order.orderMint);
				if (nft) {
					marketMap.set(order.orderMint, {
						name: nft.name ?? order.orderMint,
						mint: order.orderMint,
						buyOrders: [],
						sellOrders: [],
						nft,
					});
				}
			}

			const market = marketMap.get(order.orderMint);
			if (!market) continue;

			if (order.orderType === OrderSide.Buy) {
				market.buyOrders.push(order);
			} else if (order.orderType === OrderSide.Sell) {
				market.sellOrders.push(order);
			}
		}

		const marketPrices: MarketPriceSummary[] = [];

		for (const { name, buyOrders, sellOrders, nft } of marketMap.values()) {
			const bestBuy: Order | undefined = buyOrders.sort((a, b) => b.price.sub(a.price).toNumber())[0];
			const bestSell: Order | undefined = sellOrders.sort((a, b) => a.price.sub(b.price).toNumber())[0];

			const buy = bestBuy?.uiPrice ?? null;
			const sell = bestSell?.uiPrice ?? null;
			const midpoint = buy !== null && sell !== null ? (buy + sell) / 2 : null;
			const spread = buy !== null && sell !== null ? sell - buy : null;

			marketPrices.push({
				name,
				midpoint,
				sell,
				buy,
				spread,
				symbol: nft.symbol,
				itemType: nft.attributes.itemType,
				class: nft.attributes.class,
				tier: nft.attributes.tier,
				rarity: nft.attributes.rarity,
				category: nft.attributes.category,
			});
		}

		const filtered = marketPrices.filter(p => {
			if (filterItemTypes && !filterItemTypes.includes(p.itemType)) return false;
			if (filterClasses && !filterClasses.includes(p.class)) return false;
			if (filterTiers && !filterTiers.includes(String(p.tier))) return false;
			if (filterRarities && !filterRarities.includes(p.rarity)) return false;
			if (filterCategories && !filterCategories.includes(p.category ?? '')) return false;
			return true;
		});

		const csv = marketPricesToCsv(filtered.sort((a, b) => a.name.localeCompare(b.name)));

		return new Response(csv, {
			headers: {
				'Content-Type': 'text/plain',
				//'Cache-Control': 'public, max-age=300', // cache 5 min
			},
		});
	}
}

function marketPricesToCsv(marketPrices: MarketPriceSummary[]): string {

	// Step 3: Convert to CSV rows
	const rows = [
		[
			'Name', 'Price (Midpoint)', 'Price (Sell)', 'Price (Buy)', 'Spread', 'Symbol',
			'Item Type', 'Class', 'Tier', 'Rarity', 'Category'
		], // CSV header
		...marketPrices.map(mp => {
			return [
				mp.name,
				mp.midpoint,
				mp.sell,
				mp.buy,
				mp.spread,
				mp.symbol,
				mp.itemType,
				mp.class,
				mp.tier,
				mp.rarity,
				mp.category
			]
		}),
	];

	return rows.map(row => row.join(',')).join('\n');
}

function parseCsvParam(value?: string): string[] | undefined {
	if (!value) return undefined;
	return value.split(',').map(s => s.trim()).filter(Boolean);
}