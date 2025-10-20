import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Outlet } from 'react-router'
import Counter from './counter/counter'
import NavScrollExample from './MyNavbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from './loader/loader.jsx'
import useIsLoggedIn from './useIsLoggedIn.jsx'
import { END_POINTS, REQUEST_TYPE } from './axiosinstance.js'
import UseApi from './useAPi.js'
import MyToast from './MyToast.jsx'



function App() {
   const {makeRequest}=UseApi(END_POINTS.USER.LOGINVIACOOKIE);
     useEffect(()=>{
          makeRequest();
     },[])
  return (
    <>
<NavScrollExample />
<Loader/>
<MyToast />
  
      <Outlet />

    </>
  )
}

export default App
