import React, { useContext, useEffect, useReducer, useState } from 'react'
import SignupReducer, { intialState } from '../Signup/signupreducer';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import UseApi from '../useAPi';
import { END_POINTS, REQUEST_TYPE } from '../axiosinstance';
import { useLocation, useNavigate } from 'react-router';
import UseIsLoggedIn from '../useIsLoggedIn';
import { UserContext } from '../usercontextprovider';

const Login = () => {
    const { makeRequest: makeRequestReset, response: resetResponse } = UseApi(END_POINTS.USER.RESETPASSWORD, REQUEST_TYPE.PATCH);
    const { makeRequest: makeLoginreq, response: loginResponse } = UseApi(END_POINTS.USER.LOGIN, REQUEST_TYPE.POST);
    const [state, dispatch] = useReducer(SignupReducer, intialState)
    const { username, password } = state;
    const [otp, setOtp] = useState(null);
    const [showresetform, setShowResetForm] = useState(false);
    const { state: authUrl } = useLocation();

    const navigate = useNavigate();

    const [pass, setPass] = useState(false);
    const { userdata } = useContext(UserContext);

    const contentreducer = (e) => {
        dispatch({ type: e.target.name, payload: e.target.value })
    }

    useEffect(() => {
        if (authUrl && loginResponse?.success && loginResponse?.data?.username) {
            console.log("authurl is", authUrl);
            navigate(authUrl, { replace: true })
        }
        else if (!authUrl && loginResponse?.success) {
            navigate('/');
        }
    }, [loginResponse])



    const isFormValid = username.isValid && password.value?.length;

    const otpValue = (e) => {
        const { value } = e.target;
        if (value.length > 6) {
            e.preventDefault();
        }
        else {
            setOtp(value);
        }
    }

    const onReset = async () => {
        const payload = { username: username.value, password: password.value, otp };
        await makeRequestReset(payload);
        setOtp('');
    }


    const onLogin = async () => {
        const payload = { username: username.value, password: password.value };
        await makeLoginreq(payload);
    }
    return (
        <Container fluid>
            <Row>
                <Col className='mt-5 mt-md-3 ' md={{ span: 8, offset: 2 }} sm={{ span: 10, offset: 1 }} lg={{ span: 4, offset: 4 }}>
                    <Card className='signup'>
                        <CardHeader>Login</CardHeader>
                        <CardBody>
                            <Form>
                                <FormGroup controlId='name' className='mb-1'>
                                    <FormLabel>
                                        Username
                                    </FormLabel>
                                    <FormControl name='username' placeholder='enter username ' onChange={contentreducer} autoComplete='username'></FormControl>
                                </FormGroup>
                                {username?.value === "" && <span className='text-danger'>username is required</span>}

                                <FormGroup controlId='password' className='mt-3 mb-1' style={{ position: "relative" }}>
                                    <FormLabel>
                                        Password
                                    </FormLabel>
                                    <FormControl type={pass ? "text" : "password"} name='password' placeholder='enter password ' onChange={contentreducer} style={{ position: 'relative' }} autoComplete='current-password' />
                                    <span onClick={() => setPass(!pass)} style={{ position: 'absolute', right: "10px", top: "35px", fontSize: "18px" }}> {pass ? <Eye /> : <EyeSlash />}</span>
                                </FormGroup>
                                {password?.value === "" && <span className='text-danger'>password is required</span>}

                                {showresetform ? <FormGroup>
                                    <FormLabel>
                                        otp
                                    </FormLabel>
                                    <FormControl type="number" name="otp" onChange={otpValue} value={otp}>
                                    </FormControl>
                                </FormGroup> : null}
                            </Form>
                        </CardBody>
                        <CardFooter>
                            <section className='d-flex justify-content-between'>
                                {!showresetform ?
                                    <>
                                        <Button variant="outline-primary" disabled={!isFormValid} onClick={onLogin}>Login</Button>
                                        <Button variant="link" onClick={() => { setShowResetForm(true) }}>forgetpassword</Button> </>
                                    :
                                    <>
                                        <Button variant='outline-danger' onClick={onReset} disabled={!otp || !isFormValid}>Reset Password</Button>
                                        <Button variant='outline-primary' onClick={() => { setShowResetForm(false) }}>login</Button>
                                    </>
                                }
                            </section>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
