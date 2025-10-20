import React from 'react'
import { Badge, Button, Card, CardBody, CardHeader, CardImg, Col, Container, FormCheck, Image, ProgressBar, Row } from 'react-bootstrap'
import './style.scss'
import { Plus, Trash } from 'react-bootstrap-icons'
import UseApi from '../useAPi'
import { END_POINTS, REQUEST_TYPE } from '../axiosinstance'
import { useEffect } from 'react'
import { Link } from 'react-router'
import Order from '../../Checkout'

const Cart = () => {
    const { makeRequest: makeCartReq, response } = UseApi(END_POINTS.CART.GETCARTITEMS);
    const { makeRequest: makeRequestClear } = UseApi(END_POINTS.CART.CLEAR_CART);
    const { makeRequest: makeReqeustOrder, response: OrderResponse } = UseApi(END_POINTS.STRIPE.CREATE, REQUEST_TYPE.POST);

    const totalPrice = response?.data?.totalPrice || 0;
    const totalQuantity = response?.data?.totalQuantity || 0;

    useEffect(() => {
        makeCartReq(null, false);
    }, [])


    const handleClearCart = () => {
        makeRequestClear();
    }
    const handleOrder = () => {
        makeReqeustOrder(null, false);
    }
    useEffect(() => {
        if (OrderResponse) {
            const { session: { url } } = OrderResponse;
            if (url) {
                window.location.href = url;
            }
        }
    }, [OrderResponse])

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={9}>
                        <Card className='cart-items'>
                            <CardBody>
                                <h2>Shoping Cart</h2>
                                <hr />
                                {
                                    response?.data.items?.map(({
                                        id,
                                        title,
                                        price,
                                        description,
                                        category,
                                        image,
                                        quantity,
                                        discount = 10
                                    }) => {
                                        const discountPrice = parseInt(price * (1 - discount / 100));
                                        return <>
                                            <Row >
                                                <Col md={3}>
                                                    <Image src={image} className='cart-image' />
                                                </Col>
                                                <Col md={6}>
                                                    <h5>{title}</h5>
                                                    <Badge pill>{category}</Badge>
                                                    <section className='info mt-1'>
                                                        <section className='text-success'>In stock</section>
                                                        <section className='text-muted mb-2'>Eligible for Free shipping</section>
                                                    </section>
                                                    <FormCheck label='This will be a gift' />
                                                    <section className='cart-qty rounded-border mt-3 me-3'>
                                                        <span><Trash size={17} /></span>
                                                        <span>{quantity}</span>
                                                        <span><Plus size={25} /></span>
                                                    </section>
                                                    <span className='btn-border'>
                                                        <Link size='sm'>Delete</Link>
                                                    </span>

                                                    <span className='btn-border'>
                                                        <Link size='sm'>Save fro Later</Link>
                                                    </span>

                                                </Col>
                                                <Col md={3} className='text-end'>
                                                    <Badge pill className='bg-danger'>{discount}% off</Badge>
                                                    <h5>₹{(discountPrice).toLocaleString('en-IN')}</h5>
                                                    <span className='me-1'>M.R.P.:</span>
                                                    <span style={{ textDecoration: "line-through" }}>₹{price.toLocaleString('en-IN')}</span>
                                                </Col>
                                            </Row>
                                            <hr />
                                        </>
                                    })}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className='mt-5'>
                            <CardBody>
                                <section className='d-flex align-items-center'>
                                    <ProgressBar className='w-100 me-3' variant='success' now={totalPrice} max={499}></ProgressBar>
                                    <span>499</span>
                                </section>
                                {totalPrice > 500 ? <span className='text-success'>Your order is eligible for FREE Delivery.</span> : null}
                                <h5>Subtotal({totalQuantity}):₹{totalPrice?.toLocaleString("en-IN")}</h5>
                                <FormCheck className='mt-3' label="This order contains a gift"></FormCheck>
                                <section style={{ display: "flex", flexDirection: "column" }}>

                                    <Button variant="warning" className='rounded-border my-2' onClick={handleOrder}>place the order</Button>
                                    <Button variant="danger" className='rounded-border w-100' onClick={handleClearCart}>clear cart</Button>
                                </section>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Cart
