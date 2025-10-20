import React, { useContext } from 'react'
import { Spinner } from 'react-bootstrap'
import { UserContext } from '../usercontextprovider'
import './style.scss'
const Loader = ({ isLoadingProp }) => {
  const { isLoading } = useContext(UserContext);

  return (
    isLoading || isLoadingProp ?
      <Spinner className='loading' animation="border" role="status" /> : null
  )
}
export default Loader
