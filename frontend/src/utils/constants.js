export const TRANSACTION_FETCH_TYPE = {
  GRAPHICAL_VIEW: "GRAPHICAL_VIEW",
  LIST_VIEW: "LIST_VIEW",
};

export const GRAPHICAL_VIEW_TYPE = {
  NO_FILTER: "NO_FILTER",
  FILTER_BY_CATEGORY: "FILTER_BY_CATEGORY",
};

export const WEEK_DAYS = {
  1:"Sunday",
  2:"Monday",
  3:"Tuesday",
  4:"wednesday",
  5:"Thrusday",
  6:"Friday",
  7:"Saturday"
};

export const YEAR_MONTHS = {
  1:"January",
  2:"February",
  3:"March",
  4:"April",
  5:"May",
  6:"June",
  7:"July",
  8:"August",
  9:"September",
  10:"October",
  11:"November",
  12:"December",
};

export const GRAPHICAL_VIEW_DURATION = {
  MONTHLY_DATA: "MONTHLY_DATA",
  MONTH_DAYS_DATA: "MONTH_DAYS_DATA",
  WEEK_DAYS_DATA: "WEEK_DAYS_DATA",
};

export const LIST_VIEW_TIME = {
  DATE: "DATE",
  ALL: "ALL",
};
export const USER_ROLES = {
  admin: 0,
  hr: 1,
  manager: 2,
  tl: 3,
  employee: 4,
  intern: 5,
};
export const USER_ROLES_NUMBER = {
  0: "admin",
  1: "hr",
  2: "manager",
  3: "tl",
  4: "employee",
  5: "intern",
};
export const USER_ROLES_NAME = {
  admin: 'admin',
  hr: 'hr',
  manager: 'manager',
  tl: 'tl',
  employee: 'employee',
  intern: 'intern',
}
export const REIMBURSEMENT_STATUS = {
  pending: 'pending',
  rejected: 'rejected',
  approved: 'approved',
}

export const REIMBURSEMENT_TYPE = {
  fuel: 'fuel',
  food: 'food',
  other: 'other',
  travel: 'travel',
}

export const FOOD_TYPES = {
  SNACKS: 'SNACKS',
  LUNCH: 'LUNCH',
  DINNER: 'DINNER',
}
export const REIMBURSEMENT_TRAVEL_TYPE = {
  OLA_UBER: 'Ola-Uber',
  BUS: 'bus',
  TRAIN: 'train',
  AUTO: 'auto',
  AIR: 'air',
}
export const REIMBURSEMENT_FUEL_TYPE = [
  {
    label: '2 wheeler',
    kmPrice: 4,
  },
  {
    label: '4 wheeler',
    kmPrice: 8,
  },
]
export const FUEL_PRICE_PER_KM = 4

// export const LEAVE_TYPES = {
//   CL: 'Casual Leave',
//   SL: 'Sick Leave',
//   PL: 'Paid Leave',
//   COFF: 'Compensatory  Leave',
// }

const LEAVE_STATUS = {
  PENDING: 0,
  APPROVED: 1,
  REJECTED: -1
}
export const HALF_TYPE_OBJ = {
  FIRST_HALF: 1,
  SECOND_HALF: 2,
  FULL_DAY: 3,

}
export const HALF_TYPE = [
  {
    value: 3,
    label: 'Full day',
    deduct: 0,
    add: 1,
  },
  {
    value: 1,
    label: '1st Half',
    deduct: 0.5,
    add: 0.5,
  },
  {
    value: 2,
    label: '2nd Half',
    deduct: 0.5,
    add: 0.5,
  },
]

export const LEAVE_RESPONSE = {
  accepted: 'Accepted',
  rejected: 'Rejected',
  pending: 'Under-Review',
}
export const CALENDAR_ITEM_TYPES = {
  coff: 'COFF',
  leave: 'LEAVE',
  task: 'TASK',
  holiday: 'HOLIDAY',
  checkInLog: 'checkInLog',
  checkOUTLog: 'checkOutLog',
}

export const LEAVE_COLORS = {
  COFF_RAISE_APPROVED: 'green',
  HOLIDAY: 'rgba(122, 54, 139, 1)',
  CL_APPROVED: 'rgba(215, 131, 41, 1)',
  SL_APPROVED: 'rgba(54, 139, 139, 1)',
  PL_APPROVED: 'rgba(94, 130, 51, 1)',

  COFF_RAISE_REJECTED: 'red',

  CL_REJECTED: 'red',
  SL_REJECTED: 'red',
  PL_REJECTED: 'red',

  'COFF_RAISE_PENDING': 'gray',

  'CL_PENDING': 'gray',
  'SL_PENDING': 'gray',
  'PL_PENDING': 'gray',
}

export const WEEKLY_OFF = [{ label: "Sun", value: 0 }, { label: "Mon", value: 1 }, { label: "Tue", value: 2 }, { label: "Wed", value: 3 }, { label: "Thu", value: 4 }, { label: "Fri", value: 5 }, { label: "Sat", value: 6 }]
export const NOTIFICATION_TYPE = {
  general: 'general',
  leave: 'leave',
  reimbursement: 'reimbursement',
  coff: 'coff',
  task: 'task'
}

export const actions = {
  SIGN_IN: 'SIGN_IN',
  SET_USER: 'SET_USER',
  SIGN_OUT: 'SIGN_OUT',
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',

  SET_LIFE_STOCK_DATA: 'SET_LIFE_STOCK_DATA',
  START_LIFE_STOCK_LOADING: 'START_LIFE_STOCK_LOADING',

  SET_LEAVE_BALANCE_COUNT_DATA: 'SET_LEAVE_BALANCE_COUNT_DATA',
  START_LEAVE_BALANCE_COUNT_LOADING: 'START_LEAVE_BALANCE_COUNT_LOADING',

  SET_HOLIDAY_COUNT_DATA: 'SET_HOLIDAY_COUNT_DATA',
  START_HOLIDAY_COUNT_LOADING: 'START_HOLIDAY_COUNT_LOADING',

  SET_LEAVE_TYPE_COUNT_DATA: 'SET_LEAVE_TYPE_COUNT_DATA',
  START_LEAVE_TYPE_COUNT_LOADING: 'START_LEAVE_TYPE_COUNT_LOADING',

  SET_NOTIFICATION_DATA: 'SET_NOTIFICATION_DATA',
  NOTIFICATION_READ: 'NOTIFICATION_READ',

  SET_DEVICES_LIST: 'SET_DEVICES_LIST',
  UPDATE_DEVICES_LIST: 'UPDATE_DEVICES_LIST',
  CALL_SNACKBAR_DATA: "CALL_SNACKBAR_DATA"
}
export const USER_UPDATE_TYPE = {
  personalDetails: 'presonalDetails',
  companyDetails: 'companyDetails',
  bankDetails: 'bankDetails',
  salaryDetails: 'salaryDetails',
  taxesDetails: 'taxesDetails',
  documents: 'documents',
}

export const SNACK_BAR_VARIETNS = {
  error: "error",
  suceess: "suceess",
  warning: "warning"
}