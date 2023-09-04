import { Chip, capitalize } from '@mui/material'
import { LEAVE_RESPONSE, REIMBURSEMENT_STATUS } from './constants'

export const accessToken = {
  set: (val) => {
    localStorage.setItem('accessToken', val)
  },
  get: () => localStorage.getItem('accessToken'),
  remove: () => {
    localStorage.removeItem('accessToken')
  },
}
export const loggedInUser = {
  set: (val) => {
    localStorage.setItem('user', JSON.stringify(val))
  },
  get: () =>
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null,
  remove: () => {
    localStorage.removeItem('user')
  },
}

export const refreshToken = {
  set: (val) => {
    localStorage.setItem('refreshToken', val)
  },
  get: () => localStorage.getItem('refreshToken'),
  remove: () => {
    localStorage.removeItem('refreshToken')
  },
}

export const lastReadNotification = {
  set: (val) => {
    localStorage.setItem('last_notification', val)
  },
  get: () =>
    localStorage.getItem('last_notification')
      ? localStorage.getItem('last_notification')
      : null,
  remove: () => {
    localStorage.removeItem('last_notification')
  },
}
export const toTitleCase = (str) => {
  if (str)
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  return str
}

export const logOut = () => {
  refreshToken.remove()
  accessToken.remove()
  loggedInUser.remove()
  lastReadNotification.remove()
}

export const getHeaders = () => {
  const token = `Bearer ${accessToken.get()}`
  return {
    Authorization: token,
  };
};
export const getFileHeaders = () => {
  const token = `Bearer ${accessToken.get()}`;
  return {
    Authorization: token,
    "Content-Type": "multipart/form-data"
  };
};
export function setZeroPrefix(val) {
  if (parseInt(val, 10) < 10) {
    return `0${val}`
  }
  return val
}

export const dateConverter = ({ type = 'DD_MM_YYYY', value }) => {
  if (type === 'DD_MM_YYYY') {
    const dateObj = new Date(value)
    return `${setZeroPrefix(dateObj.getDate())}/${setZeroPrefix(
      dateObj.getMonth() + 1,
    )}/${dateObj.getFullYear()}`
  }
  return value
}

export const validateEmail = (email) => {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
  return re.test(email)
}
export const validatePhone = (phone) => {
  var re = /^\d{10}$/
  return phone.match(re)
}
export const allowedDateFilters = [
  {
    id: 'today',
    label: 'Today',
  },
  {
    id: 'yesterday',
    label: 'Yesterday',
  },
  {
    id: 'last_week',
    label: 'Last Week',
  },
  {
    id: 'last_month',
    label: 'Last Month',
  },
  {
    id: 'last_year',
    label: 'Last Year',
  },
  {
    id: 'this_week',
    label: 'This Week',
  },

  {
    id: 'this_month',
    label: 'This Month',
  },

  {
    id: 'this_year',
    label: 'This Year',
  },
]
export const getDateFiltersTime = (value) => {
  let date = new Date()
  let startDate = date.getTime()
  let endDate = date.getTime()

  switch (value) {
    case 'this_week':
      {
        const currentDay = date.getDay()
        startDate = startDate - currentDay * 3600 * 1000 * 24
        const temp = new Date(startDate)
        startDate = new Date(
          temp.getFullYear(),
          temp.getMonth(),
          temp.getDate(),
        ).getTime()
        endDate = new Date(
          temp.getFullYear(),
          temp.getMonth(),
          temp.getDate() + 7,
        ).getTime()
      }
      break
    case 'this_month':
      {
        const temp = new Date(startDate)
        startDate = new Date(temp.getFullYear(), temp.getMonth()).getTime()
      }
      break
    case 'this_year':
      {
        const temp = new Date(startDate)
        startDate = new Date(temp.getFullYear()).getTime()
      }
      break

    case 'last_month':
      {
        const temp = new Date(startDate)
        startDate = new Date(temp.getFullYear(), temp.getMonth() - 1).getTime()
        endDate = new Date(temp.getFullYear(), temp.getMonth()).getTime()
      }
      break
    case 'last_year':
      {
        const temp = new Date(startDate)
        startDate = new Date(temp.getFullYear() - 1).getTime()
        endDate = new Date(temp.getFullYear()).getTime()
      }
      break
    case 'last_week':
      {
        const currentDay = date.getDay()
        endDate = endDate - currentDay * 3600 * 1000 * 24
        startDate = endDate - 7 * 3600 * 1000 * 24
        const temp = new Date(endDate)
        const tempStart = new Date(startDate)
        endDate = new Date(
          temp.getFullYear(),
          temp.getMonth(),
          temp.getDate(),
        ).getTime()
        startDate = new Date(
          tempStart.getFullYear(),
          tempStart.getMonth(),
          tempStart.getDate(),
        ).getTime()
      }
      break
    case 'today':
      {
        startDate = new Date(startDate)

        startDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
        ).getTime()

        endDate = startDate + 1000 * 60 * 60 * 24
      }
      break
    case 'yesterday':
      {
        startDate = startDate - 1000 * 60 * 60 * 24
        startDate = new Date(startDate)
        startDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
        ).getTime()
        endDate = new Date(endDate)
        endDate = new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate(),
        ).getTime()
      }
      break
    default: {
      const noOfDays = parseInt(value)

      // startDate = startDate - noOfDays * 3600 * 1000 * 24
      // const temp = new Date(startDate)
      // startDate = new Date(
      //   temp.getFullYear(),
      //   temp.getMonth(),
      //   temp.getDate()
      // ).getTime()
      startDate = ''
      endDate = ''
    }
  }

  return {
    startDate,
    endDate,
  }
}
export const Priority = (status) => {
  let color = 'default'
  switch (status) {
    case 'High':
      color = 'error'
      break
    case 'Low':
      color = 'success'
      break
    default:
      color = 'default'
      break
  }
  return color
}
export const titleCase = (s) => {
  if (s)
    return s.replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())       // Initial char (after -/_)
      .replace(/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase())

  return null
}
export const findObjectKeyByValue = (value, object) => {



  for (let val in object) {
    if (object[val] == value) {

      return titleCase(val)
      break
    }

  }
  return undefined
}
export const unEscapeStr = (htmlStr) => {
  if (htmlStr)
    return htmlStr
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&#x2F;/g, "/");
  else return htmlStr

}
export const setStringView = (str, dotAt = "mid") => {
  if (str && str != '') {
    const len = str.length
    if (len > 20) {
      if (dotAt == 'mid')
        return str.slice(0, 10) + "..." + str.slice(-3)
      else return str.slice(0, 13) + "..."
    }
    return str
  }
  return str
}
export const makeAmountString = (amount) => {
  if (amount >= 1000 && amount < 100000) {
    return (amount / 1000).toFixed(1) + "K"
  }

  if (amount >= 100000) {
    return (amount / 1000).toFixed(1) + "L"
  }
  return amount
}