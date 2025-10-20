import React, { useReducer, useRef, useState, useStateterminal } from 'react'
import {Button} from 'react-bootstrap'
import {  asyncincrementactioncreator, decrementactioncreator,  incrementactioncreator } from '../reducers/countreducer';
import { useSelector,useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';


const Counter = () => {
  const dispatch=useDispatch();
  const {count}=useSelector(state=>state);
  const numref=useRef(null);

  const IncrementCount=()=>{
    const payload=+(numref.current?.value)||1;
    dispatch(asyncincrementactioncreator(payload));
  }

  const DecrementCount=()=>{
    const payload=+(numref.current?.value)||1;
    dispatch(decrementactioncreator(payload));
  }

  return (
    <div>
     <section>Count {count}</section>
      <Button variant='primary' onClick={DecrementCount}>-</Button>
      <input ref={numref} placeholder='enter number'></input>
      <Button vairant='primary' onClick={IncrementCount}>+</Button>
    </div>
  )
}

export default Counter

