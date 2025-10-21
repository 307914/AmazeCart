import React, { useReducer, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardImg, Col, Form, FormControl, FormGroup, FormLabel, InputGroup } from "react-bootstrap";
import { useLocation } from "react-router";
import '../../ProductsCard/styles.scss';
import { PencilSquare } from "react-bootstrap-icons";

const EditIcon = ({ onClick }) => <PencilSquare onClick={onClick} size={20} className="ms-3" />

const FIELD_NAMES = {
  TITLE: "title",
  PRICE: "price",
  DESCRIPTION: "description"
}

const reducers = (state, action) => {
  const { type, name, value, product } = action;
  switch (type) {
    case "UPDATE":
      return { ...state, [name]: value };
    case "RESET":
      return product;
    default:
      return state;
  }
}

const EditProduct = () => {
  const [editField, setEditField] = useState(null);
  const { state: { product } } = useLocation();
  const [discount, setDiscount] = useState(false);
  const [state, dispatch] = useReducer(reducers, product);
  const {
    id, title, price, description, category, image, rating } = state;

  const HandleChange = (e) => {
    const { value, name } = e.target;
    dispatch({ type: 'UPDATE', value, name });
  }
  return (
    <Col sm={{ span: 8, offset: 1 }} md={{ span: 7, offset: 2 }} lg={{ span: 7, offset: 2 }} xl={{ span: 4, offset: 4 }}>
      <Card className=' product m-4'>
        <CardImg src={image} className="image"></CardImg>
        <CardBody>
          <FormGroup>
            <FormLabel className="fw-bold">Product Title</FormLabel>
            {
              editField === FIELD_NAMES.TITLE ?
                <FormControl value={title} name={FIELD_NAMES.TITLE} onChange={HandleChange} /> :
                <section className="d-flex align-items-between">
                  <FormLabel>{title}</FormLabel>
                  <EditIcon onClick={() => setEditField(FIELD_NAMES.TITLE)} />
                </section>
            }
          </FormGroup>
          <FormGroup>
            <FormLabel className="fw-bold">Product Price</FormLabel>
            {editField === FIELD_NAMES.PRICE ?
              <>
                <FormGroup>
                  <FormLabel>Price</FormLabel>
                  <InputGroup>
                    <InputGroup.Text>$</InputGroup.Text>
                    <FormControl value={price} name={FIELD_NAMES.PRICE} onChange={HandleChange}></FormControl>
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <FormLabel>Discount</FormLabel>
                  <InputGroup className="my-2">
                    <InputGroup.Text>%</InputGroup.Text>
                    <FormControl type="number" value={discount} onChange={(e) => setDiscount(e.target.value)}></FormControl>
                  </InputGroup>
                </FormGroup>
              </>
              :
              <section className="d-flex align-items-center">
                {discount ?
                  <>
                    <span className="text-muted me-2" style={{ textDecoration: "line-through" }}>{price}</span>
                    <span className="fw-bold text-danger me-2">-{discount}%</span>
                    <span className=" fw-bold text-success me-2"> ${(price * (1 - discount / 100)).toFixed(2)}</span>
                  </>
                  : <FormLabel>{price}</FormLabel>
                }
                <EditIcon onClick={() => setEditField(FIELD_NAMES.PRICE)} />
              </section>
            }
          </FormGroup>
          <FormGroup>
            <FormLabel className="fw-bold">Product description</FormLabel>
            {
              editField === FIELD_NAMES.DESCRIPTION ?
                <FormControl as="textarea" row={5} value={description} name={FIELD_NAMES.DESCRIPTION} onChange={HandleChange}></FormControl> :
                <section>
                  <FormLabel className="mx-2">{description}</FormLabel>
                  <EditIcon onClick={() => setEditField(FIELD_NAMES.DESCRIPTION)} />
                </ section>
            }
          </FormGroup>
        </CardBody>
        <CardFooter className="d-flex justify-content-between ">
          <Button onClick={() => { setEditField(null); setDiscount(0); dispatch({ type: 'RESET', product }) }} variant='outline-danger'>Reset</Button>
          <Button onClick={() => { setEditField(null) }} variant='outline-primary'>Preview</Button>
          <Button variant='outline-success'> Submit</Button>
        </CardFooter>
      </Card>
    </Col>
  )
}

export default EditProduct
