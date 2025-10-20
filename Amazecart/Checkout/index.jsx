import React from 'react'
import { END_POINTS } from '../src/axiosinstance'
import { useEffect } from 'react';
import { Badge, Card, CardBody, Col, Container, FormCheck, Image, Row } from 'react-bootstrap';
import { Plus, Trash } from 'react-bootstrap-icons';
import { Link } from 'react-router';
import UseApi from '../src/useAPi';

const Success = () => {
    const { makeRequest: checkoutRequest, response } = UseApi(END_POINTS.STRIPE.CHECKOUT_SESSION);

    const totalPrice = response?.data?.amount;
    useEffect(() => {
        checkoutRequest(null, false);
    }, [])
    console.log(response);
    return (
        <Container fluid>
            <Row>
                <Col md={9}>
                    <Card className='cart-items'>
                        <CardBody>
                            <h2>Orders</h2>
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
                                        <Row>
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
            </Row>
        </Container>
    )
}

export default Success
