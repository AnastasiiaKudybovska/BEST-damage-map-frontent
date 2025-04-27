import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const IPChecker = ({ children }) => {
  const [ipChecked, setIpChecked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/access-denied') {
      setIpChecked(true);
      return;
    }

    const checkIP = async () => {
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const { ip } = await ipResponse.json();
        
        if (ip === '147.45.179.162') {
          navigate('/access-denied', { replace: true });
        } else {
          setIpChecked(true);
        }
      } catch (error) {
        console.error('Error checking IP:', error);
        setIpChecked(true);
      }
    };

    checkIP();
  }, [navigate, location.pathname]); // додано location.pathname

  if (location.pathname === '/access-denied') {
    return children;
  }

  return ipChecked ? children : null;
};

export default IPChecker;
