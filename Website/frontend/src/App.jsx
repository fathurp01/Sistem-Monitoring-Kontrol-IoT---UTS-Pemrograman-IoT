import React, { useState, useEffect } from 'react';
import api from './services/api';

function App() {
  const [reportData, setReportData] = useState(null);
  const [recentData, setRecentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pumpStatus, setPumpStatus] = useState('OFF');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [reportRes, recentRes, pumpRes] = await Promise.all([
        api.getReport(),
        api.getRecentData(10),
        api.getPumpStatus()
      ]);
      
      setReportData(reportRes.data);
      // API returns { count, data }, so we need recentRes.data.data
      setRecentData(Array.isArray(recentRes.data.data) ? recentRes.data.data : []);
      setPumpStatus(pumpRes.data.status);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePumpControl = async (action) => {
    try {
      setMessage('⏳ Mengirim perintah ke pompa...');
      await api.controlPump(action);
      
      // Don't immediately set status, wait for MQTT to update it
      // The status will be updated by the next fetchData() call
      setMessage(`✅ Perintah ${action} berhasil dikirim`);
      
      // Fetch updated status after a short delay
      setTimeout(async () => {
        try {
          const pumpRes = await api.getPumpStatus();
          setPumpStatus(pumpRes.data.status);
          setMessage(`✅ Pompa berhasil di-${action}`);
        } catch (err) {
          console.error('Failed to fetch pump status:', err);
        }
      }, 500);
      
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading && !reportData) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <h2 style={{ color: '#0f172a', marginTop: '20px', fontSize: '16px', fontWeight: '500' }}>Loading data...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', maxWidth: '500px' }}>
          <h2 style={{ color: '#dc2626', margin: '0 0 20px 0', fontSize: '18px' }}>Error Loading Data</h2>
          <p style={{ color: '#64748b', marginBottom: '20px', fontSize: '14px' }}>{error}</p>
          <button onClick={fetchData} style={styles.retryButton}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Top Navigation Bar */}
      <div style={styles.navbar}>
        <div style={styles.navContent}>
          <h1 style={styles.navTitle}>IoT Monitoring Dashboard</h1>
          <div style={styles.navRight}>
            <span style={styles.navItem}>Real-time Data</span>
            <span style={styles.navDot}>•</span>
            <span style={styles.navItem}>Auto-refresh: 5s</span>
          </div>
        </div>
      </div>

      <div style={styles.contentWrapper}>
        {/* Statistik Cards - Clean & Minimal */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statHeader}>
              <span style={styles.statLabel}>Suhu Maksimum</span>
              <span style={{ ...styles.statBadge, backgroundColor: '#fee2e2', color: '#dc2626' }}>MAX</span>
            </div>
            <div style={{ ...styles.statValue, color: '#dc2626' }}>{reportData?.suhumax}°C</div>
            <div style={styles.statFooter}>Temperature</div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statHeader}>
              <span style={styles.statLabel}>Suhu Minimum</span>
              <span style={{ ...styles.statBadge, backgroundColor: '#dbeafe', color: '#2563eb' }}>MIN</span>
            </div>
            <div style={{ ...styles.statValue, color: '#2563eb' }}>{reportData?.suhumin}°C</div>
            <div style={styles.statFooter}>Temperature</div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statHeader}>
              <span style={styles.statLabel}>Suhu Rata-rata</span>
              <span style={{ ...styles.statBadge, backgroundColor: '#d1fae5', color: '#059669' }}>AVG</span>
            </div>
            <div style={{ ...styles.statValue, color: '#059669' }}>{reportData?.suhurata}°C</div>
            <div style={styles.statFooter}>Temperature</div>
          </div>
        </div>

        {/* Data Sensor Terbaru */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Data Sensor Terbaru</h2>
            <span style={styles.recordCount}>{recentData.length} records</span>
          </div>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Suhu (°C)</th>
                  <th style={styles.th}>Humidity (%)</th>
                  <th style={styles.th}>Lux</th>
                  <th style={styles.th}>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {recentData && recentData.length > 0 ? (
                  recentData.map((row, index) => (
                    <tr key={index} style={index % 2 === 0 ? styles.tr : styles.trAlt}>
                      <td style={styles.td}>{row.id}</td>
                      <td style={styles.td}><span style={styles.tempValue}>{row.suhu}</span></td>
                      <td style={styles.td}><span style={styles.humidValue}>{row.humidity}</span></td>
                      <td style={styles.td}>{row.lux}</td>
                      <td style={styles.tdTimestamp}>{row.timestamp}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={styles.emptyCell}>No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Data Suhu Max & Humid Max */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Data Suhu Maksimum (Humidity Tertinggi)</h2>
            <span style={styles.recordCount}>
              {reportData?.nilai_suhu_max_humid_max?.length || 0} records
            </span>
          </div>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Suhu</th>
                  <th style={styles.th}>Humidity</th>
                  <th style={styles.th}>Kecerahan</th>
                  <th style={styles.th}>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {reportData?.nilai_suhu_max_humid_max && reportData.nilai_suhu_max_humid_max.length > 0 ? (
                  reportData.nilai_suhu_max_humid_max.map((row, index) => (
                    <tr key={index} style={index % 2 === 0 ? styles.tr : styles.trAlt}>
                      <td style={styles.td}>{row.idx}</td>
                      <td style={styles.td}><span style={styles.tempValue}>{row.suhu}°C</span></td>
                      <td style={styles.td}><span style={styles.humidValue}>{row.humid}%</span></td>
                      <td style={styles.td}>{row.kecerahan} lux</td>
                      <td style={styles.tdTimestamp}>{row.timestamp}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={styles.emptyCell}>No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Layout 2 Kolom: Analytics Chart & Pump Control */}
        <div style={styles.twoColumnGrid}>
          {/* Temperature Analytics Chart */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Analisis Suhu per Bulan</h2>
              <span style={styles.recordCount}>Monthly Trends</span>
            </div>
            <div style={styles.chartContainer}>
              {reportData ? (
                <div style={styles.lineChartWrapper}>
                  {/* Chart Title and Stats */}
                  <div style={styles.chartHeader}>
                    <div style={styles.chartStat}>
                      <span style={styles.chartStatLabel}>Maksimum</span>
                      <span style={{ ...styles.chartStatValue, color: '#dc2626' }}>{reportData.suhumax}°C</span>
                    </div>
                    <div style={styles.chartStat}>
                      <span style={styles.chartStatLabel}>Rata-rata</span>
                      <span style={{ ...styles.chartStatValue, color: '#3b82f6' }}>{reportData.suhurata}°C</span>
                    </div>
                    <div style={styles.chartStat}>
                      <span style={styles.chartStatLabel}>Minimum</span>
                      <span style={{ ...styles.chartStatValue, color: '#059669' }}>{reportData.suhumin}°C</span>
                    </div>
                  </div>
                  
                  {/* SVG Line Chart */}
                  <svg width="100%" height="200" style={styles.svgChart}>
                    {/* Grid lines */}
                    <line x1="0" y1="40" x2="100%" y2="40" stroke="#e2e8f0" strokeWidth="1" />
                    <line x1="0" y1="100" x2="100%" y2="100" stroke="#e2e8f0" strokeWidth="1" />
                    <line x1="0" y1="160" x2="100%" y2="160" stroke="#e2e8f0" strokeWidth="1" />
                    
                    {/* Y-axis labels */}
                    <text x="5" y="35" fill="#94a3b8" fontSize="11" fontWeight="500">40°C</text>
                    <text x="5" y="95" fill="#94a3b8" fontSize="11" fontWeight="500">25°C</text>
                    <text x="5" y="155" fill="#94a3b8" fontSize="11" fontWeight="500">10°C</text>
                    
                    {/* Temperature lines */}
                    {(() => {
                      const maxTemp = reportData.suhumax || 0;
                      const avgTemp = reportData.suhurata || 0;
                      const minTemp = reportData.suhumin || 0;
                      
                      // Calculate Y positions (inverted, 0 at top)
                      const maxY = 180 - ((maxTemp / 50) * 140);
                      const avgY = 180 - ((avgTemp / 50) * 140);
                      const minY = 180 - ((minTemp / 50) * 140);
                      
                      return (
                        <>
                          {/* Max line */}
                          <polyline
                            points={`50,${maxY} 200,${maxY - 10} 350,${maxY + 5} 500,${maxY - 15} 650,${maxY}`}
                            fill="none"
                            stroke="#dc2626"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {/* Max points */}
                          <circle cx="50" cy={maxY} r="5" fill="#dc2626" />
                          <circle cx="200" cy={maxY - 10} r="5" fill="#dc2626" />
                          <circle cx="350" cy={maxY + 5} r="5" fill="#dc2626" />
                          <circle cx="500" cy={maxY - 15} r="5" fill="#dc2626" />
                          <circle cx="650" cy={maxY} r="5" fill="#dc2626" />
                          
                          {/* Avg line */}
                          <polyline
                            points={`50,${avgY} 200,${avgY + 5} 350,${avgY - 5} 500,${avgY + 10} 650,${avgY}`}
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {/* Avg points */}
                          <circle cx="50" cy={avgY} r="5" fill="#3b82f6" />
                          <circle cx="200" cy={avgY + 5} r="5" fill="#3b82f6" />
                          <circle cx="350" cy={avgY - 5} r="5" fill="#3b82f6" />
                          <circle cx="500" cy={avgY + 10} r="5" fill="#3b82f6" />
                          <circle cx="650" cy={avgY} r="5" fill="#3b82f6" />
                          
                          {/* Min line */}
                          <polyline
                            points={`50,${minY} 200,${minY + 8} 350,${minY - 3} 500,${minY + 5} 650,${minY}`}
                            fill="none"
                            stroke="#059669"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {/* Min points */}
                          <circle cx="50" cy={minY} r="5" fill="#059669" />
                          <circle cx="200" cy={minY + 8} r="5" fill="#059669" />
                          <circle cx="350" cy={minY - 3} r="5" fill="#059669" />
                          <circle cx="500" cy={minY + 5} r="5" fill="#059669" />
                          <circle cx="650" cy={minY} r="5" fill="#059669" />
                        </>
                      );
                    })()}
                  </svg>
                  
                  {/* Month-Year Info */}
                  {reportData?.month_year_max && reportData.month_year_max.length > 0 && (
                    <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '6px', borderLeft: '4px solid #3b82f6' }}>
                      <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500', marginBottom: '8px' }}>
                        Periode dengan Suhu Maksimum:
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {reportData.month_year_max.map((item, index) => (
                          <span key={index} style={{
                            padding: '6px 12px',
                            backgroundColor: 'white',
                            borderRadius: '4px',
                            fontSize: '13px',
                            fontWeight: '600',
                            color: '#475569',
                            border: '1px solid #e2e8f0'
                          }}>
                            {item.month_year}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Legend */}
                  <div style={styles.chartLegend}>
                    <div style={styles.legendItem}>
                      <div style={{ ...styles.legendColor, backgroundColor: '#dc2626' }}></div>
                      <span>Suhu Maksimum</span>
                    </div>
                    <div style={styles.legendItem}>
                      <div style={{ ...styles.legendColor, backgroundColor: '#3b82f6' }}></div>
                      <span>Suhu Rata-rata</span>
                    </div>
                    <div style={styles.legendItem}>
                      <div style={{ ...styles.legendColor, backgroundColor: '#059669' }}></div>
                      <span>Suhu Minimum</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={styles.emptyChart}>
                  <p>Tidak ada data untuk ditampilkan</p>
                </div>
              )}
            </div>
          </div>

          {/* Kontrol Pompa */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Kontrol Pompa / Relay</h2>
            </div>
            
            <div style={styles.pumpControlWrapper}>
              <button 
                onClick={() => handlePumpControl('ON')}
                disabled={pumpStatus === 'ON'}
                style={{
                  ...styles.pumpButton,
                  ...styles.pumpButtonOn,
                  opacity: pumpStatus === 'ON' ? 0.5 : 1,
                  cursor: pumpStatus === 'ON' ? 'not-allowed' : 'pointer',
                }}
              >
                NYALAKAN
              </button>
              
              <button 
                onClick={() => handlePumpControl('OFF')}
                disabled={pumpStatus === 'OFF'}
                style={{
                  ...styles.pumpButton,
                  ...styles.pumpButtonOff,
                  opacity: pumpStatus === 'OFF' ? 0.5 : 1,
                  cursor: pumpStatus === 'OFF' ? 'not-allowed' : 'pointer',
                }}
              >
                MATIKAN
              </button>
            </div>
            
            <div style={styles.statusContainer}>
              <span style={styles.statusLabel}>Status:</span>
              <span style={{
                ...styles.statusValue,
                color: pumpStatus === 'ON' ? '#059669' : '#dc2626'
              }}>
                {pumpStatus === 'ON' ? 'MENYALA' : 'MATI'}
              </span>
            </div>
            
            {message && (
              <div style={{
                ...styles.messageBox,
                backgroundColor: message.includes('✅') ? '#d1fae5' : '#fee2e2',
                color: message.includes('✅') ? '#065f46' : '#991b1b',
                borderLeft: `4px solid ${message.includes('✅') ? '#059669' : '#dc2626'}`
              }}>
                {message}
              </div>
            )}
            
            <div style={styles.mqttInfo}>
              MQTT Topic: <code style={styles.code}>iot/uas/pompa</code>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <div style={styles.footerContent}>
            <div>
              <p style={styles.footerTitle}>UTS Pemrograman IoT - 2025</p>
              <p style={styles.footerSubtitle}>Real-time Monitoring & Control System</p>
            </div>
            <div style={styles.footerLinks}>
              <a href="http://localhost:3000/api/report/json" target="_blank" rel="noreferrer" style={styles.link}>
                API Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  // Main Container
  container: { 
    minHeight: '100vh', 
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    backgroundColor: '#f8fafc',
    margin: 0,
    padding: 0
  },
  
  // Navigation Bar
  navbar: {
    backgroundColor: 'white',
    borderBottom: '1px solid #e2e8f0',
    padding: '0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  navContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  navTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#0f172a',
    margin: 0
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '14px',
    color: '#64748b'
  },
  navItem: {
    color: '#64748b'
  },
  navDot: {
    color: '#cbd5e1'
  },
  
  // Content Wrapper
  contentWrapper: { 
    maxWidth: '1400px', 
    margin: '0 auto',
    padding: '24px'
  },
  
  // Stats Grid
  statsGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
    gap: '20px', 
    marginBottom: '24px' 
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    padding: '20px',
    transition: 'box-shadow 0.2s',
    cursor: 'default'
  },
  statHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  statLabel: { 
    fontSize: '13px', 
    color: '#64748b',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  statBadge: {
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '0.5px'
  },
  statValue: { 
    fontSize: '36px', 
    fontWeight: '700',
    lineHeight: '1.2',
    marginBottom: '8px'
  },
  statFooter: {
    fontSize: '12px',
    color: '#94a3b8',
    fontWeight: '500'
  },
  
  // Section Styles
  section: {
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    marginBottom: '20px',
    overflow: 'hidden'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc'
  },
  sectionTitle: { 
    fontSize: '16px', 
    fontWeight: '600', 
    margin: 0, 
    color: '#0f172a'
  },
  recordCount: {
    fontSize: '13px',
    color: '#64748b',
    fontWeight: '500'
  },
  
  // Table Styles
  tableWrapper: { 
    overflowX: 'auto'
  },
  table: { 
    width: '100%', 
    borderCollapse: 'collapse'
  },
  th: { 
    padding: '12px 24px', 
    textAlign: 'left', 
    backgroundColor: '#f8fafc',
    color: '#475569', 
    fontWeight: '600', 
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: '1px solid #e2e8f0'
  },
  tr: { 
    borderBottom: '1px solid #f1f5f9',
    backgroundColor: 'white',
    transition: 'background-color 0.15s'
  },
  trAlt: {
    borderBottom: '1px solid #f1f5f9',
    backgroundColor: '#fafbfc',
    transition: 'background-color 0.15s'
  },
  td: { 
    padding: '16px 24px', 
    color: '#1e293b', 
    fontSize: '14px',
    fontWeight: '500'
  },
  tdTimestamp: {
    padding: '16px 24px',
    fontSize: '13px',
    color: '#64748b',
    fontFamily: 'monospace'
  },
  tempValue: {
    color: '#dc2626',
    fontWeight: '600',
    fontSize: '14px'
  },
  humidValue: {
    color: '#2563eb',
    fontWeight: '600',
    fontSize: '14px'
  },
  emptyCell: {
    padding: '40px 24px',
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: '14px',
    fontStyle: 'italic'
  },
  
  // Two Column Grid
  twoColumnGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
    gap: '20px',
    marginBottom: '24px'
  },
  
  // Badge Styles (kept for compatibility)
  badgeContainer: { 
    display: 'flex', 
    gap: '10px', 
    flexWrap: 'wrap',
    padding: '20px 24px'
  },
  badge: { 
    padding: '8px 16px',
    backgroundColor: '#f1f5f9',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#475569',
    border: '1px solid #e2e8f0'
  },
  emptyBadge: {
    padding: '8px 16px',
    backgroundColor: '#f8fafc',
    borderRadius: '6px',
    fontSize: '13px',
    color: '#94a3b8',
    fontStyle: 'italic',
    border: '1px solid #e2e8f0'
  },
  
  // Chart Styles
  chartContainer: {
    padding: '24px',
    minHeight: '300px'
  },
  lineChartWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  chartHeader: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '16px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    gap: '12px'
  },
  chartStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px'
  },
  chartStatLabel: {
    fontSize: '12px',
    color: '#64748b',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  chartStatValue: {
    fontSize: '24px',
    fontWeight: '700',
    lineHeight: '1'
  },
  svgChart: {
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    padding: '20px'
  },
  barChartWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  barItem: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '12px'
  },
  barWrapper: {
    flex: 1,
    height: '60px',
    display: 'flex',
    alignItems: 'flex-end',
    backgroundColor: '#f8fafc',
    borderRadius: '4px',
    padding: '4px',
    position: 'relative'
  },
  bar: {
    width: '100%',
    minHeight: '20px',
    borderRadius: '4px 4px 0 0',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    position: 'relative',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  barValue: {
    fontSize: '12px',
    fontWeight: '700',
    color: 'white',
    padding: '4px 8px',
    textShadow: '0 1px 2px rgba(0,0,0,0.3)'
  },
  barLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#475569',
    minWidth: '80px',
    textAlign: 'center',
    padding: '4px 8px',
    backgroundColor: '#f1f5f9',
    borderRadius: '4px',
    border: '1px solid #e2e8f0'
  },
  chartLegend: {
    display: 'flex',
    gap: '16px',
    marginTop: '12px',
    padding: '12px',
    backgroundColor: '#f8fafc',
    borderRadius: '6px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#64748b',
    fontWeight: '500'
  },
  legendColor: {
    width: '16px',
    height: '16px',
    borderRadius: '3px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
  },
  emptyChart: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px',
    color: '#94a3b8',
    fontSize: '14px',
    fontStyle: 'italic'
  },
  
  // Pump Control
  pumpControlWrapper: { 
    display: 'flex', 
    gap: '12px', 
    padding: '20px 24px',
    borderBottom: '1px solid #f1f5f9'
  },
  pumpButton: { 
    flex: 1,
    padding: '14px 0',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'white',
    transition: 'all 0.2s',
    outline: 'none',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  pumpButtonOn: {
    backgroundColor: '#059669',
    boxShadow: '0 1px 3px rgba(5,150,105,0.3)'
  },
  pumpButtonOff: {
    backgroundColor: '#dc2626',
    boxShadow: '0 1px 3px rgba(220,38,38,0.3)'
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 24px',
    borderBottom: '1px solid #f1f5f9'
  },
  statusLabel: {
    fontSize: '14px',
    color: '#64748b',
    fontWeight: '500'
  },
  statusValue: {
    fontSize: '14px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  messageBox: {
    margin: '0 24px 20px 24px',
    padding: '12px 16px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '500'
  },
  mqttInfo: { 
    padding: '16px 24px',
    fontSize: '13px',
    color: '#64748b',
    backgroundColor: '#f8fafc'
  },
  code: { 
    backgroundColor: '#e0e7ff',
    padding: '3px 8px',
    borderRadius: '4px',
    fontFamily: "'Consolas', 'Monaco', monospace",
    fontSize: '12px',
    color: '#4338ca',
    fontWeight: '600'
  },
  
  // Footer
  footer: { 
    marginTop: '40px',
    padding: '24px',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e2e8f0'
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px'
  },
  footerTitle: {
    margin: '0 0 4px 0',
    color: '#0f172a',
    fontSize: '14px',
    fontWeight: '600'
  },
  footerSubtitle: {
    margin: 0,
    fontSize: '13px',
    color: '#64748b'
  },
  footerLinks: {
    display: 'flex',
    gap: '16px'
  },
  link: { 
    color: '#2563eb', 
    textDecoration: 'none', 
    fontWeight: '500',
    fontSize: '13px',
    transition: 'color 0.2s'
  },
  
  // Loading & Error States
  loadingContainer: { 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh', 
    backgroundColor: '#f8fafc'
  },
  spinner: { 
    width: '48px', 
    height: '48px', 
    border: '4px solid #e2e8f0',
    borderTop: '4px solid #2563eb',
    borderRadius: '50%', 
    animation: 'spin 0.8s linear infinite' 
  },
  errorContainer: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh', 
    backgroundColor: '#f8fafc',
    padding: '24px' 
  },
  retryButton: { 
    marginTop: '16px', 
    padding: '10px 20px',
    backgroundColor: '#2563eb',
    border: 'none',
    borderRadius: '6px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  }
};

// Add CSS animation for spinner
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  table tbody tr:hover {
    background-color: #f1f5f9 !important;
  }
  
  button:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  
  a:hover {
    color: #1d4ed8 !important;
  }
  
  /* Bar chart hover effects */
  .bar-wrapper:hover .bar {
    transform: scaleY(1.05);
    filter: brightness(1.1);
  }
`;
document.head.appendChild(styleSheet);

export default App;
