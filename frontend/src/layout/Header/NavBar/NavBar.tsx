import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AddTerrorEvent } from '../../../components/CRUD/addTerrorEvent';

export default function NavBar() {
  return (
    <Box sx={{ justifyContent: "end" }}>
      <AppBar position="fixed" sx={{ minHeight: "6vh", background: "rgb(67, 90, 171)" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <AddTerrorEvent /> 
        </Toolbar>
      </AppBar>
    </Box>
  );
}
