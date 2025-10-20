  const intialstate={
  username:null,
  isLoggedIn:false,
}



export const userreducer=(state=intialstate,action)=>{
   const {type,payload}=action;
   switch(type){
    case 'username':
        return {...state,username:payload};

        case 'login':
        return {...state,isLoggedIn:true};
   default :
   return state;
   }
}

export default userreducer;