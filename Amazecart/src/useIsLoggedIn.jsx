import React, { useContext } from 'react'
import { UserContext } from './usercontextprovider'

const UseIsLoggedIn = () => {
  const data = useContext(UserContext);

  const isLoggedIn = !!data?.userdata;
  return { isLoggedIn, ...data };
}

export default UseIsLoggedIn
