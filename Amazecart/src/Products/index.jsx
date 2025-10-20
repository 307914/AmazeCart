import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import ProductsCard from './ProductsCard';
import { Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router';
import { UserContext } from '../usercontextprovider';



const Products = ({ products }) => {


  return (
    <>
      <Container fluid>
        <Row>
          {products?.map((product) => <ProductsCard key={product.id} {...product} />)}
        </Row>
      </Container>

    </>
  )

}


export default Products
