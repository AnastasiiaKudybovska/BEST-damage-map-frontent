import React from 'react';
import { Box, Chip, IconButton, MenuItem, Paper } from '@mui/material';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import RocketIcon from '@mui/icons-material/Rocket';
import MopedSharpIcon from '@mui/icons-material/MopedSharp';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

export const DamageZoneFilter = ({ 
  selectedZone, 
  setSelectedZone, 
  handleResetFilter,
  handleRocketSelection,
  zoneColors,
  zoneNames
}) => (
  <Box sx={{
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1000,
    display: 'flex',
    gap: 1,
    alignItems: 'center',
    bgcolor: 'background.paper',
    p: 1,
    borderRadius: 1,
    boxShadow: 3
  }}>
    {Object.entries(zoneColors).map(([zone, color]) => (
      <Chip
        key={zone}
        label={zoneNames[zone]}
        onClick={() => setSelectedZone(selectedZone === zone ? null : zone)}
        sx={{
          backgroundColor: selectedZone === zone ? `${color}30` : `${color}10`,
          color: selectedZone === zone ? color : 'text.primary',
          border: `1px solid ${color}${selectedZone === zone ? '80' : '30'}`,
          fontWeight: 'medium',
          '&:hover': {
            backgroundColor: `${color}20`
          }
        }}
      />
    ))}
    {selectedZone && (
      <IconButton 
        onClick={handleResetFilter}
        size="small"
        title="Reset filter"
        sx={{
          ml: 1,
          color: 'text.secondary',
          '&:hover': {
            color: 'primary.main'
          }
        }}
      >
        <FilterAltOffIcon fontSize="small" />
      </IconButton>
    )}
  </Box>
);

export const RocketTypeFilter = ({ 
  rocketType, 
  handleRocketSelect, 
  menuOpen, 
  handleMenuToggle, 
  anchorRef 
}) => {
  const rocketTypes = [
    { 
      value: 'shahed', 
      label: 'Shahed Drone', 
      icon: <MopedSharpIcon fontSize="small" />,
      tntEquivalent: 50 
    },
    { 
      value: 'ballistic', 
      label: 'Ballistic Missile', 
      icon: <RocketIcon fontSize="small" />,
      tntEquivalent: 1500 
    },
    { 
      value: 'cruise', 
      label: 'Cruise Missile', 
      icon: <RocketLaunchIcon fontSize="small" />,
      tntEquivalent: 500
    }
  ];

  const getRocketIcon = (type) => {
    switch(type) {
      case 'shahed': return <MopedSharpIcon fontSize="small" />;
      case 'ballistic': return <RocketIcon fontSize="small" />;
      case 'cruise': return <RocketLaunchIcon fontSize="small" />;
      default: return <RocketIcon fontSize="small" />;
    }
  };

  return (
    <Box sx={{
      position: 'absolute',
      top: 80,
      left: 16,
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <IconButton
        ref={anchorRef}
        onClick={handleMenuToggle}
        sx={{
          bgcolor: 'background.paper',
          p: 1,
          borderRadius: 1,
          boxShadow: 3,
          '&:hover': {
            bgcolor: 'action.hover'
          }
        }}
      >
        {rocketType ? getRocketIcon(rocketType) : <RocketIcon fontSize="small" />}
      </IconButton>
      
      <Paper
        sx={{
          mt: 1,
          display: menuOpen ? 'block' : 'none',
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 3,
          minWidth: 180,
          overflow: 'hidden'
        }}
      >
        {rocketTypes.map((type) => (
          <MenuItem
            key={type.value}
            selected={rocketType === type.value}
            onClick={() => handleRocketSelect(type.value, type.tntEquivalent)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              py: 1,
              px: 2,
              fontSize: '0.875rem'
            }}
          >
            {type.icon}
            <Box>
              <div>{type.label}</div>
              <div style={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                TNT: {type.tntEquivalent}
              </div>
            </Box>
          </MenuItem>
        ))}
      </Paper>
    </Box>
  );
};