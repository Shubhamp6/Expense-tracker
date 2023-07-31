import {
  Avatar,
  Badge,
  Box,
  ButtonBase,
  Collapse,
  Fab,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
  Popover,
  List,
  ListSubheader,
  ListItemButton,
  styled,
  ListItem,
  ListItemText,
} from "@mui/material";

// import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { toTitleCase } from "../../../utils/helper";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Link } from "react-router-dom";
import { center } from "../../../assets/css/theme/common";
import { signOutAction } from "../../../store/actions/userReducerAction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import responsive from "../../../assets/css/responsive";
import MenuIcon from "@mui/icons-material/Menu";
import { Logo } from "./Logo";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ClearIcon from "@mui/icons-material/Clear";

const headerStyle = (theme) => ({
  width: "100%",
  background: "white",
  position: "sticky",
  top: "0px",
  display: "flex",
  alignItems: "center",
  height: "88px",
  pt: 3,
  pb: 3,
  pr: 4,
  pl: 3,
  zIndex: "11",
  borderRadius: "0px",
  boxShadow:
    "40px 15px 26px rgba(0, 0, 0, 0.01), 18px 7px 19px rgba(0, 0, 0, 0.02), 4px 2px 10px rgba(0, 0, 0, 0.02), 0px 0px 0px rgba(0, 0, 0, 0.02)",
  border: "1px solid #E6E6E6",
  paddingRight: "60px",
  ...responsive.headerStyle,
});
const mobileHeaderStyle = (theme) => ({
  width: "100%",
  background: "white",
  position: "sticky",
  top: "0px",
  display: "flex",
  alignItems: "center",
  height: "50px",
  pr: "20px",
  pl: "20px",
  zIndex: "11",
  borderRadius: "0px",
  boxShadow:
    "40px 15px 26px rgba(0, 0, 0, 0.01), 18px 7px 19px rgba(0, 0, 0, 0.02), 4px 2px 10px rgba(0, 0, 0, 0.02), 0px 0px 0px rgba(0, 0, 0, 0.02)",
  border: "1px solid #E6E6E6",
  ...responsive.mobileHeaderStyle,
});

const Header = () => {
  const user = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //   const [sideNav, setSideNav] = useState(false);
  //   const handleDrawerOpen = () => {
  //     setSideNav(true);
  //   };

  const toggleDrawer = (toggle) => (event) => {
    // if (
    //   event.type === "keydown" &&
    //   (event.key === "Tab" || event.key === "Shift")
    // ) {
    //   return;
    // }
    setDrawerOpen(toggle);
  };

  //   const handleDrawerClose = () => {
  //     setSideNav(false);
  //   };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const dispatch = useDispatch();
  const designation = {
    ...responsive.designation,
  };

  return (
    <>
      <Paper elevation={1} sx={headerStyle}>
        <Box sx={{ display: "flex", alignItems: "flex-end", flex: 1 }}>
          <Typography variant="h3">{user.data.name && toTitleCase(user.data.name)}</Typography>
          <Typography variant="h6" color={"text.200"} ml={2} sx={designation}>
            ({user.data.designation})
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: "30px" }}>
          <Badge
            color="success"
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent=" "
            variant="dot"
          >
            <ButtonBase
              p={0}
              LinkComponent={Link}
              aria-describedby={id}
              onClick={handleClick}
            >
              <Avatar sx={(theme) => ({ bgcolor: theme.palette.primary.main })}>
                {user.data.name && user.data.name[0].toUpperCase()}
              </Avatar>
            </ButtonBase>
          </Badge>
          <Popover
            sx={(theme) => ({ marginTop: theme.spacing(3), paddingTop: 3 })}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <List
              sx={{
                width: "160px",
                maxWidth: "100%",
                bgcolor: "background.paper",
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader
                  component={Box}
                  variant="subtitle1"
                  pt={2}

                  color="text.primary"
                  id="nested-list-subheader"
                >
                  <Typography lineHeight="150%" variant="h5">
                    {user.data.name && toTitleCase(user.data.name)}
                  </Typography>
                  <Typography
                    lineHeight="100%"
                    variant="h6"
                    color={"text.200"}

                  >
                    {user.data.designation}
                  </Typography>
                </ListSubheader>
              }
            >
              <ListItemButton>
                <ButtonBase
                  p={0}
                  LinkComponent={Link}
                  to="/profile"
                  aria-describedby={id}
                  onClick={handleClose}
                >
                  <AccountCircleIcon variant={"primary.main"} />
                  &nbsp;&nbsp;View Profile
                </ButtonBase>
              </ListItemButton>
              <ListItemButton>
                <ButtonBase
                  p={0}
                  LinkComponent={Link}
                  onClick={() => {
                    dispatch(signOutAction());
                  }}
                  variant="contained"
                >
                  <LogoutIcon />
                  &nbsp;&nbsp;Log Out
                </ButtonBase>
              </ListItemButton>
            </List>
          </Popover>
        </Box>
      </Paper>
      <Paper elevation={1} sx={mobileHeaderStyle}>
        <Grid container>
          <Grid
            item
            xs={4}
            sx={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Box sx={{ display: "flex" }}>
              {/* <ButtonBase onClick={handleDrawerOpen}>
                                <MenuIcon variant={"primary.main"} />
                            </ButtonBase> */}
              <ButtonBase onClick={toggleDrawer(true)}>
                <MenuIcon variant={"primary.main"} />
              </ButtonBase>
              {/* <Drawer
                                variant="persistent"
                                anchor="left"
                                open={sideNav}
                            > */}
              <SwipeableDrawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
              >
                <Paper
                  sx={{
                    width: "300px",
                    borderRadius: "none",
                    boxShadow: "none",
                    zIndex: "99",
                  }}
                >
                  <Box sx={{ ...center }}>
                    {/* <ButtonBase
                      onClick={handleDrawerClose}
                      sx={{
                        position: "absolute",
                        top: "3px",
                        right: "3px",
                      }}
                    >
                      <ClearIcon variant={"primary.main"} />
                    </ButtonBase> */}
                    <Box sx={{ marginTop: "24px", width: "113px" }}>
                      <Avatar
                        sizes="large"
                        sx={{
                          width: "64px",
                          height: "64px",
                          bgcolor: "primary.main",
                          marginLeft: "25px",
                        }}
                      >
                        <Typography variant="h1">
                          {user.data.name && user.data.name[0].toUpperCase()}
                        </Typography>
                      </Avatar>
                      <Typography
                        sx={{ marginTop: "12px", ...center }}
                        variant="h3"
                      >
                        {user.data.name && toTitleCase(user.data.name)}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ ...center, ml: "0" }}
                        color={"text.200"}
                        ml={2}
                      >
                        {user.data.designation &&
                          toTitleCase(user.data.designation)}
                      </Typography>
                    </Box>
                  </Box>
                  <List>
                    <ListItem
                      sx={{
                        borderTop: "1px solid #CCCCCC",
                        borderBottom: "1px solid #CCCCCC",
                      }}
                    >
                      <ButtonBase
                        p={0}
                        LinkComponent={Link}
                        to="/profile"
                        aria-describedby={id}
                      // onClick={handleDrawerClose}
                      >
                        <ListItemText primary="Profile" />
                      </ButtonBase>
                    </ListItem>
                  </List>
                  <Box>
                    <Logo
                      mt={4}
                      sx={{
                        position: "absolute",
                        display: "flex",
                        bottom: "94px",
                        alignItems: "center",
                        left: "87px",
                      }}
                    />
                  </Box>
                </Paper>
              </SwipeableDrawer>
            </Box>
          </Grid>
          <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Box>
              <Logo mt={4} mb={4} />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
export default Header;
