import express from 'express';
import { getAnalyticsData } from '../db.js';
import logger from '../utils/logger.js';

const router = express.Router();

/**
 * GET /api/report/json
 * Returns analytics data in exact format specified by UTS requirements
 * 
 * Response format:
 * {
 *   "suhumax": 36,
 *   "suhumin": 21,
 *   "suhurata": 28.35,
 *   "nilai_suhu_max_humid_max": [
 *     { "idx": 101, "suhu": 36, "humid": 36, "kecerahan": 25, "timestamp": "2010-09-18 07:23:48" }
 *   ],
 *   "month_year_max": [
 *     { "month_year": "9-2010" }
 *   ]
 * }
 */
router.get('/json', async (req, res, next) => {
  try {
    logger.info('📊 Request: GET /api/report/json');
    
    const analyticsData = await getAnalyticsData();
    
    // Ensure response matches exact format
    const response = {
      suhumax: analyticsData.suhumax,
      suhumin: analyticsData.suhumin,
      suhurata: analyticsData.suhurata,
      nilai_suhu_max_humid_max: analyticsData.nilai_suhu_max_humid_max,
      month_year_max: analyticsData.month_year_max
    };
    
    logger.info(`✅ Analytics computed: suhumax=${response.suhumax}, suhumin=${response.suhumin}, suhurata=${response.suhurata}`);
    
    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
