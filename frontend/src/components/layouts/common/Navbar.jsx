import { FiberManualRecordOutlined, FiberManualRecordRounded, FiberManualRecordTwoTone, Home, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { Box, ButtonBase, Collapse, Icon, styled, Typography } from "@mui/material"
import { Fragment, memo, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useLocation, useRoutes } from "react-router-dom"
import defineRoutes from "../../../routes"
let activePath = "";
const ParentNavItem = styled(Box)(({ theme, active }) => ({
    width: "100%",
    display: 'flex',
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    marginBottom: theme.spacing(2),
    position: "relative",

}))

const ParentNavInner = styled(Box)(({ theme, active }) => ({
    width: "100%",
    display: 'flex',
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),

    borderRadius: theme.shape.borderRadius,

    background: active ? theme.palette.dark['200'] : "transparent",
    color: active ? theme.palette.primary.main : theme.palette.text['300'],
    stroke: active ? theme.palette.primary.main : theme.palette.text['300'],
    cursor: "pointer",
    transition: "all 0.5s linear",
    ":hover": {
        color: theme.palette.primary.main
    }
}))

const CollpasableContainer = styled(Collapse)(({ theme, active }) => ({
    width: "100%",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
}))

const NavItemContainer = styled(ButtonBase)(({ theme, Active }) => ({
    width: "100%",
    display: 'flex',

    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(2),
    "*": {
        color: Active ? theme.palette.green.main : theme.palette.light.main,
    }
}))

const NavItem = memo(({ active, title, path, Icon, activeIcon }) => {
    const location = useLocation()
    let splittedPath = location.pathname.split('/')
    let Active = splittedPath[1] == title.toLowerCase();
    return (
        <NavItemContainer Active={Active} to={path} LinkComponent={Link}>
            {Active ? activeIcon : Icon}
            <Typography ml={2} fontWeight={'400'} lineHeight={'100%'} variant="h4">{title}</Typography>
        </NavItemContainer>
    )
})
const NavDropDown = memo(({ activeParent, title, Icon, path, children, activeIcon }) => {

    const [open, setOpen] = useState(activeParent)
    const location = useLocation()
    let splittedPath = location.pathname.split('/')
    useEffect(() => {
        setOpen(activeParent)
    }, [activeParent])
    return (

        <>
            {
                children && Array.isArray(children) && children.map((route) => {
                    if (route.hideInPannel)
                        return <Fragment key={route.title} />
                    return <NavItem key={route.title} active={((splittedPath[2] == route.path && splittedPath[1] == path) || (splittedPath[1] == '' && splittedPath[1] == path))} title={route.title} path={`/${path}/${route.path}`} Icon={Icon} activeIcon={activeIcon} />
                })
            }
        </>
    )
})

const Navbar = () => {
    const { user } = useSelector((state) => state)
    const routes = defineRoutes(user)
    const location = useLocation()

    const splittedPath = location.pathname.split('/')
    return (
        <>
            {
                routes && Array.isArray(routes) && routes.map((route) => {
                    // const path = 
                    if (route.hideInPannel)
                        return <Fragment key={route.title} />
                    return <NavDropDown key={route.title} activeParent={splittedPath && splittedPath[1] == route.path} Icon={route.icon} children={route.children} title={route.title} path={route.path} activeIcon={route.activeIcon} />
                })
            }
        </>
    )
}
export default Navbar