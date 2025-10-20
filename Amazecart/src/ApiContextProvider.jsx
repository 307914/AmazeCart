import { createContext, useState } from "react";


export  const ApiContext=createContext({
    message:null,
    setMessage:null,
    sucess:null,
    setSucess:null,
    IsLoading:null,
    setIsLoading:null,
});


const ApiContextProvider=({children})=>{

    const [message,setMessage]=useState(null);
    const [isLoading,setIsLoading]=useState(null);
    const [sucess,setSucess]=useState(null);

 return <ApiContext.Provider value={{message,setIsLoading,setMessage,setSucess,sucess,isLoading}}>{children}</ApiContext.Provider>
}

export default ApiContextProvider;