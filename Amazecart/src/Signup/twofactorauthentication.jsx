
import React, { useContext } from 'react'
import UseApi from '../useAPi'
import { Button, Card, CardFooter, CardHeader, CardImg, Col, Container, Row } from 'react-bootstrap';
import { UserContext } from '../usercontextprovider';
import { useLocation, useNavigate } from 'react-router';
import { END_POINTS, REQUEST_TYPE } from '../axiosinstance';
import { useEffect } from 'react';

const TwoFactorAuth = () => {
  const navigate = useNavigate();
  const { signupresponse } = useContext(UserContext);

  const qrcode = signupresponse?.qrcode;
  const handlesubmitbtn = () => {
    navigate('/login')
  }
  return (
    <Container fluid>
      <Row>
        <Col sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} lg={{ span: 5, offset: 4 }}>
          <Card className="m-5">
            <CardHeader className='fw-normal'>Two Factor Authentication</CardHeader>
            <section className=" scan-text px-2 d-flex justify-content-center ">Scan this  qrcode</section>
            <CardImg style={{ objectFit: "contain", height: "210px" }} src={qrcode}></CardImg>
            <p className=" para-text ps-2 justify-content-center d-flex  fw-normal text-success">After scanning click below</p>
            <CardFooter>
              <Button variant='outline-primary' onClick={handlesubmitbtn}>Click here</Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
export default TwoFactorAuth
