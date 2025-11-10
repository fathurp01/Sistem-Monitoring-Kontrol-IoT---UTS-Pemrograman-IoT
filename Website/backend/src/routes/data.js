import express from 'express';
import { getRecentData, getSensorById } from '../db.js';
import logger from '../utils/logger.js';

const router = express.Router();

/**
 * GET /api/data/recent?limit=50
 * Returns recent sensor data records
 */
router.get('/recent', async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit || '50', 10);
    
    if (limit < 1 || limit > 1000) {
      return res.status(400).json({ 
        error: 'Invalid limit parameter. Must be between 1 and 1000.' 
      });
    }
    
    logger.info(`📊 Request: GET /api/data/recent?limit=${limit}`);
    
    const data = await getRecentData(limit);
    
    res.json({
      count: data.length,
      data
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/data/:id
 * Returns single sensor record by ID
 */
router.get('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID parameter' });
    }
    
    logger.info(`📊 Request: GET /api/data/${id}`);
    
    const record = await getSensorById(id);
    
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }
    
    res.json(record);
  } catch (error) {
    next(error);
  }
});

export default router;
