import React, { useContext, useEffect } from 'react'

import { toast, ToastContainer } from 'react-toastify'
import { UserContext } from './usercontextprovider';

const MyToast = () => {
  const { message, success } = useContext(UserContext);

  useEffect(() => {
    if (success) {
      toast.success(message);
    }
    else {
      toast.error(message);
    }
  }, [message, success]);
  return (
    <ToastContainer />
  )
}

export default MyToast