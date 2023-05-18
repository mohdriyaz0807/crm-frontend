import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Leaderboard, Logout, RequestPage, SupportAgentRounded, AccessAlarm, ContactMail, Dashboard } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from "@mui/material";
import Swal from "sweetalert2";

const drawerWidth = 240;

function Navbar(props) {
  const { children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const routes = [
    {
      name: "Dashboard",
      route: "/Dashboard",
      icon: <Dashboard />,
    },
    {
      name: "Allow Access",
      route: "/AllowAccess",
      icon: <AccessAlarm />,
    },
    {
      name: "Service Request",
      route: "/ServiceRequest",
      icon: <RequestPage />,
    },
    {
      name: "Leads",
      route: "/Leads",
      icon: <Leaderboard />,
    },
    {
      name: "Contacts",
      route: "/Contacts",
      icon: <ContactMail />,
    },
    {
      name: "Logout",
      route: "/Login",
      icon: <Logout />,
    },
  ];

  const onLogout = (e) => {
    e.preventDefault()
    Swal.fire({
      icon: 'warning',
      title: "Log Out",
      text: "Are you sure you want to log out ?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if(result.isConfirmed){
        localStorage.clear();
        window.location.href = '/Login'
      }
    })    
  }

  const drawer = (
    <>
      <Toolbar sx={{ margin: '0 auto'}}>
        <SupportAgentRounded fontSize="large"/>
      </Toolbar>
      <Box sx={{ overflow: "auto" }}>
        <List>
          {routes.map((row) => (
            <ListItem key={row.name} disablePadding>
              <ListItemButton
                selected={window.location.pathname.includes(row.route)}
                href={row.route}
                onClick={(e) => {
                  if (row.name === "Logout") {
                    onLogout(e)
                  }
                }}
              >
                <ListItemIcon>{row.icon}</ListItemIcon>
                <ListItemText primary={row.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#c98aff'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography fontWeight="bold" variant="h6" noWrap component="div">
            Easy CRM
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default Navbar;
