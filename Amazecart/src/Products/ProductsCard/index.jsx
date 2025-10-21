import react, { useContext, useState } from 'react'
import './styles.scss'
import { Button, Card, CardImg, CardFooter, CardBody, CardTitle, Col, Badge, CardHeader } from 'react-bootstrap'
import { BagPlusFill, PencilSquare } from 'react-bootstrap-icons';
import { Rating } from 'react-simple-star-rating'

import 'bootstrap/dist/css/bootstrap.min.css';
import { END_POINTS, REQUEST_TYPE } from '../../axiosinstance';
import UseApi from '../../useAPi';
import Counter from './CounterADD';
import { UserContext } from '../../usercontextprovider';
import UseIsLoggedIn from '../../useIsLoggedIn';
import { useLocation, useNavigate } from 'react-router';


const EditIcon = ({ onClick }) => <PencilSquare className='m-2' onClick={onClick} size={20} />


const ProductsCard = (product) => {
  const { isLoading } = useContext(UserContext);
  const { userdata } = useContext(UserContext);
  const { pathname } = useLocation();

  const { makeRequest: makeRequestAdd } = UseApi(END_POINTS.CART.ADD, REQUEST_TYPE.POST);
  const { makeRequest: makeRequestInc } = UseApi(END_POINTS.CART.INCREMENT, REQUEST_TYPE.PATCH);
  const { makeRequest: makeRequestDec } = UseApi(END_POINTS.CART.DECREMENT, REQUEST_TYPE.PATCH);
  const { makeRequest: makeRequestRemove } = UseApi(END_POINTS.CART.REMOVE, REQUEST_TYPE.POST);

  const navigate = useNavigate();
  const cart = userdata?.cart?.items;


  const {
    id, title, price, description, category, image, rating } = product;

  const ProductInfo = cart?.find(p => p.id === id);

  const onAddToCart = () => {
    if (!userdata) {
      return navigate('/login', {
        state: pathname,
        replace: true
      });
    }
    makeRequestAdd(product);
  }
  const onIncrement = () => {
    if (isLoading) return;
    makeRequestInc(product);
  }

  const onDecrement = () => {
    if (isLoading) return;
    makeRequestDec(product);
  }

  const onRemoveFromCart = () => {
    if (isLoading) return;
    makeRequestRemove(product);
  }

  return (
    <>
      <Col xl={{ span: 3 }} lg={{ span: 4 }} md={{ span: 5, offset: 0 }} sm={{ span: 10, offset: 1 }} className='mt-2'>
        <Card className='mb-3 product'>
          <CardHeader className='title'>{title}</CardHeader>
          <section style={{ display: "flex", justifyContent: "flex-end" }}>
            <EditIcon onClick={() => navigate(`/product/edit/${id}`, { state: { product } })} />
          </section>
          <CardImg src={image} variant='top' className='image p-2' />
          <CardBody>
            <section className='content'>
              <section className='price'>${price}</section>
              <section className='price description'>{description}</section>
            </section>
            <section className='d-flex align-items:center'>
              <Rating readonly initialValue={rating.rate} allowFraction size={20} />
              <Badge pill className='ms-2' style={{ display: "flex", alignItems: "center" }}>{rating.count}</Badge>
            </section>
          </CardBody>
          <CardFooter>

            {ProductInfo ? <Counter disabled={isLoading} quantity={ProductInfo.quantity} onIncrement={onIncrement} onDecrement={onDecrement} onRemoveFromCart={onRemoveFromCart} /> :
              <Button disabled={isLoading} variant="outline-primary" onClick={onAddToCart}>
                <section className='d-flex ' style={{ alignItems: "flex-end" }}>
                  <BagPlusFill size={25} className='me-2'></BagPlusFill>
                  Add To Cart
                </section>
              </Button>}
          </CardFooter>
        </Card>
      </Col>

    </>
  )
}

export default ProductsCard
