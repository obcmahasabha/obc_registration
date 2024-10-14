import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Page from './components/Page';
import Certificate from './components/Certificate';
import QR from './components/QR';
import Demo from './components/Demo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path='/' element={<Page />} />
        <Route path='/certificate' element={<Certificate />} /> {/* Default route */}
        <Route path='/qr' element={<QR />} />
        <Route path='/demo' element={<Demo />} />
      </Routes>
    </Router>
  );
}

export default App;
