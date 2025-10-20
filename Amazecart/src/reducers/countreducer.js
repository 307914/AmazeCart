//   const intialstate={
//     count:0,
// }


// const COUNTER_ACTIONS={
//     INCREMENT:'INCREMENT', 
//     DECREMENT:'DECREMENT'
// }

//  export const incrementActionCreator=(payload)=>{
//     return {type:COUNTER_ACTIONS.INCREMENT,payload}
// }

//   export const asyncincrementActionCreator=(payload)=>{
//   return async (dispatch)=>{
//     const netwrokreq= new Promise((res)=>{
//     setTimeout(()=>{
//        res(payload);
//     },5000)
//    });
//    const data=await netwrokreq;

//     dispatch(incrementActionCreator(data));
//   }
// }

//  export const decrementActionCreator=(payload)=>{
//     return {type:COUNTER_ACTIONS.DECREMENT,payload}
// }


// export const countreducer=(state=intialstate,action)=>{
//     const {type,payload}=action;
//     switch(type){
//         case COUNTER_ACTIONS.INCREMENT:
//             return {...state,count:state.count+payload}

//              case COUNTER_ACTIONS.DECREMENT:
//             return {...state,count:state.count-payload}

//             default:
//                 return state;
//     }
// }

// export default countreducer;



const intialState={
  count:0,
}

const COUNTER_ACTIONS={
  INCREMENT:'Increment',
  DECREMENT:'Decrement'
}


export const incrementactioncreator=(payload)=>{
  return {type:COUNTER_ACTIONS.INCREMENT,payload}
}

export const asyncincrementactioncreator=(payload)=>{
  return async(dispatch)=>{
   const networkrequest= new Promise((resolve, reject) => {
     setTimeout(()=>{
     resolve(payload);
    },5000)
   });
   const data=await networkrequest;
   dispatch(incrementactioncreator(data));
   }
  }


export const decrementactioncreator=(payload)=>{
  return {type:COUNTER_ACTIONS.DECREMENT,payload}
}

 const countreducer=(state=intialState,action)=>{
  const {type,payload}=action;

  switch(type){
    case COUNTER_ACTIONS.INCREMENT:
      return {...state,count:state.count+payload};

      case COUNTER_ACTIONS.DECREMENT:
        return {...state,count:state.count-payload}

        default:
          return state;
  }

}

export default countreducer