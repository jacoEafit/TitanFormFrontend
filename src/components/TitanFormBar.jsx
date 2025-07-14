import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

export function LogoAppBar() {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar>
        <Box
          component="img"
          src="/LogoTitanOrg.png" 
          alt="Logo"
          sx={{
            height: 40,
          }}
        />
      </Toolbar>
    </AppBar>
  );
}