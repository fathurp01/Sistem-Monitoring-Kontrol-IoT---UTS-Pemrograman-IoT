import mysql from 'mysql2/promise';
import logger from './utils/logger.js';

let pool;

/**
 * Initialize MySQL connection pool
 */
export async function initDatabase() {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'iot_uts',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0
    });

    // Test connection
    const connection = await pool.getConnection();
    logger.info(`✅ MySQL connected to ${process.env.DB_NAME}@${process.env.DB_HOST}`);
    connection.release();
    
    return pool;
  } catch (error) {
    logger.error(`❌ MySQL connection failed: ${error.message}`);
    throw error;
  }
}

/**
 * Get database pool instance
 */
export function getPool() {
  if (!pool) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return pool;
}

/**
 * Insert sensor data into database
 * @param {Object} data - { suhu, humidity, lux, timestamp }
 * @returns {Promise<number>} Inserted ID
 */
export async function insertSensorData(data) {
  const { suhu, humidity, lux, timestamp } = data;
  
  // Use parameterized query to prevent SQL injection
  const sql = `
    INSERT INTO data_sensor (suhu, humidity, lux, timestamp) 
    VALUES (?, ?, ?, COALESCE(?, NOW()))
  `;
  
  try {
    const [result] = await pool.execute(sql, [suhu, humidity, lux, timestamp]);
    logger.info(`📝 Inserted sensor data [ID: ${result.insertId}] - Temp: ${suhu}°C, Humidity: ${humidity}%, Lux: ${lux}`);
    return result.insertId;
  } catch (error) {
    logger.error(`❌ DB Insert failed: ${error.message}`);
    throw error;
  }
}

/**
 * Get analytics data for /api/report/json
 * SQL queries for analytics (as required by assignment)
 */
export async function getAnalyticsData() {
  try {
    // Query 1: Get max, min, avg temperature
    const statsQuery = `
      SELECT 
        MAX(suhu) as suhumax,
        MIN(suhu) as suhumin,
        ROUND(AVG(suhu), 2) as suhurata
      FROM data_sensor
    `;
    const [stats] = await pool.query(statsQuery);
    
    const { suhumax, suhumin, suhurata } = stats[0];
    
    // Query 2: Get rows with max temperature, ordered by humidity DESC
    // Limit controlled by environment variable
    const maxRowsLimit = parseInt(process.env.MAX_ROWS_NILAI_SUHU_MAX || '2', 10);
    
    const maxTempRowsQuery = `
      SELECT 
        id as idx,
        suhu,
        humidity as humid,
        lux as kecerahan,
        DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s') as timestamp
      FROM data_sensor
      WHERE suhu = ${pool.escape(suhumax)}
      ORDER BY humidity DESC
      LIMIT ${maxRowsLimit}
    `;
    
    const [maxTempRows] = await pool.query(maxTempRowsQuery);
    
    // Query 3: Extract distinct month-year from the selected rows
    // Format: M-YYYY (e.g., "9-2010", "5-2011")
    const monthYearSet = new Set();
    maxTempRows.forEach(row => {
      const date = new Date(row.timestamp);
      const month = date.getMonth() + 1; // JavaScript months are 0-indexed
      const year = date.getFullYear();
      monthYearSet.add(`${month}-${year}`);
    });
    
    const month_year_max = Array.from(monthYearSet).map(my => ({ month_year: my }));
    
    return {
      suhumax,
      suhumin,
      suhurata,
      nilai_suhu_max_humid_max: maxTempRows,
      month_year_max
    };
  } catch (error) {
    logger.error(`❌ Analytics query failed: ${error.message}`);
    throw error;
  }
}

/**
 * Get recent sensor data
 * @param {number} limit - Number of records to fetch
 */
export async function getRecentData(limit = 50) {
  const sql = `
    SELECT 
      id,
      suhu,
      humidity,
      lux,
      DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s') as timestamp
    FROM data_sensor
    ORDER BY timestamp DESC
    LIMIT ${parseInt(limit, 10)}
  `;
  
  const [rows] = await pool.query(sql);
  return rows;
}

/**
 * Get single sensor record by ID
 * @param {number} id
 */
export async function getSensorById(id) {
  const sql = `
    SELECT 
      id,
      suhu,
      humidity,
      lux,
      DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s') as timestamp
    FROM data_sensor
    WHERE id = ?
  `;
  
  const [rows] = await pool.execute(sql, [id]);
  return rows[0] || null;
}

/**
 * Close database connection pool
 */
export async function closeDatabase() {
  if (pool) {
    await pool.end();
    logger.info('🔌 MySQL connection pool closed');
  }
}
