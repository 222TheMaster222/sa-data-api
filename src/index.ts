import { fromHono } from "chanfana";
import { Hono } from "hono";
import { ShipList } from "endpoints/shipList";
import { MineItemList } from "endpoints/mineItemList";
import { ResourceList } from "endpoints/resourceList";
import { SectorList } from "endpoints/sectorList";
import { FleetList } from "endpoints/fleetList";
import { TokenPriceList } from "endpoints/tokenPriceList";
import { MarketPricesList } from "endpoints/marketPricesList";
import { RecipeList } from "endpoints/recipeList";
import { ContractList } from "endpoints/contractList";

// Start a Hono app
const app = new Hono();

// Setup OpenAPI registry
const openapi = fromHono(app, {
	docs_url: "/",
});

// Register OpenAPI endpoints

openapi.get("/api/contracts", ContractList);
openapi.get("/api/fleets", FleetList);
openapi.get("/api/market-prices", MarketPricesList);
openapi.get("/api/mine-items", MineItemList);
openapi.get("/api/recipes", RecipeList);
openapi.get("/api/resources", ResourceList);
openapi.get("/api/sectors", SectorList);
openapi.get("/api/ships", ShipList);
openapi.get("/api/token-prices", TokenPriceList);

// Export the Hono app
export default app;
