import * as React from 'react';

import { styled } from '@mui/material/styles';

import { Box } from '@mui/system';

const GrayBgBox = styled(Box)(({ theme }) => ({
    display:"flex",
    width:"100%",
    padding:40,
    backgroundColor:theme.palette.grey[200]
}));
export default GrayBgBox