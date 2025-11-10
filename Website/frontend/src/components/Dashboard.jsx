import React from 'react';

export default function Dashboard({ data }) {
  if (!data) {
    return (
      <div className="dashboard">
        <div className="loading">Loading analytics...</div>
      </div>
    );
  }

  const { suhumax, suhumin, suhurata } = data;

  return (
    <div className="dashboard">
      <h2>Temperature Analytics</h2>
      <div className="stats-grid">
        <div className="stat-card max">
          <div className="stat-label">Maximum Temperature</div>
          <div className="stat-value">{suhumax}°C</div>
        </div>
        
        <div className="stat-card min">
          <div className="stat-label">Minimum Temperature</div>
          <div className="stat-value">{suhumin}°C</div>
        </div>
        
        <div className="stat-card avg">
          <div className="stat-label">Average Temperature</div>
          <div className="stat-value">{suhurata}°C</div>
        </div>
      </div>
    </div>
  );
}
