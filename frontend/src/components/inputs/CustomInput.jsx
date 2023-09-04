import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'
const formControlStyle = (theme, props) => {
  return {
    // marginTop: theme.spacing
    color: props && props.color ? props.color : "rgba(0, 0, 0, 0.6)"
  }
}
const CustomInput = (props) => {
  const [type, setType] = useState(props.type ? props.type : 'text')
  if (props.type === 'password') {
    return (
      <FormControl
        sx={formControlStyle}
        margin="dense"
        fullWidth={true}
        mt={1}
        mb={1}
        variant="outlined"
        focused
      >
        <InputLabel htmlFor="outlined-adornment-password" color="white">
          {props.label ? props.label : 'password'}
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          className="row"
          label="password"
          {...props}
          type={type}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => {
                  setType(type === 'password' ? 'text' : 'password')
                }}
                color="white"
                edge="end"
              >
                {type === 'password' ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          focused
        />
      </FormControl>
    )
  }
  if (props.type === 'side-icon') {
    return (
      <FormControl
        sx={formControlStyle}
        margin="dense"
        fullWidth={true}
        mt={1}
        mb={1}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password">
          {props.label ? props.label : 'password'}
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          className="row"
          label={props.label}
          {...props}
          type={props.inputType ? props.inputType : 'text'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => {
                  props.on_side_btn_click()
                }}
                color="secondary"
                edge="end"
              >
                {props.side_icon}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    )
  }

  return (
    <TextField
      fullWidth={true}
      margin="dense"
      inputProps={props.inputProps ? props.inputProps : {
        sx: {
          // zIndex:"-1",
          // border:" 0.078vw solid #A91674",
          borderRadius: 'inherit'
        },

      }}
      {...props}
    />
  )
}
export default CustomInput
