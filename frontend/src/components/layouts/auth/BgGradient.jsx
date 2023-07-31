import { Box } from '@mui/material';
import * as React from 'react';
import gradLeft from '../../../assets/images/auth-left.png';
import gradRight from '../../../assets/images/auth-right.png';
import ImageComponent from '../../ImageComponent';



const BgGradient = ({ className, ...props }) => {
    if (props.left)
        return <Box sx={{
            position: 'absolute',
            top: '0px',
            zIndex: -1,
            left: '0px',
            height: "100vh",
            width: "48.438vw",
        }} className="auth-gradient-left">
            <ImageComponent src={gradLeft} className="fit-content" alt="" />
        </Box>

    return <Box sx={{
        position: 'absolute',
        top: '0px',
        right: "0px",
        zIndex: -1,
        height: "100vh",
        width: '25.969vw'
    }} className="auth-gradient-right">
        <ImageComponent src={gradRight} className="fit-content" alt="" />
    </Box>
}

export default BgGradient