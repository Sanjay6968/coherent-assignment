
# VaxInsight – Health Insight Dashboard
### Global Vaccine Market Analytics Platform

[![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue?logo=react)](https://coherent-assignment-five.vercel.app/)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green?logo=node.js)](https://coherent-assignment-dk7e.onrender.com/api/vaccines)
[![License](https://img.shields.io/badge/License-MIT-lightgrey)](LICENSE)

---

## 🔗 Deployed URLs

| Service  | URL |
|----------|-----|
| **Frontend** | `https://coherent-assignment-five.vercel.app/` |
| **Backend**  | `https://coherent-assignment-dk7e.onrender.com/api/vaccines` |
| **API Health** | `https://coherent-assignment-dk7e.onrender.com/api/health` |

---

## 📸 Screenshots


> <img width="1918" height="878" alt="image" src="https://github.com/user-attachments/assets/f2d3c259-6462-454f-830a-41244b30b04e" />

> <img width="1898" height="863" alt="image" src="https://github.com/user-attachments/assets/bfd6c5e3-3b03-47d3-b478-46c3da4fa2df" />
<img width="1906" height="853" alt="image" src="https://github.com/user-attachments/assets/c1a1500c-d998-4d56-a5e9-ab5c156606f6" />
<img width="1918" height="988" alt="image" src="https://github.com/user-attachments/assets/fbef8340-bad3-489b-8733-151e6167f0cb" />



---

## 🚀 Features

### Frontend
- **3-tab navigation**: Overview · Analytics · Data Explorer
- **6 KPI cards**: Total Market ($B), Doses, CAGR %, Avg Price, Coverage %, Record Count
- **7 interactive charts**: Bar, Area, Pie, Horizontal Bar, Radar, Line, Coverage Bar (Recharts)
- **GenAI insight banner**: auto-generated market narrative from live data
- **Live filters**: Region · Brand · Vaccine Type · Year (all linked)
- **Responsive design** with light/dark mode toggle
- **Paginated data table** with sortable columns and debounced search

### Backend
- `GET /api/vaccines` – filtered, sorted, paginated vaccine records
- `GET /api/summary`  – KPIs + 6 aggregation datasets for charts
- `GET /api/health`   – service health check
- Modular structure: `routes/` → `controllers/` → `utils/`
- 120 synthetic records across 5 regions, 9 brands, 4 vaccine types, 2020–2023

---

## 🏗 Project Structure

```
Coherent/
├── backend/
│   └── src/
│       ├── server.js
│       ├── data/
│       │   └── vaccines.js          # 120 synthetic records
│       ├── routes/
│       │   ├── vaccines.js
│       │   └── summary.js
│       ├── controllers/
│       │   ├── vaccineController.js
│       │   └── summaryController.js
│       └── utils/
│           ├── filters.js           # filter, sort, paginate
│           └── stats.js             # KPI & chart aggregations
└── frontend/
    └── src/
        ├── App.jsx
        ├── api/     client.js
        ├── hooks/   useFetch.js · useFilters.js
        └── components/
            ├── Sidebar.jsx
            ├── Header.jsx
            ├── KPIGrid.jsx
            ├── InsightBanner.jsx
            ├── Charts.jsx           # 7 chart components
            ├── DataTable.jsx
            ├── OverviewPage.jsx
            ├── ChartsPage.jsx
            └── TablePage.jsx
```

---

## 🛠 Local Setup

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### 1 – Clone
```bash
git clone https://github.com/YOUR_USERNAME/coherent-vaxinsight.git
cd coherent-vaxinsight
```

### 2 – Backend
```bash
cd backend
npm install
npm run dev          # starts on http://localhost:5000
```

### 3 – Frontend
```bash
cd frontend
npm install
npm run dev          # starts on http://localhost:5173
```

The Vite dev-server proxies `/api` → `http://localhost:5000` automatically.

---

## 📡 API Reference

### `GET /api/vaccines`

| Param    | Type   | Example            | Description                      |
|----------|--------|--------------------|----------------------------------|
| region   | string | `North America`    | Filter by region                 |
| brand    | string | `Pfizer-BioNTech`  | Filter by brand                  |
| vaccine  | string | `COVID-19`         | Filter by vaccine type           |
| year     | number | `2022`             | Filter by year                   |
| search   | string | `india`            | Full-text search (country/brand) |
| page     | number | `1`                | Page number (default: 1)         |
| limit    | number | `20`               | Records per page (max: 100)      |
| sortBy   | string | `marketSize`       | Sort column                      |
| sortDir  | string | `desc`             | Sort direction (`asc` / `desc`)  |

**Response:**
```jsonc
{
  "success": true,
  "data": [ /* records */ ],
  "meta": { "total": 120, "page": 1, "pages": 6, "limit": 20 },
  "filters": { "regions": [], "brands": [], "vaccines": [], "years": [] }
}
```

---

### `GET /api/summary`

Same filter params as above (no pagination).

**Response:**
```jsonc
{
  "success": true,
  "kpis": { "totalMarket": 12345, "avgCagr": 11.2, ... },
  "byRegion": [ { "region": "...", "marketSize": 0, "doses": 0 } ],
  "byYear": [ { "year": 2020, "marketSize": 0, "avgCagr": 0 } ],
  "byBrand": [...],
  "byVaccine": [...],
  "cagrByBrand": [...],
  "coverageByRegion": [...]
}
```

---

## ☁️ Deployment

### Backend → Render

1. Push repo to GitHub
2. New **Web Service** on [render.com](https://render.com)
3. **Root Directory**: `backend`
4. **Build Command**: `npm install`
5. **Start Command**: `node src/server.js`
6. Add env var: `PORT=10000`

### Frontend → Vercel

1. New project on [vercel.com](https://vercel.com), import GitHub repo
2. **Root Directory**: `frontend`
3. **Framework preset**: Vite
4. Add env var: `VITE_API_URL=https://coherent-assignment-dk7e.onrender.com/api`

---

## 🎁 Bonus Features Implemented

| Feature | Details |
|---------|---------|
| **Pagination** | Server-side with page/limit, client-side controls |
| **Sorting** | Column-click sorting with direction toggle |
| **Debounced Search** | 350 ms debounce on table search input |
| **GenAI Insight** | Dynamic market narrative generated from live KPIs |
| **7 Chart Types** | Bar, Area, Pie, Radar, Horizontal Bar, Line, Coverage |
| **Light/Dark Mode** | CSS custom-property theme switching |
| **AbortController** | Cancels stale API requests on rapid filter changes |

---

## 📄 License

MIT © 2024

---

## 🚀 Features

### Frontend
- **3-tab navigation**: Overview · Analytics · Data Explorer
- **6 KPI cards**: Total Market ($B), Doses, CAGR %, Avg Price, Coverage %, Record Count
- **7 interactive charts**: Bar, Area, Pie, Horizontal Bar, Radar, Line, Coverage Bar (Recharts)
- **GenAI insight banner**: auto-generated market narrative from live data
- **Live filters**: Region · Brand · Vaccine Type · Year (all linked)
- **Responsive design** with light/dark mode toggle
- **Paginated data table** with sortable columns and debounced search

### Backend
- `GET /api/vaccines` – filtered, sorted, paginated vaccine records
- `GET /api/summary`  – KPIs + 6 aggregation datasets for charts
- `GET /api/health`   – service health check
- Modular structure: `routes/` → `controllers/` → `utils/`
- 120 synthetic records across 5 regions, 9 brands, 4 vaccine types, 2020–2023

---

## 🏗 Project Structure

```
Coherent/
├── backend/
│   └── src/
│       ├── server.js
│       ├── data/
│       │   └── vaccines.js          # 120 synthetic records
│       ├── routes/
│       │   ├── vaccines.js
│       │   └── summary.js
│       ├── controllers/
│       │   ├── vaccineController.js
│       │   └── summaryController.js
│       └── utils/
│           ├── filters.js           # filter, sort, paginate
│           └── stats.js             # KPI & chart aggregations
└── frontend/
    └── src/
        ├── App.jsx
        ├── api/     client.js
        ├── hooks/   useFetch.js · useFilters.js
        └── components/
            ├── Sidebar.jsx
            ├── Header.jsx
            ├── KPIGrid.jsx
            ├── InsightBanner.jsx
            ├── Charts.jsx           # 7 chart components
            ├── DataTable.jsx
            ├── OverviewPage.jsx
            ├── ChartsPage.jsx
            └── TablePage.jsx
```

---

## 🛠 Local Setup

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### 1 – Clone
```bash
git clone https://github.com/YOUR_USERNAME/coherent-vaxinsight.git
cd coherent-vaxinsight
```

### 2 – Backend
```bash
cd backend
npm install
npm run dev          # starts on http://localhost:5000
```

### 3 – Frontend
```bash
cd frontend
npm install
npm run dev          # starts on http://localhost:5173
```

The Vite dev-server proxies `/api` → `http://localhost:5000` automatically.

---

## 📡 API Reference

### `GET /api/vaccines`

| Param    | Type   | Example            | Description                      |
|----------|--------|--------------------|----------------------------------|
| region   | string | `North America`    | Filter by region                 |
| brand    | string | `Pfizer-BioNTech`  | Filter by brand                  |
| vaccine  | string | `COVID-19`         | Filter by vaccine type           |
| year     | number | `2022`             | Filter by year                   |
| search   | string | `india`            | Full-text search (country/brand) |
| page     | number | `1`                | Page number (default: 1)         |
| limit    | number | `20`               | Records per page (max: 100)      |
| sortBy   | string | `marketSize`       | Sort column                      |
| sortDir  | string | `desc`             | Sort direction (`asc` / `desc`)  |

**Response:**
```jsonc
{
  "success": true,
  "data": [ /* records */ ],
  "meta": { "total": 120, "page": 1, "pages": 6, "limit": 20 },
  "filters": { "regions": [], "brands": [], "vaccines": [], "years": [] }
}
```

---

### `GET /api/summary`

Same filter params as above (no pagination).

**Response:**
```jsonc
{
  "success": true,
  "kpis": { "totalMarket": 12345, "avgCagr": 11.2, ... },
  "byRegion": [ { "region": "...", "marketSize": 0, "doses": 0 } ],
  "byYear": [ { "year": 2020, "marketSize": 0, "avgCagr": 0 } ],
  "byBrand": [...],
  "byVaccine": [...],
  "cagrByBrand": [...],
  "coverageByRegion": [...]
}
```

---

## ☁️ Deployment

### Backend → Render

1. Push repo to GitHub
2. New **Web Service** on [render.com](https://render.com)
3. **Root Directory**: `backend`
4. **Build Command**: `npm install`
5. **Start Command**: `node src/server.js`
6. Add env var: `PORT=10000`

### Frontend → Vercel

1. New project on [vercel.com](https://vercel.com), import GitHub repo
2. **Root Directory**: `frontend`
3. **Framework preset**: Vite
4. Add env var: `VITE_API_URL=https://YOUR-RENDER-URL.onrender.com/api`

---

##  Bonus Features Implemented

| Feature | Details |
|---------|---------|
| **Pagination** | Server-side with page/limit, client-side controls |
| **Sorting** | Column-click sorting with direction toggle |
| **Debounced Search** | 350 ms debounce on table search input |
| **GenAI Insight** | Dynamic market narrative generated from live KPIs |
| **7 Chart Types** | Bar, Area, Pie, Radar, Horizontal Bar, Line, Coverage |
| **Light/Dark Mode** | CSS custom-property theme switching |
| **AbortController** | Cancels stale API requests on rapid filter changes |

---

## 📄 License

MIT © 2024
