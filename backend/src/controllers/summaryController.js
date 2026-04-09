import { vaccineData } from '../data/vaccines.js';
import { applyFilters } from '../utils/filters.js';
import {
  computeKPIs,
  marketByRegion,
  marketByYear,
  marketByBrand,
  marketByVaccine,
  cagrByBrand,
  coverageByRegion,
} from '../utils/stats.js';

export function getSummary(req, res) {
  try {
    const { region, brand, year, vaccine } = req.query;
    const filtered = applyFilters(vaccineData, { region, brand, year, vaccine, page: 1, limit: 99999 }).items;

    res.json({
      success: true,
      kpis:             computeKPIs(filtered),
      byRegion:         marketByRegion(filtered),
      byYear:           marketByYear(filtered),
      byBrand:          marketByBrand(filtered),
      byVaccine:        marketByVaccine(filtered),
      cagrByBrand:      cagrByBrand(filtered),
      coverageByRegion: coverageByRegion(filtered),
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
