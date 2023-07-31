import {
  FiberManualRecordOutlined,
  FiberManualRecordRounded,
  FiberManualRecordTwoTone,
  Home,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import {
  Box,
  ButtonBase,
  Collapse,
  Icon,
  styled,
  Typography,
} from "@mui/material";
import { Fragment, memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useRoutes } from "react-router-dom";
import defineRoutes from "../../../routes";
import { useNavigate } from "react-router-dom";

const ParentNavItem = styled(Box)(({ theme, active }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  position: "relative",
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
}));

const ParentNavInner = styled(Box)(({ theme, active }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  borderRadius: "83px",
  color: theme.palette.text["300"],
  background: "transparent",
  cursor: "pointer",
  ":hover": {
    color: theme.palette.primary.main,
  },
}));

const NavDropDown = memo(({ activeParent, title, Icon, path, children }) => {

    const [open, setOpen] = useState(activeParent)
    const location = useLocation()
    const splittedPath = location.pathname.split('/')
    const active = {
        display: "flex", alignItems: "center", justifyContent: "center", flex: 1,
        background: open ? "black" : "transparent",
        trasition:"0.5s ease-in",
        color: open ? "light.main" : "text['300']",
        stroke: open ? "white" : "#7F7F7F",
        padding: "6px 12px",
        width: "100%",
        borderRadius: "83px",
        transition: "background 0.3s ease-in"
    }
    const titleAraay = title.split(" ");
    // console.log(titleAraay)
    useEffect(() => {
        setOpen(activeParent)
    }, [activeParent])
 
    return (

        <>
            <ParentNavItem LinkComponent={"Button"} active={open} onClick={() => { setOpen(!open) }}>
                <ParentNavInner active={open}>
                    <ButtonBase sx={active} mt={1} mb={1} LinkComponent={Link} to={`/${path}/`}>
                        {Icon}
                        {open && <Typography ml={2} variant="h6" >{titleAraay[0]}&nbsp;{titleAraay[1]}</Typography>}
                    </ButtonBase>
                </ParentNavInner>
            </ParentNavItem>
        </>
    )
})

const MobileNav = () => {
  const { user } = useSelector((state) => state);
  const routes = defineRoutes(user);
  const location = useLocation();

  const splittedPath = location.pathname.split("/");

  return (
    <Box
      sx={{
        display: "flex",
        height: "50px",
        width: "100%",
        position: "fixed",
        zIndex: "12",
        bottom: "0px",
        background: "#FFFFFF",
        borderTop: "0.5px solid #CCCCCC",
        boxShadow:
          "0px -39px 16px rgba(153, 153, 153, 0.01), 0px -22px 13px rgba(153, 153, 153, 0.03), 0px -10px 10px rgba(153, 153, 153, 0.04), 0px -2px 5px rgba(153, 153, 153, 0.05), 0px 0px 0px rgba(153, 153, 153, 0.05);",
      }}
    >
      {routes &&
        Array.isArray(routes) &&
        routes.map((route) => {
          // const path =
          if (route.hideInPannel) return <Fragment key={route.title} />;
          return (
            <NavDropDown
              key={route.title}
              activeParent={splittedPath && splittedPath[1] === route.path}
              Icon={route.icon}
              children={route.children}
              title={route.title}
              path={route.path}
            />
          );
        })}
    </Box>
  );
};
export default MobileNav;
