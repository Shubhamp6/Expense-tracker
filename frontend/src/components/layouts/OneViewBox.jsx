import { styled } from '@mui/material/styles';

import { Box } from '@mui/system';

const OneViewBox = styled(Box)(({ theme }) => ({

    height: "100vh",
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection:"column",
    
}));

export default OneViewBox