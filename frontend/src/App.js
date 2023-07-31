
import { createBrowserRouter, Navigate, Route, RouterProvider, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux'

import { accessToken, loggedInUser } from './utils/helper';
import { useDispatch } from 'react-redux'
import { fetchUserDetails } from './store/actions/userReducerAction';
import { memo, useEffect, useMemo, useState } from 'react';
import OneViewBox from './components/layouts/OneViewBox';
import { center } from './assets/css/theme/common';
import { CircularProgress } from '@mui/material';
import routes from './routes';
import '../src/assets/fonts/azonix-cufonfonts-webfont/style.css'
import { useSnackbar } from 'notistack';

function App() {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(true)
  const { user, snackBar } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (accessToken.get()) {
      dispatch(fetchUserDetails(undefined, (res) => { setLoading(false) }, (err) => { setLoading(false) }))
    } else {
      setLoading(false)
    }
  }, [])


  const router = createBrowserRouter(routes(user));
  useEffect(() => {
    if (snackBar.message) {      
      enqueueSnackbar(snackBar.message, { variant: snackBar.variant })
    }
  }, [snackBar.message])

  if (loading) {
    return <OneViewBox sx={{ ...center }}><CircularProgress size={50} /> </OneViewBox>
  }
  return (
    <RouterProvider
      router={router}
      fallbackElement={<OneViewBox sx={{ ...center }}><CircularProgress size={50} /> </OneViewBox>}
    />
  );
}

export default memo(App);
