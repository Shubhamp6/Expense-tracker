
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';


const FullScreenContainer = styled(Box)(({ theme }) => ({
    background: "#1A1A1A",
    maxWidth: "100%",
    flex:"1",
    flexDirection:"row",
    display: "flex",
    margin:"auto",
    
    height:"100%",
    [theme.breakpoints.down('md')]: {
        maxWidth: "100%",
      },

}));

export default FullScreenContainer
