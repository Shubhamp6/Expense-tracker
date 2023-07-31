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

const CustomMonthPicker = ({ date, setDate }) => {
  return (
    <Paper
      sx={{
        display: 'flex',
        padding: 2,
        flex: 1,

        backgroundColor: colorTheme.palette.grey.calender,
        height:"100%",
        boxShadow: 'none',
        border:"1px solid "+ colorTheme.palette.grey.calender
      }}
      component={Box}
    >
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          mr: 2,
          borderRight: '1px solid gray',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <IconButton
          onClick={() =>
            setDate(
              moment()
                .set('months', date.get('month'))
                .set('years', date.get('year') - 1),
            )
          }
        >
          <KeyboardDoubleArrowLeft color="primary" />
        </IconButton>
        <IconButton
          onClick={() =>
            setDate(
              moment()
                .set('years', date.get('year'))
                .set('months', date.get('month') - 1),
            )
          }
          disabled={date.get('month') == 0}
        >
          <KeyboardArrowLeft
            color={date.get('month') == 0 ? 'grey' : 'primary'}
          />
        </IconButton>

        <Typography variant="h3">
          {date && date.format('MMMM, YYYY')}
        </Typography>

        <IconButton
          onClick={() =>
            setDate(
              moment()
                .set('years', date.get('year'))
                .set('months', date.get('month') + 1),
            )
          }
          disabled={date.get('month') == 11}
        >
          <KeyboardArrowRight
            color={date.get('month') == 11 ? 'grey' : 'primary'}
          />
        </IconButton>

        <IconButton
          onClick={() =>
            setDate(
              moment()
                .set('months', date.get('month'))
                .set('years', date.get('year') + 1),
            )
          }
          disabled={
            moment().get('year') <= date.get('year') ||
            (moment().get('year') <= date.get('year') + 1 &&
              moment().get('month') < date.get('month'))
          }
        >
          <KeyboardDoubleArrowRight
            color={
              moment().get('year') <= date.get('year') ||
              (moment().get('year') <= date.get('year') + 1 &&
                moment().get('month') < date.get('month'))
                ? 'grey'
                : 'primary'
            }
          />
        </IconButton>
      </Box>

      <CustomDatePicker date={date} setDate={setDate} />
    </Paper>
  )
}
export default CustomMonthPicker
