import { Box } from "@mui/material"
import ImageComponent from "../../ImageComponent"
import logo from '../../../assets/images/logo_full.png';
import { center } from "../../../assets/css/theme/common.js";

const outerBoxStyle = (theme) => {

    return {
        display: "flex",
        ...center,
        Width: "100%",
        padding: "0%",
        minHeight: "100%",
        background: "#FFFFFF",
        [theme.breakpoints.down('md')]: {
            padding: "0% 0% ",
          },

    }
}

const AuthRighttContainer = ({ children }) => {
    return (


        <Box sx={outerBoxStyle}>
            {children}
        </Box>

    )
}
export default AuthRighttContainer