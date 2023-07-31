import * as React from 'react'

import { styled } from '@mui/material/styles'
import { Button, CircularProgress } from '@mui/material'
import { Box } from '@mui/system'

const SubmitButtonStyled = styled(Button)(({ theme, color }) => ({
  background: color ?? theme.palette.primary.main,
  color: theme.palette.light.main,
  width: '100%',
  minWidth: '200px',
  padding: theme.spacing(3),

}))

const ResetButtonStyled = styled(Button)(({ theme, color }) => ({

  background: color ?? 'transparent',
  width: '100%',
  minWidth: '200px',
  textDecoration: "underline",
  textUnderlineOffset: "3px",
  padding: theme.spacing(3),

}))

const ActionButtonStyled = styled(Button)(({ theme, color,active }) => ({

  background: active?  theme.palette.primary.main: color ?? theme.palette.light.main,
  border: "1px solid " + theme.palette.primary.calender,
  color:active?color ?? theme.palette.light.main: theme.palette.primary.calender,
  fontWeight:"600",
  width: '100%',
  minWidth: '100px',
  letterSpacing:"1px",
  height: "100%",
  padding: theme.spacing(3),
  
  ":hover":{
    color: color ?? theme.palette.light.main,    
    background: theme.palette.primary.main,
  }

}))

const SubmitButton = ({ title, loading, ...props }) => {
  return (
    <SubmitButtonStyled variant="contained" {...props} >
      {props.icon}
      {!loading && title}

      {loading && <CircularProgress size={25} color="light" ml={4} />}
    </SubmitButtonStyled>
  )
}

export const ResetButton = ({ title, loading, ...props }) => {
  return (
    <ResetButtonStyled variant="text" {...props} >
      {props.icon}
      {!loading && title}

      {loading && <CircularProgress size={25} color="light" ml={4} />}
    </ResetButtonStyled>
  )
}
export const ActionButton = ({ title, loading, icon, ...props }) => {
  return (
    <ActionButtonStyled disableElevation variant="text" {...props} >
      {icon}
      &nbsp;
      {!loading && title}

      {loading && <CircularProgress size={25} color="light" ml={4} />}
    </ActionButtonStyled>
  )
}
export default SubmitButton
