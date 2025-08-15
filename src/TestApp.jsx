import React from 'react';

const TestApp = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      background: 'linear-gradient(135deg, #10b981, #059669)'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '400px'
      }}>
        <h1 style={{ color: '#1f2937', marginBottom: '1rem' }}>
          🎉 Ngāti Maru Website
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
          Site is loading successfully! The main application will be restored shortly.
        </p>
        <p style={{ color: '#059669', fontSize: '0.875rem' }}>
          Build: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default TestApp;
