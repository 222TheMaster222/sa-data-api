# 🛰️ Star Atlas Data API (`sa-data-api`)

**Access live data from the Star Atlas universe — ship stats, fleet info, market prices, and more.**

The Star Atlas Data API is designed for builders, analysts, and power users who want to tap into raw game data for use in spreadsheets, dashboards, or other tools.

---

## 🌌 What You Can Do

- 🛸 **Fetch ship stats**: Pull metadata like cargo capacity, mining rate, and subwarp speed
- 🪐 **Query your fleets**: View fleet metadata
- 💱 **Check marketplace prices**: Track current prices
- ⛏️ **Inspect resource data**: Get hardness and richness of mineable items by sector
- 📊 **Fuel your spreadsheets**: Connect Google Sheets to run real-time analysis on your assets

---

## 🔧 Setup & Usage

### 1. Clone the Repo

```bash
git clone https://github.com/222TheMaster222/sa-data-api.git
cd sa-data-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Develop Locally

```bash
npm run dev
```

Runs the Cloudflare Worker locally using `wrangler`.

### 4. Deploy to Cloudflare

```bash
npm run deploy
```

Make sure your `wrangler.toml` is configured with your Cloudflare account details.

---

## 📊 Spreadsheet Integration

You can use the API directly in Google Sheets via `IMPORTDATA`.

```javascript
=IMPORTDATA("https://your-api-url.com/api/ships")
```

---

## 📘 Documentation

- [API Reference (OpenAPI)](https://your-api-url.com/docs)
- [Google Sheets Integration Guide](docs/google-sheets.md)
- [Changelog](CHANGELOG.md)

---

## 🤝 Community & Support

Built by and for the **Star Atlas community**. Join us on [Discord](https://discord.gg/your-invite) to get support, share feedback, and help shape the roadmap.

---

## 📜 License

MIT License — open for community contributions.
