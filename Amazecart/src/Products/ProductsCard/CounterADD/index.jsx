import React from 'react'
import { Badge } from 'react-bootstrap'
import { BagDash, BagPlus, Trash } from 'react-bootstrap-icons'

const Counter = ({ disabled, quantity, onIncrement, onDecrement, onRemoveFromCart }) => {
  return (
    <section className='d-flex action-btn align-items-center' style={{ gap: "5px", filter: disabled ? 'grayScale(1)' : 'none' }}>
      <BagDash disabled={disabled} onClick={onDecrement} className='text-danger' size={20}></BagDash>
      <Badge pill>{quantity}</Badge>
      <BagPlus disabled={disabled} className=' text-success' onClick={onIncrement} size={20}></BagPlus>

      <Trash onClick={onRemoveFromCart} className='ms-auto text-danger' size={20} />
    </section>
  )
}
export default Counter
