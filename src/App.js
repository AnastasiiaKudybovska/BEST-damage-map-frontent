import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import AccessDeniedPage from './pages/AccessDeniedPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
  const location = useLocation(); 
  const {pathname} = location; 
  return (
    <>
      {(pathname === '/access-denied')  ? null : <Navbar/>}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutUs" element={<AboutUsPage />} />
        <Route path="*" element={<Navigate to="/" />} /> 
        <Route path="/access-denied" element={<AccessDeniedPage/>} />
      </Routes>
      {(pathname === '/access-denied')  ? null : <Footer/>}
    </>
  );
}

export default App;
