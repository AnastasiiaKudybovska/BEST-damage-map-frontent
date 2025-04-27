import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IPChecker = ({ children }) => {
  const [ipChecked, setIpChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIP = async () => {
      try {
        // First get the user's IP
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const { ip } = await ipResponse.json();
        
        // Check if IP matches the blocked one
        if (ip === '147.45.179.162') {
          navigate('/access-denied');
          return;
        }
        
        setIpChecked(true);
      } catch (error) {
        console.error('Error checking IP:', error);
        // If IP check fails, still allow access
        setIpChecked(true);
      }
    };

    checkIP();
  }, [navigate]);

  return ipChecked ? children : null;
};

export default IPChecker;