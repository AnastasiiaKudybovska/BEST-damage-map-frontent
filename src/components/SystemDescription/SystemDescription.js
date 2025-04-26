import React from 'react';
import { Typography, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  FaBullseye,
  FaMapMarkedAlt,
  FaChartLine,
  FaDatabase,
  FaFileDownload
} from 'react-icons/fa';
import './SystemDescription.css';

const images = {
  heroBg: 'https://www.reuters.com/resizer/v2/https%3A%2F%2Farchive-images.prod.global.a201836.reutersmedia.net%2F2022%2F04%2F26%2F2022-04-26T172604Z_18521_MRPRC2QFT9A07VK_RTRMADP_0_UKRAINE-CRISIS-MARIUPOL.JPG?auth=102279864dff7f6459d8536f609cc22db8e09fb5d1616cde07c2000f215aa774&width=1920&quality=80',
  statsBg: 'https://www.reuters.com/resizer/v2/https%3A%2F%2Farchive-images.prod.global.a201836.reutersmedia.net%2F2022%2F04%2F26%2F2022-04-26T172604Z_18521_MRPRC22NT95GVBJ_RTRMADP_0_UKRAINE-CRISIS-MARIUPOL.JPG?auth=e9b5ac158264aea2d35a9722af19d6918792189bdd6fbe87c30044b2f9e61c4e&width=1920&quality=80'
};

const features = [
  { 
    icon: <FaBullseye className="feature-icon" />,
    title: "Precision Strike Analysis",
    description: "Accurately identify missile impact points with geospatial mapping"
  },
  {
    icon: <FaMapMarkedAlt className="feature-icon" />,
    title: "Damage Visualization",
    description: "Interactive maps showing destruction radius and severity levels"
  },
  {
    icon: <FaChartLine className="feature-icon" />,
    title: "Impact Assessment",
    description: "Calculate potential damage to infrastructure and civilian areas"
  }
];

const SystemDescription = () => {
  const theme = useTheme();

  return (
    <Box className="landing-container">
      {/* Hero Section */}
      <Box 
        className="hero-section"
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${images.heroBg})`
        }}
      >
        <div className="hero-overlay" />
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h1" className="hero-title">
            WAR DAMAGE ASSESSMENT PLATFORM
          </Typography>
          <Typography variant="h3" className="hero-subtitle">
            Advanced analytics for missile impact evaluation
          </Typography>
        </motion.div>
      </Box>

      {/* Features Section */}
      
           
      <Box className="features-section">
  <Typography
    variant="h2"
    component="h1"
    gutterBottom
    className="section-title"
    sx={{
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 4,
      textAlign: 'center',
    }}
  >
    Core Capabilities
  </Typography>
  
  <Box className="features-grid">
    {features.map((feature, index) => (
      <motion.div
        key={index}
        className="feature-card"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)"
        }}
      >
        <div className="feature-icon-container">
          {feature.icon}
        </div>
        <Typography variant="h4" className="feature-title">
          {feature.title}
        </Typography>
        <Typography variant="body1" className="feature-description">
          {feature.description}
        </Typography>
      </motion.div>
    ))}
  </Box>
</Box>
      {/* Stats Section */}
      <Box 
        className="stats-section"
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${images.statsBg})`
        }}
      >
        <div className="stats-overlay" />
        <motion.div
          className="stats-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h2" className="stats-title">
            REAL-TIME IMPACT MONITORING
          </Typography>
          <Typography variant="h4" className="stats-subtitle">
            Tracking destruction across Ukraine since 2022
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
};

export default SystemDescription;