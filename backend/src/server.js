import express from 'express';
import cors    from 'cors';
import vaccineRoutes from './routes/vaccines.js';
import summaryRoutes from './routes/summary.js';

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/* ── Routes ── */
app.use('/api/vaccines', vaccineRoutes);
app.use('/api/summary',  summaryRoutes);

/* ── Health check ── */
app.get('/api/health', (_req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

/* ── 404 fallback ── */
app.use((_req, res) => res.status(404).json({ success: false, error: 'Route not found' }));

app.listen(PORT, () => {
  console.log(`✅  VaxInsight API running → http://localhost:${PORT}`);
});
