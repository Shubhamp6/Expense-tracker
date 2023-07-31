import {
  Button,
  FormControl,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { center } from '../../assets/css/theme/common'
const buttonStyle = (theme) => {
  return {
    ...center,
    height: '100%',
    boxShadow: 2,
    flexDirection: 'column',
    overflow: 'hidden',
    py: 4,
    background: theme.palette.light.main,
    h4: {
      transition: 'all 0.1s linear',
      color: theme.palette.dark.main,
    },
    h2: {
      transition: 'all 0.1s linear',
    },
    ':disabled': {
      cursor: 'default',
      ':hover': {
        background: theme.palette.light.main,
      },
      h4: {
        color: theme.palette.dark.main,
      },
      h1: {
        color: theme.palette.primary.main,
      },
    },
    ':hover': {
      color: theme.palette.light.main,
      h4: {
        color: theme.palette.light.main,
      },
    },
  }
}

const skeletonStyle = (theme) => {
  return {
    ...center,
    width: '100%',
    paddingTop: '65%',
    boxShadow: 2,
  }
}

const activeButtonStyle = (theme) => {
  return {
    ...center,
    height: '100%',
    boxShadow: 2,
    py: 4,
    flexDirection: 'column',

    color: theme.palette.light.main,
  }
}

const dropDownStyle = (theme) => {
  return {
    position: 'absolute',
    bottom: '0px',

    display: 'flex',
    textAlign: 'left',
    px: 1,
    flexDirection: 'column',

    left: 0,
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    width: '100%',
    '::before': {
      display: 'none !important',
    },
    background: theme.palette.light.main,
    color: theme.palette.dark.main,
  }
}
const ClickButton = ({
  loading,
  active,
  title,
  subTitle,
  icon,
  dropDownData,
  dropDownProps,
  ...props
}) => {
  if (loading) {
    return <Skeleton variant="rounded" sx={skeletonStyle} />
  }
  return (
    <Button
      {...props}
      fullWidth={true}
      sx={active ? activeButtonStyle : buttonStyle}
    >
      {icon}
      <Typography variant="h1">{title}</Typography>
      <Typography variant="h4">{subTitle}</Typography>

      {dropDownData && Array.isArray(dropDownData) && (
        <FormControl variant="standard" sx={dropDownStyle} fullWidth={true}>
          <Select
            fullWidth={true}
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="select interval"
            sx={{ ':before': { display: 'none' } }}
            {...dropDownProps}
          >
            {dropDownData.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.label}
                </MenuItem>
              )
            })}
            <MenuItem value={' '}>Lifetime</MenuItem>
          </Select>
        </FormControl>
      )}
    </Button>
  )
}
export default ClickButton
