import { OpenAPIRoute } from "chanfana";
import { z } from "zod";

const tokenMints: Record<string, string> = {
    SOL: "So11111111111111111111111111111111111111112",
    ATLAS: "ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx",
    POLIS: "poLisWXnNRwC6oBu1vHiuKQzFjGL4XDSu4g9qjz9qVk"
};

type TokenPrice = {
    usd: number;
};

export class TokenPriceList extends OpenAPIRoute {
    schema = {
        tags: ["Token Prices"],
        summary: "Returns live token prices in CSV format",
        responses: {
            "200": {
                description: "Returns a CSV of token prices",
                content: {
                    "text/csv": {
                        schema: z.string(),
                    },
                },
            },
        },
    };

    async handle(c) {
        const { COINGECKO_API_KEY }: Env = c.env;
        const mints = Object.values(tokenMints).join(",");
        const url = `https://api.coingecko.com/api/v3/simple/token_price/solana?vs_currencies=usd&contract_addresses=${mints}&x_cg_demo_api_key=${COINGECKO_API_KEY}`;

        const res = await fetch(url, {
            method: "GET",
            headers: { accept: "application/json" }
        });

        console.log('coingecko response', res.statusText)

        const rows = [["Token", "Price (USD)"]];

        if (res.ok) {
            const data: Record<string, TokenPrice> = await res.json();

            const mintToSymbol = Object.entries(tokenMints).reduce((acc, [symbol, mint]) => {
                acc[mint] = symbol;
                return acc;
            }, {} as Record<string, string>);

            for (const [mint, price] of Object.entries(data)) {
                const symbol = mintToSymbol[mint] ?? mint;
                rows.push([symbol, price.usd.toString()]);
            }

            // sort by token name
            rows.splice(1, rows.length - 1, ...rows.slice(1).sort((a, b) => a[0].localeCompare(b[0])));
        }

        const csv = rows.map(r => r.join(",")).join("\n");

        return new Response(csv, {
            headers: {
                "Content-Type": "text/plain",
                // Optional: cache for 60s
                // "Cache-Control": "public, max-age=60"
            },
        });
    }
}
