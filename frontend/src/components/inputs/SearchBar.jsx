import { Search } from "@mui/icons-material"
import { Avatar, Box, Input, styled, TextField, Typography } from "@mui/material"
import { getUserApi } from "../../apis/user.api"
import AsyncDropDown from "./AsyncDropDown"
import { unEscapeStr } from "../../utils/helper"

const StyledInput = styled(TextField)(({ theme }) => ({
  padding: theme.spacing(3),

  background: theme.palette.light.main,
  borderRadius: theme.shape.borderRadius,
  lineHeight: "100%",
  display: "flex",
  alignItems: "center",

  boxShadow: theme.shadows[1],





  '::before': {
    content: "none",

  },
  ":focus": {

    '::before': {
      content: "none",
      borderRadius: theme.shape.borderRadius,
    },


  },
  '.MuiOutlinedInput-root': {
    padding: '0px !important',
  },
  'fieldset': {
    padding: '0px !important',
    border: "none !important"
  },
  ':after': {
    display: 'none',
    borderBottomLeftRadius: theme.shape.borderRadius,
  },
  color: theme.palette.grey.light,
  outline: "none",
  borderRadius: theme.shape.borderRadius,


  paddingBottom: theme.spacing(3) + " !important",
}))


export const StyledSearchBar = styled(TextField)(({ theme }) => ({
  padding: theme.spacing(0),

  background: theme.palette.grey['200'],
  borderRadius: theme.shape.borderRadius,
  lineHeight: "100%",
  display: "flex",
  alignItems: "center",

  '::before': {
    content: "none",

  },
  ":focus": {

    '::before': {
      content: "none",
      borderRadius: theme.shape.borderRadius,
    },


  },
  '.MuiOutlinedInput-root': {
    padding: '0px !important',
  },
  'fieldset': {
    padding: '0px !important',
    border: "none !important",

  },
  ':after': {
    display: 'none',
    borderBottomLeftRadius: theme.shape.borderRadius,
  },
  color: theme.palette.grey.light,
  outline: "none",
  borderRadius: theme.shape.borderRadius,



}))

export const UserSearchBarNormal = ({ onUserChange, inputProps = {}, defaultParams= { },defaultVal}) => {
  return <AsyncDropDown
    InputComponent={(props) => <TextField label placeholder="Search Manager"  {...props} {...inputProps} />}
    lazyFun={async (props) => {
      return await getUserApi({ ...defaultParams, ...props })
    }}
    defaultVal={defaultVal}
    OptionComponent={({ option, ...rest }) => {
      return <Box sx={{ width: "100%", display: "flex", alignItems: "center" }} {...rest}>
        <Avatar src={unEscapeStr(option.profile_url)}></Avatar> <Typography ml={3} variant="h5">{option.name} ({option.designation})</Typography>
      </Box>
    }}
    onChange={async (changedVal) => { onUserChange(changedVal) }}
    titleKey={'name'}
    valueKey={"_id"}


  />
}
const UserSearchBar = ({ onUserChange }) => {
  return <AsyncDropDown
    InputComponent={(props) => <StyledInput placeholder="Search User"  {...props} />}
    lazyFun={getUserApi}
    startAdornment={<Search sx={{ mr: 2 }} />}
    OptionComponent={({ option, ...rest }) => {
      return <Box sx={{ width: "100%", display: "flex", alignItems: "center" }} {...rest}>
        <Avatar color="dark" src={unEscapeStr(option.profile_url)}></Avatar> <Typography ml={3} variant="h5">{option.name} ({option.designation})</Typography>
      </Box>
    }}
    onChange={async (changedVal) => { onUserChange(changedVal) }}
    titleKey={'name'}
    valueKey={"_id"}
    sx={{heigh:"64px"}}

  />
}


export default UserSearchBar