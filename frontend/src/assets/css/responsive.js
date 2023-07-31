import { Box } from "@mui/material";

const responsive = {
  outerBoxStyle: {
    "@media (max-width:960px)": {
      minHeight: "200px",
    },
  },
  box: {
    "@media (max-width:960px)": {
      borderRadius: "25px 25px 0px 0px",
    },
  },
  input: {
    width: "415px",
    "@media (max-width:960px)": {
      width: "285px",
    },
  },
  heading: {
    "@media (max-width:960px)": {
      fontSize: "24px",
      lineHeight: "32px",
    },
  },
  para: {
    "@media (max-width:960px)": {
      fontSize: "12px",
      lineHeight: "16px",
    },
  },
  avatarBG: {
    "@media (max-width:960px)": {
      marginTop: "48px",
      width: 36,
      height: 37,
    },
  },
  weHearLogoBox: {
    "@media (max-width:960px)": {
      width: "210px !important",
      height: "29px !important",
    },
  },
  designation: {
    "@media (max-width:1013px)": {
      display: "none",
    },
  },
  companyDocument: {
    "@media (max-width:960px)": {
      content: '"Documents"',
      fontSize: "16px",
    },
  },
  containerStyle: {
    "@media (max-width:870px)": {
      display: "none",
    },
  },
  mobileContainerStyle: {
    "@media (min-width:870px)": {
      display: "none",
    },
  },
  headerStyle: {
    "@media (max-width:870px)": {
      display: "none",
    },
  },
  mobileHeaderStyle: {
    "@media (min-width:870px)": {
      display: "none",
    },
  },
  document: {
    "@media (max-width:870px)": {
      background: "none",
      padding: "4px 0 4px 0",
    },
  },
};

export default responsive;
