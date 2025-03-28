import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import OpenAI from "openai";
import { Connection } from "@solana/web3.js";
import { createAppContext, getShips } from "sage";

export class Query extends OpenAPIRoute {
    schema = {
        tags: ["Query"],
        summary: "Returns live token prices in CSV format",
        request: {
            query: z.object({
                q: z.string(),
            }),
        },
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
        const { OPENAI_API_KEY, }: Env = c.env;
        const data = await this.getValidatedData<typeof this.schema>();

        const { q } = data.query

        console.log('query: ' + q)

        const connection = new Connection(c.env.RPC_URL, { commitment: "confirmed" })
        const context = createAppContext(connection)

        const client = new OpenAI({ apiKey: OPENAI_API_KEY });


        // Construct a context using available data points including the actual metadata sample.
        const prompt = `
Database Schema:
Table: Ships
Columns:
- Name (TEXT)
- Class (INTEGER)
- CargoCapacity (INTEGER)
- FuelCapacity (INTEGER)
- AmmoCapacity (INTEGER)
- SubwarpSpeed (REAL)
- WarpSpeed (REAL)
- MaxWarpDistance (REAL)
- WarpCoolDown (INTEGER)
- WarpFuelConsumptionRate (REAL)
- SubwarpFuelConsumptionRate (REAL)
- PlanetExitFuelAmount (INTEGER)

Table: MarketPrices
Columns:
- ShipName (TEXT)
- Price (REAL)

User Request:
"${q}"

Please generate a SQL query to satisfy this request.
`;


        // Call the LLM endpoint to generate the CSV output.
        const completion = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are an expert data transformation assistant." },
                { role: "user", content: prompt },
            ],
        });

        console.log(JSON.stringify(completion))

        return new Response(completion.choices[0].message.content, {
            headers: {
                "Content-Type": "text/plain",
                // Optional: cache for 60s
                // "Cache-Control": "public, max-age=60"
            },
        });
    }
}
