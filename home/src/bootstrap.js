import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './components/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>
     
       
        <p style={{ margin: '10px 0 0 0', textAlign: 'center', fontSize: '14px', opacity: 0.8 }}>
          [TEAM 4 - Home MFE - Port 3004]
        </p>
      <Home />
    </div>
  </React.StrictMode>
);
