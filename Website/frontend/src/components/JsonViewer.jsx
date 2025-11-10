import React, { useState } from 'react';

export default function JsonViewer({ data }) {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    const jsonString = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleOpenInEditor = () => {
    const jsonString = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      window.open('https://jsoneditoronline.org/', '_blank');
      alert('JSON copied to clipboard! Paste it in the JSON Editor Online.');
    });
  };

  if (!data) {
    return (
      <div className="json-viewer-container">
        <h2>JSON Response Viewer</h2>
        <p className="no-data">No data available</p>
      </div>
    );
  }

  return (
    <div className="json-viewer-container">
      <h2>JSON Response Viewer</h2>
      
      <div className="json-actions">
        <button 
          className="btn btn-copy" 
          onClick={handleCopyToClipboard}
        >
          {copied ? '✓ Copied!' : 'Copy JSON'}
        </button>
        
        <button 
          className="btn btn-editor" 
          onClick={handleOpenInEditor}
        >
          Open in JSON Editor
        </button>
      </div>
      
      <div className="json-display">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
