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
	midpoint: number
	sell: number
	buy: number
	spread: number
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
			if (!buyOrders.length || !sellOrders.length) continue;

			const bestBuy = buyOrders.sort((a, b) => b.price.sub(a.price).toNumber())[0];
			const bestSell = sellOrders.sort((a, b) => a.price.sub(b.price).toNumber())[0];

			const midpoint = (bestBuy.uiPrice + bestSell.uiPrice) / 2;
			const spread = bestSell.uiPrice - bestBuy.uiPrice;

			marketPrices.push({
				name,
				midpoint,
				sell: bestSell.uiPrice,
				buy: bestBuy.uiPrice,
				spread,
				symbol: nft.symbol,
				itemType: nft.attributes.itemType,
				class: nft.attributes.class,
				tier: nft.attributes.tier,
				rarity: nft.attributes.rarity,
				category: nft.attributes.category,
			});
		}

		const csv = marketPricesToCsv(marketPrices.sort((a, b) => a.name.localeCompare(b.name)));

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
