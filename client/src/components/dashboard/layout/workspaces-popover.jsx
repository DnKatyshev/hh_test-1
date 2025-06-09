'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export function WorkspacesPopover({ anchorEl, onChange, onClose, open = false, projects = [] }) {
  
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '250px' } } }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      {projects.map((project) => (
        <MenuItem
          key={project.id} // Используем project ID как ключ
          onClick={() => {
            console.log('Switch-project = ', project)
            onChange(project)
          }}
        >
          {project.name}
        </MenuItem>
      ))}
    </Menu>
  );
}

