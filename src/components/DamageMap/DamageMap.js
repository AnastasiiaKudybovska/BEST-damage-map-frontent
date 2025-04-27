import React, { useState, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, useMapEvents, ZoomControl } from 'react-leaflet';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { DamageZoneFilter, RocketTypeFilter } from './DamageMapFilters';
import DamageMapPopUp from './DamageMapPopUp';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const backendUrl = process.env.REACT_APP_BACKEND_URL;


function MapClickHandler({ onClick, onFirstClick }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
      onFirstClick();
    },
  });
  return null;
}

const DamageMap = () => {
  const [polygons, setPolygons] = useState([]);
  const [initialData, setInitialData] = useState([])
  const [center] = useState([49.8419, 24.0315]);
  const [hasClicked, setHasClicked] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedRocket, setSelectedRocket] = useState({ type: 'shahed', tntEquivalent: 50 });
  const [rocketType, setRocketType] = useState('shahed');
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorRef = useRef(null);

  const zoneColors = {
    hard: '#ef5350',
    medium: '#ff9800',
    small: '#4caf50',
  };

  const zoneNames = {
    hard: 'Severe Damage',
    medium: 'Moderate Damage',
    small: 'Minor Damage'
  };

  const handleMenuToggle = () => {
    setMenuOpen((prevOpen) => !prevOpen);
  };

//   const handleMenuClose = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }
//     setMenuOpen(false);
//   };

  const handleRocketSelect = (type, tntEquivalent) => {
    setRocketType(type);
    setSelectedRocket({ type, tntEquivalent });
    setMenuOpen(false);
  };

  const handleMapClick = (latlng) => {
    console.log(`Coordinates: ${latlng.lat}, ${latlng.lng}`);
    if (rocketType) {
      console.log(`Rocket type: ${rocketType}`);
    }
    sendDamageData(latlng); 
    
    if (!hasClicked) {
      const updatedPolygons = initialData.map((poly) => {
        const firstCoord = poly.polygon.coordinates[0][0];
        const latDiff = latlng.lat - firstCoord[0];
        const lngDiff = latlng.lng - firstCoord[1];
        
        const newCoordinates = poly.polygon.coordinates[0].map((coord) => {
          return [coord[0] + latDiff, coord[1] + lngDiff];
        });
        
        return {
          ...poly,
          polygon: {
            ...poly.polygon,
            coordinates: [newCoordinates],
          },
        };
      });
      setPolygons(updatedPolygons);
    } else {
      const updatedPolygons = polygons.map((poly) => {
        const firstCoord = poly.polygon.coordinates[0][0];
        const latDiff = latlng.lat - firstCoord[0];
        const lngDiff = latlng.lng - firstCoord[1];
        
        const newCoordinates = poly.polygon.coordinates[0].map((coord) => {
          return [coord[0] + latDiff, coord[1] + lngDiff];
        });
        
        return {
          ...poly,
          polygon: {
            ...poly.polygon,
            coordinates: [newCoordinates],
          },
        };
      });
      setPolygons(updatedPolygons);
    }
  };

  const handleFirstClick = () => {
    if (!hasClicked) {
      setHasClicked(true);
    }
  };

  const filteredPolygons = useMemo(() => {
    if (!selectedZone) return polygons;
    return polygons.filter(poly => poly.zone === selectedZone);
  }, [polygons, selectedZone]);

  const handleResetFilter = () => {
    setSelectedZone(null);
  };

  const handleApiError = async (response) => {
    if (response.url.includes('/api/grade/') && response.status === 403) {
      try {
        const data = await response.json();
        if (data.detail && data.detail.includes("Access denied. Only for Ukrainian IP.")) {
          window.location.href = '/access-denied';
          return true;
        }
      } catch (error) {
        console.error('Error parsing error response:', error);
      }
    }
    return false;
  };

  const getDamageCostRange = async (zone, area_m2,  levels ) => {
    const total_house_area_m2 = area_m2;  
    const damage_level = zone;  
    const floors = levels || 1;  
    
    const payload = {
      total_house_area_m2: total_house_area_m2,
      damage_level: damage_level,
      floors: floors,
    };
  
    try {
      const response = await fetch(`${backendUrl}/api/grade/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (await handleApiError(response)) return null;
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.detail && data.detail.includes("Access denied. Only for Ukrainian IP.")) {
          window.location.href = '/access-denied';
          return true;
        }
        
        const [minCost, maxCost] = data.prediction;
        const formattedRange = `${minCost.toLocaleString()}₴ - ${maxCost.toLocaleString()}₴`;
        
        return formattedRange;
      } else {
        console.error('Failed to fetch damage range from backend');
        return 'Error fetching data';
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return 'Error fetching data';
    }
  };
  

  const sendDamageData = async (latlng) => {
  if (!selectedRocket) return;

  const payload = {
    center_lat: latlng.lat,
    center_lon: latlng.lng,
    trotil_equivalent: selectedRocket.tntEquivalent,
  };

  console.log('Sending payload to backend:', payload);

  try {
    const response = await fetch(`${backendUrl}/api/grade/getmap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
      },
      body: JSON.stringify(payload),
    });

    if (await handleApiError(response)) return null;

    if (response.ok) {
      const data = await response.json();

      if (data.detail && data.detail.includes("Access denied. Only for Ukrainian IP.")) {
        window.location.href = '/access-denied';
        return true;
      }

      console.log('Data from backend:', data);
      setInitialData(data.nodes);

      const updatedPolygons = data.nodes.map((poly) => {
        

        const newCoordinates = poly.polygon.coordinates[0].map((coord) => {
          return [coord[0], coord[1]];
        });

        return {
          ...poly,
          polygon: {
            ...poly.polygon,
            coordinates: [newCoordinates],
          },
        };
      });

      setPolygons(updatedPolygons);
    } else {
      console.error('Failed to fetch data from backend');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

  return (
    <Box id="map-section" sx={{ 
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: 5 
    }}>
      <Box sx={{ 
        p: 3,
        zIndex: 1
      }}>
        <Typography
          variant='h4'
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            textAlign: 'center',
          }}
        >
          Building Damage Assessment Map
        </Typography>
        <Typography variant="body1" sx={{ 
          textAlign: 'center',
          color: 'text.secondary',
          maxWidth: 800,
          mx: 'auto'
        }}>
          {hasClicked ? 
            'Click on the map to reposition damage zones. Use the filter to show specific damage levels.' : 
            'Click anywhere on the map to visualize damaged buildings in the area.'}
        </Typography>
      </Box>
      
      <Box sx={{ 
        flex: 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {hasClicked && (
          <>
            <DamageZoneFilter
              selectedZone={selectedZone}
              setSelectedZone={setSelectedZone}
              handleResetFilter={handleResetFilter}
              zoneColors={zoneColors}
              zoneNames={zoneNames}
            />
            <RocketTypeFilter
              rocketType={rocketType}
              handleRocketSelect={handleRocketSelect} 
              menuOpen={menuOpen}
              handleMenuToggle={handleMenuToggle}
              anchorRef={anchorRef}
            />
          </>
        )}
        
        <Box sx={{ 
          flex: 1,
          borderRadius: 0,
          overflow: 'hidden',
          position: 'relative'
        }}>
          <MapContainer
            center={center}
            zoom={16}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <ZoomControl position="topright" />
            <MapClickHandler 
              onClick={handleMapClick} 
              onFirstClick={handleFirstClick} 
            />
            
            {hasClicked && filteredPolygons.map((poly) => (
              <Polygon
                key={poly.id}
                positions={poly.polygon.coordinates[0].map(([lat, lng]) => [lat, lng])}
                pathOptions={{
                  color: zoneColors[poly.zone],
                  weight: 2,
                  fillOpacity: 0.5,
                  fillColor: zoneColors[poly.zone],
                }}
                onClick={()=> console.log(poly)}
                eventHandlers={{
                  mouseover: (e) => {
                    e.target.setStyle({
                      fillOpacity: 0.8,
                      weight: 3
                    });
                  },
                  mouseout: (e) => {
                    e.target.setStyle({
                      fillOpacity: 0.5,
                      weight: 2
                    });
                  }
                }}
              >
                <Popup >
                  <DamageMapPopUp 
                    poly={poly}
                    zoneColors={zoneColors}
                    zoneNames={zoneNames}
                    getDamageCostRange={getDamageCostRange}
                  />
                </Popup>
              </Polygon>
            ))}
          </MapContainer>
          
          {hasClicked && (
            <Paper elevation={3} sx={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              backgroundColor: 'background.paper',
              p: 1.5,
              borderRadius: 1,
              zIndex: 1000
            }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>Damage Legend</Typography>
              {Object.entries(zoneColors).map(([zone, color]) => (
                <Box key={zone} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <Box sx={{ 
                    width: 14, 
                    height: 14, 
                    bgcolor: color, 
                    mr: 1,
                    borderRadius: '2px',
                    opacity: selectedZone && selectedZone !== zone ? 0.3 : 1
                  }} />
                  <Typography variant="body2" sx={{ 
                    opacity: selectedZone && selectedZone !== zone ? 0.5 : 1
                  }}>
                    {zoneNames[zone]}
                  </Typography>
                </Box>
              ))}
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DamageMap;