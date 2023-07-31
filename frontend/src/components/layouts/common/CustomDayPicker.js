import {
  CalendarMonthOutlined,
  Circle,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material'
import { IconButton, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import CustomDatePicker from './CustomDatePicker'
import colorTheme from '../../../assets/css/theme/colorTheme'

const CustomDayPicker = ({ date, setDate }) => {
  return (
    <Paper
      sx={{
        display: 'flex',
        
        width:"300px",
        maxWidth:"100%",
        backgroundColor: colorTheme.palette.grey.calender,
        
        boxShadow: 'none',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          mr: 2,          
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <IconButton onClick={() => setDate(moment(date).add(-1, 'day'))}>
          <KeyboardArrowLeft />
        </IconButton>

        <Typography variant="h6">
          {date && date.format('DD MMM YYYY')}
        </Typography>

        <IconButton onClick={() => setDate(moment(date).add(1, 'day'))}>
          <KeyboardArrowRight />
        </IconButton>

        <CustomDatePicker date={date} setDate={setDate} />
      </Box>
    </Paper>
  )
}
export default CustomDayPicker
