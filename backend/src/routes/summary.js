import { Router } from 'express';
import { getSummary } from '../controllers/summaryController.js';

const router = Router();

/**
 * GET /api/summary
 * Query params: region, brand, year, vaccine  (same filter set – narrows aggregation)
 */
router.get('/', getSummary);

export default router;
