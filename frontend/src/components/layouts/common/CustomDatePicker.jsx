import * as React from 'react'
import { CalendarMonthOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import {
  CalendarPicker,
  DesktopDatePicker,
  LocalizationProvider,
  MobileDatePicker,
  MonthPicker,
  YearPicker,
} from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

export default function CustomDatePicker({ date, setDate }) {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <MobileDatePicker
        value={date}
        open={open}
        toolbarTitle="Select Month"
        onClose={handleClose}
        disableFuture
        // ToolbarComponent={<></>}
        showToolbar={false}
        disableOpenPicker
        onChange={(momentObj) => {
          setDate(momentObj)
          handleClose()
        }}
        views={['month', 'year', 'day']}
        renderInput={() => (
          <IconButton onClick={handleClick}>
            <CalendarMonthOutlined />
          </IconButton>
        )}
      ></MobileDatePicker>
    </>
  )
}
