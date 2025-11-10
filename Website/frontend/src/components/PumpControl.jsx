import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function PumpControl() {
  const [pumpState, setPumpState] = useState('OFF');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch initial pump status
  useEffect(() => {
    fetchPumpStatus();
  }, []);

  const fetchPumpStatus = async () => {
    try {
      const response = await api.getPumpStatus();
      setPumpState(response.data.state);
    } catch (error) {
      console.error('Failed to fetch pump status:', error);
    }
  };

  const handlePumpControl = async (action) => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await api.controlPump(action);
      setPumpState(action);
      setMessage(response.data.message);
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pump-control-container">
      <h2>Pump Control</h2>
      
      <div className="pump-status">
        <div className="status-indicator">
          <span className={`status-dot ${pumpState === 'ON' ? 'on' : 'off'}`}></span>
          <span className="status-text">
            Pump is currently <strong>{pumpState}</strong>
          </span>
        </div>
      </div>
      
      <div className="pump-buttons">
        <button
          className={`btn btn-on ${pumpState === 'ON' ? 'active' : ''}`}
          onClick={() => handlePumpControl('ON')}
          disabled={loading || pumpState === 'ON'}
        >
          {loading && pumpState !== 'ON' ? '⏳' : '✓'} Turn ON
        </button>
        
        <button
          className={`btn btn-off ${pumpState === 'OFF' ? 'active' : ''}`}
          onClick={() => handlePumpControl('OFF')}
          disabled={loading || pumpState === 'OFF'}
        >
          {loading && pumpState !== 'OFF' ? '⏳' : '✗'} Turn OFF
        </button>
      </div>
      
      {message && (
        <div className={`pump-message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
      
      <div className="pump-info">
        <p>
          <strong>MQTT Topic:</strong> <code>iot/uas/pompa</code>
        </p>
        <p className="info-text">
          Control commands are published to the MQTT broker and forwarded to ESP32 devices.
        </p>
      </div>
    </div>
  );
}
