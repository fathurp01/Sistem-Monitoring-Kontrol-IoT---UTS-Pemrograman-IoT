import React from 'react';

export default function DataTable({ data }) {
  if (!data || !data.nilai_suhu_max_humid_max || data.nilai_suhu_max_humid_max.length === 0) {
    return (
      <div className="data-table-container">
        <h2>Max Temperature Records (Sorted by Humidity)</h2>
        <p className="no-data">No data available</p>
      </div>
    );
  }

  const rows = data.nilai_suhu_max_humid_max;

  return (
    <div className="data-table-container">
      <h2>Max Temperature Records (Sorted by Humidity)</h2>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Temperature (°C)</th>
              <th>Humidity (%)</th>
              <th>Light (Lux)</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.idx}>
                <td>{row.idx}</td>
                <td className="temp-cell">{row.suhu}</td>
                <td className="humid-cell">{row.humid}</td>
                <td>{row.kecerahan}</td>
                <td className="timestamp-cell">{row.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {data.month_year_max && data.month_year_max.length > 0 && (
        <div className="month-year-section">
          <h3>Months Represented:</h3>
          <div className="month-year-tags">
            {data.month_year_max.map((item, index) => (
              <span key={index} className="month-tag">
                {item.month_year}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
