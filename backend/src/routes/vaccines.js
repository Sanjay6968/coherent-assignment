import { Router } from 'express';
import { getVaccines } from '../controllers/vaccineController.js';

const router = Router();

/**
 * GET /api/vaccines
 * Query params: region, brand, year, vaccine, search, page, limit, sortBy, sortDir
 */
router.get('/', getVaccines);

export default router;
