import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";
import { Button, ListItemIcon } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import RememberMeIcon from "@mui/icons-material/RememberMe";
import BadgeIcon from "@mui/icons-material/Badge";

const navItems = [
  { id: 1, name: "flat to hierarchy", nav: "/" },
  { id: 2, name: "hierarchy to flat", nav: "/htf" },
];

const add_data = [
  {
    id: 1,
    name: "Add new Member",
    icon: <RememberMeIcon />,
    path: "/add_member",
  },
  {
    id: 2,
    name: "Add new Admin",
    icon: <SupervisorAccountIcon />,
    path: "/add_admin",
  },
  {
    id: 3,
    name: "Add new Employee",
    icon: <BadgeIcon />,
    path: "/add_employee",
  },
];

const drawerWidth = 240;

const Appbar = ({ children }) => {
  const location = useLocation();

  const reset_data = async () => {
    try {
      await fetch("http://localhost:8080/tree/reset_data", {
        method: "DELETE",
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {navItems.map((text) => (
          <Link
            to={text.nav}
            key={text.id}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem key={text.name} disablePadding>
              <ListItemButton selected={text.nav === location.pathname}>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {add_data.map((text) => (
          <Link
            to={text.path}
            key={text.id}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem key={text.name} disablePadding>
              <ListItemButton selected={text.path === location.pathname}>
                <ListItemIcon>{text.icon}</ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">HIERARCHY TREE</Typography>
          {location.pathname === "/" && (
            <Button color="inherit" onClick={reset_data}>
              Reset Data
            </Button>
          )}
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
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Appbar;
