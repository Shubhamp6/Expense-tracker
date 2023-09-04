import { Box, Collapse, IconButton, useTheme, Paper, useMediaQuery, Typography, Button, ButtonBase, styled } from "@mui/material"
import { useSelector, useDispatch } from 'react-redux'
import { Outlet, useLocation, useNavigate } from "react-router-dom"



import { useEffect, useState } from "react"
import { memo } from "react"
import AppModeLabel from "../../texts/AppModeLabel"
import { center } from "../../../assets/css/theme/common"
import PopUpModal from "../../Modal"
import { Logo, ExpensierLogo, LogOut } from "./Logo"
import Header from "./Header"
import Navbar from "./Navbar"

import responsive from "../../../assets/css/responsive"
import MobileNav from "./MobileNav"
import colorTheme from "../../../assets/css/theme/colorTheme"
import { signOutAction } from "../../../store/actions/userReducerAction"




const containerStyle = (theme) => ({
  display: "flex", background: "#000000", display: "flex",
  padding: "0 24px 0 24px",
  gap: '24px', ...responsive.containerStyle, ...center,
  height: "100vh"
})
const mobileContainerStyle = (theme) => ({ height: "100%", width: "100%", display: "flex", background: "#FFFFFF", ...responsive.mobileContainerStyle })
const navBarOuterStyle = (theme) => ({ height: "90vh", width: "224px", position: "relative" })
const navbarInnerStyle = (theme) => ({ width: "224px", background: "#1B191B", height: "100%", overflowY: "auto", position: "relative", borderRadius: "25px", position: "relative" })
const boxStyle = (theme) => ({
  width: "100%",
  height: "90vh",
  borderRadius: "25px",
  background: "#1B191B",
  overflow: "scroll"
})
const sidePanel = (theme) => ({
  display: "flex",
  width: "224px",
  padding: "52px 0 52px 0",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  flexShrink: 0,
})
const expensierLogo = (theme) => ({
  ...center,
  width: "100px",
  height: "100px",
  flexShrink: 0
})
let activePath = "";

const AppContainer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const user = useSelector(state => state.user)
  console.log(user);
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const Logout = styled(ButtonBase)(({ theme, Active }) => ({
    width: "150px",
    display: 'flex',
    borderRadius: "20px",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    alignSelf: "strech",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: "#fff",
    color: "primary.main",
    position: "absolute",
    bottom: "52px"
  }))


  return (
    <>
      {
        process.env.REACT_APP_APP_MODE != 'production' && <AppModeLabel />
      }

      <PopUpModal />
      {!isMobile && <Box sx={containerStyle}>
        <Box elevation={2} sx={navBarOuterStyle}>
          <Paper elevation={2} sx={navbarInnerStyle}>
            <Box sx={sidePanel}>
              <Box>
                <ExpensierLogo sx={expensierLogo} />
                <Typography sx={{ ...center }} color="light.main" >Hi,{user.data.name}</Typography>
              </Box>
              <Box mt={"52px"}>
                <Navbar />
              </Box>
            </Box>
            <Box sx={{ ...center }}>
              <Logout onClick={() => {
                dispatch(signOutAction());
              }}>
                <LogOut />
                <Typography sx={{ ...center }} color="primary.main" >Log out</Typography>
              </Logout>
            </Box>
          </Paper>
        </Box>


        <Box sx={boxStyle}>
          <Box p={"20px 54px 20px 54px"} sx={{ display: "flex", flex: 1, flexDirection: "column", color: "light.main" }}>
            <Outlet />
          </Box>
        </Box>
      </Box >}

      {isMobile && <Box sx={mobileContainerStyle}>
        <Box sx={boxStyle}>
          <MobileNav />
          <Header />
          <Box pb={3} pr={4} pl={4} sx={{ display: "flex", flex: 1, flexDirection: "column", overflowY: "scroll" }}>
            <Outlet />
          </Box>
        </Box>
      </Box>}



    </>
  )
}
export default memo(AppContainer)