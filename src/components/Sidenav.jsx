import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { colors } from "../utilities/colors";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/UE.png";
import { Divider } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const drawerWidth = 260;

const menus = [
  {
    primary: "Tableau de Bord",
    icon: <DashboardIcon />,
    path: "/",
  },
  {
    primary: "Gestion des Projets",
    icon: <FolderOpenIcon />,
    path: "/gestion-des-projets",
  },
  {
    primary: "Gestion des Comptes",
    icon: <ManageAccountsIcon />,
    path: "/gestion-des-comptes",
  },
];

const Sidenav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // handle navigation
  const handleClick = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}>
        <Box display={"flex"} alignContent={"center"} sx={{ m: 3 }}>
          <img height={50} src={logo} alt="fireSpot" />
          <span>
            <Typography
              sx={{ color: colors.primary, fontWeight: "bold", pt: 1.5 }}>
              Universite Espoir
            </Typography>
          </span>
        </Box>
        <Divider></Divider>
        {menus.map((menu) => (
          <Typography
            key={menu.path}
            disablePadding
            onClick={() => {
              handleClick(menu.path);
            }}
            textColor="inherit">
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemButton
              sx={{
                ml: 2,
                mr: 2,
                color:
                  location.pathname === menu.path
                    ? colors.primary
                    : colors.secondary,

                borderRadius: "5px",
                ":hover": {
                  color: colors.secondary,

                  borderRadius: "5px",
                },
              }}>
              <ListItemText
                primary={
                  <Typography fontWeight={"bold"}>{menu.primary}</Typography>
                }
                sx={{ color: colors.primary }}
              />
            </ListItemButton>
          </Typography>
        ))}
      </Drawer>
    </Box>
  );
};

export default Sidenav;
