import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { center } from "../../../assets/css/theme/common";

const CenteredBox = styled(Box)(() => ({
    ...center
}))
export { CenteredBox }