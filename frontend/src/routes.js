import {
  BarChart,
  CalendarMonthOutlined,
  People,
  PriceChangeOutlined,
} from '@mui/icons-material'
import { Box, Paper } from '@mui/material'
import { Navigate, Outlet } from 'react-router-dom'
import AppContainer from './components/layouts/common/AppContainer'
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import ArticleIcon from '@mui/icons-material/Article'
import SettingsIcon from '@mui/icons-material/Settings'
import { DashboardIcon, TransactionsIcon, PortfolioIcon, ActiveDashboardIcon, ActiveTransactionsIcon } from './components/layouts/common/Logo'
import DashboardController from './Pages/Dashboard/DashboardController'
import TransactionController from './Pages/Transaction/TransactionController'
import LoginController from './Pages/LogIn/LoginController'
import SighUpController from './Pages/SighUp/SighUpController'

const defineRoutes = (user) => {
  return [
    {
      path: '',
      element: !user.isLoggedIn ? (
        <LoginController />
      ) : (
        <Navigate replace to="/dashboard" />
      ),
      hideInPannel: true,
    },
    {
      path: 'create-user',
      element: <SighUpController />,
      hideInPannel: true,
    },
    {
      activeIcon: <ActiveDashboardIcon />,
      icon: <DashboardIcon />,
      path: 'dashboard',
      element: user.isLoggedIn ? (
        <AppContainer />
      ) : (
        <Navigate replace to="/" />
      ),
      // hideInPannel: true,
      children: [
        {
          path: '',
          title: 'Dashboard',
          element: <DashboardController />
        }
      ]
    },
    {
      activeIcon: <ActiveTransactionsIcon />,
      icon: <TransactionsIcon />,
      path: 'transactions',
      element: user.isLoggedIn ? (
        <AppContainer />
      ) : (
        <Navigate replace to="/" />
      ),
      // hideInPannel: true,
      children: [
        {
          path: '',
          title: 'Transactions',
          element: <TransactionController />
        }
      ]
    },
    {
      path: '*',
      element: !user.isLoggedIn ? (
        <Navigate replace to={'/sign-in'} />
      ) : (
        <Navigate replace to="/" />
      ),
      hideInPannel: true,
    }
  ]
}
export default defineRoutes

/*

================================================================
Demo Object
================================================================
        {
            path: "sign-in",
            element: !user.isLoggedIn ? <SignInController /> : <Navigate replace to="/leaves" />,
            hideInPannel:true, //for showing it onSide pannel or not
            title: "Leave Management", // it will use as name in side navbar
            component:<></>


             children: [
                {
                    path: "",
                    title: "My Leaves",// it will use as name in side navbar
                    element: <MyLeaveController />,
                    hideInPannel:true,
                }
            ],
        },




================================================================
================================================================



*/
// {
//   path: 'profile',
//   element: user.isLoggedIn ? (
//     <AppContainer />
//   ) : (
//     <Navigate replace to="/sign-in" />
//   ),

//   children: [
//     {
//       path: '',
//       title: 'Profile',
//       element: <ProfileController />,
//     },
//   ],
//   hideInPannel: true,
// }