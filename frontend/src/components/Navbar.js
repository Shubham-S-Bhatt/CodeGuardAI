import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CodeIcon from '@mui/icons-material/Code';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <CodeIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AI Code Review Platform
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
