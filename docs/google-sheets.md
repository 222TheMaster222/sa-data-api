# 📊 Using Star Atlas Data API with Google Sheets

This guide shows you how to connect your **Star Atlas Data API** endpoints to **Google Sheets** for easy, real-time access to ship stats, fleets, markets, and more.

---

## 🚀 Method: IMPORTDATA

Use `IMPORTDATA` when the API returns CSV or TSV data.

```excel
=IMPORTDATA("https://your-api-url.com/v1/ships.csv")
```

> ✅ Fast and simple  
> ❌ Only works with text-based formats (CSV/TSV)

---

## 🛠️ Example Endpoints

| Data Type         | Endpoint URL (CSV)                                            |
|-------------------|---------------------------------------------------------------|
| Ships Metadata    | `https://your-api-url.com/api/ships.csv`                       |
| Fleet Info        | `https://your-api-url.com/api/fleets.csv?owner=YOUR_PLAYER_PROFILE`   |
| Mining Richness   | `https://your-api-url.com/api/resources.csv`     |

---

## ✅ Tips

- Always use HTTPS endpoints
- Consider using Sheets triggers for scheduled updates (e.g. every hour)
