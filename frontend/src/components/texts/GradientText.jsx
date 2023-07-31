import * as React from 'react';

import { styled } from '@mui/material/styles';
import { Button, Typography } from '@mui/material';

const GradientText = styled(Typography)(({ theme }) => ({

    width: "100%",
    
    
    background: 'linear-gradient(92.74deg,'+theme.palette.grey.main +'-4.3%, '+theme.palette.text.primary +'109.11%)',

    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    'background-clip': 'text',
    'text-transform': 'uppercase' ,

}));

export default GradientText

