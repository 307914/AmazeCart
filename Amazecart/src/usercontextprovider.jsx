import { createContext, useState } from "react";

export const UserContext = createContext({
  userdata: null,
  message: null,
  success: null,
  isLoading: null,
  signupresponse: null,

  setUserData: null,
  setSignUpResponse: null,
  setMessage: null,
  setSuccess: null,
  setIsLoading: null,
})

const UserContextProvider = ({ children }) => {
  const [userdata, setUserData] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [message, setMessage] = useState(null);
  const [signupresponse, setSignUpResponse] = useState(null);


  return <UserContext.Provider value={{ signupresponse, setSignUpResponse, userdata, setUserData, isLoading, setIsLoading, setMessage, message, success, setSuccess }}>{children}</UserContext.Provider>
}
export default UserContextProvider;

