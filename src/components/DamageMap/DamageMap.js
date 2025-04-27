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

const initialData = [
    {
      area_m2: 4904.28,
      zone: 'small',
      polygon: {
        type: 'Polygon',
        coordinates: [
          [
            [49.832044, 24.024187],
            [49.831970, 24.024526],
            [49.831294, 24.024172],
            [49.831368, 24.023833],
            [49.832044, 24.024187],
          ],
        ],
      },
      tags: {
        'addr:housenumber': '11 к6а',
        'addr:postcode': '79000',
        'addr:street': 'Pavla Hrabovskoho Street',
        building: 'yes',
        start_date: '1966',
      },
    },
    {
      area_m2: 4805.21,
      zone: 'hard',
      polygon: {
        type: 'Polygon',
        coordinates: [
          [
            [49.839308, 24.028042],
            [49.839158, 24.027526],
            [49.839515, 24.027092],
            [49.839606, 24.027313],
            [49.839527, 24.027403],
            [49.839644, 24.027818],
            [49.839542, 24.027891],
            [49.839512, 24.027813],
            [49.839435, 24.027884],
            [49.839450, 24.027938],
            [49.839308, 24.028042],
          ],
        ],
      },
      tags: {
        'addr:housenumber': '4',
        'addr:postcode': '79000',
        'addr:street': 'Mykoly Kopernyka Street',
        building: 'yes',
        'building:levels': '4',
        source: 'Bing',
        start_date: '1912',
      },
    },
    {
      area_m2: 3250.50,
      zone: 'medium',
      polygon: {
        type: 'Polygon',
        coordinates: [
          [
            [49.8432, 24.0258],
            [49.8431, 24.0263],
            [49.8427, 24.0261],
            [49.8428, 24.0256],
            [49.8432, 24.0258],
          ],
        ],
      },
      tags: {
        'addr:housenumber': '7',
        'addr:postcode': '79000',
        'addr:street': 'Stepan Bandera Street',
        building: 'yes',
        'building:levels': '3',
        start_date: '1985',
      },
    },
  ];
  

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
  const [center] = useState([49.8419, 24.0315]);
  const [hasClicked, setHasClicked] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedRocket, setSelectedRocket] = useState(null);
  const [rocketType, setRocketType] = useState('');
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

  const getDamageCostRange = (zone) => {
    switch(zone) {
      case 'hard': return '$50,000 - $200,000';
      case 'medium': return '$20,000 - $50,000';
      case 'small': return '$5,000 - $20,000';
      default: return 'Unknown';
    }
  };

  const sendDamageData = (latlng) => {
    if (!selectedRocket) return;
  
    const payload = {
      latitude: latlng.lat,
      longitude: latlng.lng,
      trotil_equivalent: selectedRocket.tntEquivalent,
    };
  
    console.log('Sending payload to backend:', payload);
  
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
              handleRocketSelect={handleRocketSelect} // Тепер передаємо нову функцію
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