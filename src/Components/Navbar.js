import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import Grid from "@mui/material/Grid";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Button from "@mui/material/Button";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import OrderedItem from "./OrderedItem";
import Menu from "./Menu";
import Stocks from "./Stocks";
import { useState } from "react";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import ComputerIcon from '@mui/icons-material/Computer';
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import CategoryIcon from '@mui/icons-material/Category';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./store/reducer/userSlice";
import { logout } from "./store/reducer/userSlice";
import { useNavigate } from "react-router-dom";
import AddMenu from "./AddMenu";
import Categories from './Categories';
import AddCategories from './AddCategories'
import Dashboard from "./Dashboard";
import AddAdmin from "./AddAdmin";
import OfferForm from "./OfferForm"
import Admin from './Admin'

const drawerWidth = 240;
const settings = ["Hi, ", "Profile", "Account", "Dashboard", "Logout"];
const notification = [
  "Items Added to the Card",
  "Items created successfully",
  "Reminder : Ready for lunch Time!",
  "New Order added",
  "Items created successfully",
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Navbar() {

  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notify, setNotify] = useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNotificationClick = (event) => {
    setNotify(event.currentTarget);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotify(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openNotify = Boolean(notify);
  const idNotify = openNotify ? "simple-popover" : undefined;
  const opening = Boolean(anchorEl);
  const id = opening ? "simple-popover" : undefined;

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    window.localStorage.removeItem('user');
    // document.cookie =
    //   "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/login;";
    //   "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/login;";
    //   `loggedIn=${false}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/login;`;
  };

  const handleIcon = ()=>{
    navigate('/')
  }

  const drawerList = [
    // { name: "Dashboard", icon: <DashboardIcon /> },
    { name: "Admin", icon: <AccountCircleIcon /> },
    { name: "OrderedItem", icon: <ShoppingCartIcon /> },
    { name: "Menu", icon: <RestaurantMenuIcon /> },
    { name: "Stocks", icon: <AutoGraphIcon /> },
    { name: "Category", icon: <CategoryIcon />}
  ];
  // console.log("NAvbar>>>>>>>>>>",anchorEl);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Grid container spacing={0}>
            <Grid item xs={0.5} md={0.5}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
            </Grid>

            <Grid item xs={10.5} md={10.5}>
              <Typography sx={{ mt: 0.5 }} onClick={handleIcon} variant="h6" noWrap component="div">
                RMS
              </Typography>
            </Grid>
            <Grid align='right' justifyContent='center' item xs={0.5} md={0.5}>
              <Box
                aria-describedby={id}
                variant="contained"
                onClick={handleNotificationClick}
              >
                <Badge color="success" badgeContent={1212}>
                  <NotificationsIcon fontSize="large" />
                </Badge>
              </Box>
              <Popover
                id={idNotify}
                open={openNotify}
                anchorEl={notify}
                onClose={handleNotificationClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Box m="2" p="1" sx={{ bgcolor: "##F1F1F0" }}>
                  {notification.map((element) => {
                    return (
                      <Box>
                        <Stack direction="row" alignItems="center" gap={1}>
                          {/* <Tooltip title="Open settings"> */}
                          <IconButton sx={{ p: 0, m: 1}}>
                            <Avatar
                              alt="Remy Sharp"
                              src="/static/images/avatar/2.jpg"
                            />
                          </IconButton>
                          {/* </Tooltip> */}
                          <Typography sx={{ p: 1, color: "#6A7189" }}>
                            {element}
                          </Typography>
                          <Divider />
                        </Stack>
                      </Box>
                    );
                  })}
                </Box>
              </Popover>
            </Grid>
            <Grid align='right' item xs={0.5} md={0.5}>
              <div>
                <Box
                  aria-describedby={id}
                  variant="contained"
                  onClick={handleClick}
                >
                  <Tooltip title="Open settings">
                    <IconButton sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Popover
                  id={id}
                  open={opening}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Grid container direction="column" >
                    {settings.map((setting) => {
                      return setting === "Hi, " ? (
                        <Typography sx={{ p: 2, width: "200px", textAlign: 'center' }}>
                          {setting + user.username}
                        </Typography>
                      ) : setting === "Logout" ? (
                        <Button
                          sx={{ p: 2, width: "200px" }}
                          onClick={(e) => handleLogout(e)}
                        >
                          {setting}
                        </Button>
                      ) : (
                        <Button sx={{ p: 2, width: "200px" }}>
                          {setting}
                        </Button>
                      );
                    })}
                  </Grid>
                </Popover>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box p={2} width="250px" textAlign="center" role="presentation">
            <Typography variant="h6" component="div">
              RMS
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {drawerList.map((text, index) => (
            // console.log("Test>>>>>>>>", text)
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={text.name}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {text.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={text.name}
                    sx={{ opacity: open ? 1 : 0, color: '#3385ff' }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/OrderedItem" element={<OrderedItem />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/Stocks" element={<Stocks />} />
          <Route path="/addmenu" element={<AddMenu />} />
          <Route path="/edit/:id" element={<AddMenu />} />
          <Route path="/category" element={<Categories />} />
          <Route path="/addcategories" element={<AddCategories />} />
          <Route path="/editcategories/:id" element={<AddCategories />} />
          <Route path="/addAdmin" element={<AddAdmin />} />
          <Route path="/offers" element={<OfferForm />} />
          <Route path="/signUp" element={<Admin />} />
        </Routes>
      </Box>
    </Box>
  );
}
