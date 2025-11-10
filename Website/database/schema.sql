-- UTS IoT Database Schema
-- Create database if not exists
CREATE DATABASE IF NOT EXISTS iot_uts;
USE iot_uts;

-- Drop table if exists (for clean setup)
DROP TABLE IF EXISTS data_sensor;

-- Create data_sensor table
CREATE TABLE data_sensor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    suhu FLOAT NOT NULL,
    humidity FLOAT NOT NULL,
    lux INT NOT NULL,
    timestamp DATETIME NOT NULL,
    INDEX idx_timestamp (timestamp),
    INDEX idx_suhu (suhu),
    INDEX idx_humidity (humidity)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample data with varying months and years
INSERT INTO data_sensor (suhu, humidity, lux, timestamp) VALUES
-- September 2010 - High temp records
(36, 36, 25, '2010-09-18 07:23:48'),
(36, 35, 30, '2010-09-20 10:15:22'),
(35, 34, 28, '2010-09-25 14:30:10'),

-- May 2011 - High temp records
(36, 36, 27, '2011-05-02 12:29:34'),
(36, 34, 29, '2011-05-15 16:45:00'),

-- January 2011 - Low temp records
(21, 45, 15, '2011-01-10 08:00:00'),
(22, 50, 18, '2011-01-12 09:30:00'),

-- July 2011 - Medium temp records
(28, 40, 22, '2011-07-05 11:20:00'),
(29, 38, 24, '2011-07-20 13:10:00'),
(27, 42, 20, '2011-07-25 15:00:00'),

-- December 2010 - Low temp records
(23, 48, 16, '2010-12-05 07:00:00'),
(24, 46, 19, '2010-12-15 08:30:00'),

-- March 2011 - Medium temp records
(26, 44, 21, '2011-03-10 10:00:00'),
(28, 41, 23, '2011-03-20 12:00:00'),
(25, 45, 20, '2011-03-25 14:00:00'),

-- August 2011 - High temp records
(35, 33, 26, '2011-08-05 13:00:00'),
(34, 35, 25, '2011-08-15 14:30:00'),

-- Recent data (current year for testing)
(30, 39, 24, NOW() - INTERVAL 2 DAY),
(31, 38, 25, NOW() - INTERVAL 1 DAY),
(32, 37, 26, NOW());

-- Verify data inserted
SELECT COUNT(*) as total_records FROM data_sensor;
SELECT MIN(suhu) as min_temp, MAX(suhu) as max_temp, AVG(suhu) as avg_temp FROM data_sensor;
