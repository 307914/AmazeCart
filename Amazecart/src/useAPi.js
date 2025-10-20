import React, { useContext, useState } from 'react';
import { UserContext } from './usercontextprovider';
import { ApiContext } from './ApiContextProvider';
import axios from 'axios';
import { AxiosInstance, REQUEST_TYPE } from './axiosinstance';
import Loader from './loader/loader.jsx';

const UseApi = (url, type = REQUEST_TYPE.GET) => {
  const {
    setUserData,
    message,
    setIsLoading,
    setMessage,
    isLoading,
    success,
    setSignUpResponse,
    setSuccess,
  } = useContext(UserContext);
  const [response, setResponse] = useState(null);

  const makeRequest = async (payload, updatedUser = true) => {
    try {
      setIsLoading(true);
      setMessage(null);
      setResponse(null);
      const apidata = (await AxiosInstance[type](url, payload)).data;
      const { message, data = null, success } = apidata;
      console.log('the data is', data);
      setSuccess(success);
      setMessage(message);
      if (updatedUser) {
        setUserData(data);
      } else {
        setSignUpResponse(data);
      }
      setResponse(apidata);
    } catch (error) {
      setSuccess(false);
      setResponse(error?.response?.data);
      if (error.response?.data?.message) {
        setMessage(error.response?.data?.message);
      } else {
        setMessage(error.message);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  return { makeRequest, response };
};

export default UseApi;
