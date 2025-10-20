import { combineReducers } from "redux";
import countreducer from "./countreducer";
import { userreducer } from "./userreducer";

// const rootreducer=combineReducers(
//     {
//     countreducer,
//     userreducer,
//     }
// )

// export default rootreducer;


const rootreducer=combineReducers(
    {
    countreducer,
    userreducer
    }
)

export default rootreducer;