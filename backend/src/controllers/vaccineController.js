import { vaccineData } from '../data/vaccines.js';
import { applyFilters, getDistinctValues } from '../utils/filters.js';

export function getVaccines(req, res) {
  try {
    const { region, brand, year, vaccine, search, page, limit, sortBy, sortDir } = req.query;
    const result = applyFilters(vaccineData, { region, brand, year, vaccine, search, page, limit, sortBy, sortDir });

    res.json({
      success: true,
      data:    result.items,
      meta: {
        total:  result.total,
        page:   result.page,
        pages:  result.pages,
        limit:  result.limit,
      },
      filters: {
        regions:  getDistinctValues(vaccineData, 'region'),
        brands:   getDistinctValues(vaccineData, 'brand'),
        vaccines: getDistinctValues(vaccineData, 'vaccine'),
        years:    getDistinctValues(vaccineData, 'year'),
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
