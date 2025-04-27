
import React, { useState, useEffect } from 'react';
import { Box, Typography, Chip, Divider } from '@mui/material';


const DamageMapPopUp = ({ poly, zoneColors, zoneNames, getDamageCostRange }) => {
  const [damageCostRange, setDamageCostRange] = useState(null);

  useEffect(() => {
    const fetchDamageCostRange = async () => {
      const range = await getDamageCostRange(poly.zone, poly.area_m2, poly.tags['building:levels']);
      setDamageCostRange(range);
    };

    fetchDamageCostRange();
  }, [poly, getDamageCostRange]);

  const tags = poly.tags || {};
  const address = `${tags['addr:street'] || ''} ${tags['addr:housenumber'] || ''}`.trim();
  const buildingLevels = tags['building:levels'] ? `${tags['building:levels']} floors` : 'Unknown floors';
  const startDate = tags.start_date || 'unknown';

  return (
    <Box sx={{ p: 1, maxWidth: 250 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: zoneColors[poly.zone], mb: 1 }}>
        {tags.name || 'Building'}
      </Typography>
      <Divider sx={{ my: 1 }} />
      {address && (
        <Typography variant="body2" sx={{ mb: 1 }}>
          <b>Address:</b> {address}
        </Typography>
      )}
      <Typography variant="body2" sx={{ mb: 1 }}>
        <b>Area:</b> {poly.area_m2.toFixed(1)} m²
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <b style={{ marginRight: 4 }}>Damage level:</b>
        <Chip 
          label={zoneNames[poly.zone]} 
          size="small" 
          sx={{ backgroundColor: `${zoneColors[poly.zone]}20`, color: zoneColors[poly.zone], fontWeight: 'bold' }} 
        />
      </Box>
      {damageCostRange && (
        <Typography variant="body2" sx={{ mb: 1 }}>
          <b>Estimated repair cost:</b> {damageCostRange}
        </Typography>
      )}
      {tags['building:levels'] && (
        <Typography variant="body2" sx={{ mb: 1 }}>
          <b>Floors:</b> {buildingLevels}
        </Typography>
      )}
      {tags.start_date && (
        <Typography variant="body2">
          <b>Construction year:</b> {startDate}
        </Typography>
      )}
    </Box>
  );
};

export default DamageMapPopUp;