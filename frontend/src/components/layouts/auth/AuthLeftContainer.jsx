import { Box, Typography } from "@mui/material";
import ImageComponent from "../../ImageComponent";
import logo from "../../../assets/images/logo_full.png";
import { center } from "../../../assets/css/theme/common.js";
import { width } from "@mui/system";
import BackGroundLogo from "../../../assets/images/BackGround.png";
import responsive from "../../../assets/css/responsive";
import WeHearLogo from "../../../assets/images/WEHEARHRMSLOGIN.png";

const outerBoxStyle = (theme) => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    flexDirection: "column",
    ...responsive.outerBoxStyle,
  };
};

const heading = {
  fontFamily: "Azonix Regular",
  src: `local('Azonix Regular'), url('../../../assets/fonts/azonix-cufonfonts-webfont/Azonix.woff') format('woff')`,
  fontSize: "48px",
  fontWeight: 400,
  lineHeight: "60px",
  letterSpacing: "0.315em",
  color: "#FFFFFF",
};

const BackGroundStyle = {
  background: `url(${BackGroundLogo})`,
  objectFit: "cover",
  width: "100%",
};

const text = {
  fontFamily: "Azonix",
  fontFamily: "Azonix Regular",
  src: `local('Azonix Regular'), url('../../../assets/fonts/azonix-cufonfonts-webfont/Azonix.woff') format('woff')`,
  fontWeight: 400,
  fontSize: "24px",
  lineHeight: "32px",
  letterSpacing: "0.315em",
  color: "#FFFFFF",
};

const weHearLoginLogoBox = {
  width: "296px",
  height: "43px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  ...responsive.weHearLogoBox,
};

const weHearLoginLogoImg = {
  width:"100%",
  height:"100%",
}
const AuthLeftContainer = () => {
  return (
    <Box sx={BackGroundStyle}>
      <Box sx={outerBoxStyle}>
        {/* <Box>
                    <Typography variant="display1" sx={heading}>
                        WEHEAR
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h2" sx={text}>
                        PAYROLL
                    </Typography>
                </Box> */}
        <Box sx={weHearLoginLogoBox}>
          <img src={WeHearLogo} alt="WEHEARHRMS" style={weHearLoginLogoImg}/>
        </Box>
      </Box>
    </Box>
  );
};
export default AuthLeftContainer;
