import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import AccessDeniedPage from './pages/AccessDeniedPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import IPChecker from './utils/api';

function AppContent() {
  const location = useLocation(); 
  const { pathname } = location; 
  
  return (
    <>
      {(pathname === '/access-denied') ? null : <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutUs" element={<AboutUsPage />} />
        <Route path="*" element={<Navigate to="/" />} /> 
        <Route path="/access-denied" element={<AccessDeniedPage />} />
      </Routes>
      {(pathname === '/access-denied') ? null : <Footer />}
    </>
  );
}

function App() {
  return (
    <IPChecker>
        <AppContent />
    </IPChecker>
  );
}

export default App;