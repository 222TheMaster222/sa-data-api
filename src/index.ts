import { fromHono } from "chanfana";
import { Hono } from "hono";
import { ShipList } from "endpoints/shipList";
import { MineItemList } from "endpoints/mineItemList";
import { ResourceList } from "endpoints/resourceList";
import { SectorList } from "endpoints/sectorList";

// Start a Hono app
const app = new Hono();

// Setup OpenAPI registry
const openapi = fromHono(app, {
	docs_url: "/",
});

// Register OpenAPI endpoints

openapi.get("/api/mineitems", MineItemList);
openapi.get("/api/sectors", SectorList);
openapi.get("/api/ships", ShipList);
openapi.get("/api/resources", ResourceList);

// Export the Hono app
export default app;
