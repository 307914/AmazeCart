import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Container, CardHeader, Card, CardFooter, Button, CardBody, FormGroup, FormControl, FormLabel, FloatingLabel, Form } from 'react-bootstrap'
import './styles.scss'
import SignupReducer, { ACTION_TYPES, intialState } from './signupreducer'
import { useReducer } from 'react'
import { Eye, EyeSlash } from 'react-bootstrap-icons'
import { Link, useNavigate } from 'react-router'
import { UserContext } from '../usercontextprovider'
import UseApi from '../useAPi'
import { END_POINTS, REQUEST_TYPE } from '../axiosinstance'
const Signup = () => {

    const [state, dispatch] = useReducer(SignupReducer, intialState)
    const { name, username, email, password } = state;
    const [isPassword, setIsPassword] = useState(false);

    const [pass, setPass] = useState(false);
    const { userdata, message } = useContext(UserContext);
    const navigate = useNavigate();

    const { makeRequest } = UseApi(END_POINTS.USER.SIGNUP, REQUEST_TYPE.POST);
    useEffect(() => {
        setIsPassword(Object.values(password.validation).every(Boolean));
    }, [password?.value])

    const contentreducer = (e) => {
        dispatch({ type: e.target.name, payload: e.target.value })
    }

    const isFormValid = name.isValid && username.isValid && email.isValid && isPassword;

    const onSignup = async () => {
        const payload = { name: name.value, username: username.value, email: email.value, password: password.value };
        await makeRequest(payload, false);

        navigate('/scan');
    }

    return (
        <Container fluid>
            <Row>
                <Col className='mt-5 mt-md-3' md={{ span: 8, offset: 2 }} sm={{ span: 10, offset: 1 }} lg={{ span: 4, offset: 4 }}>
                    <Card className='signup'>
                        <CardHeader>Signup</CardHeader>
                        <CardBody>

                            <FormGroup controlId='name' className='mb-1'>
                                <FormLabel>
                                    Name
                                </FormLabel>
                                <FormControl name='name' placeholder='enter name ' onChange={contentreducer}></FormControl>
                            </FormGroup>
                            {name?.value && !name?.isValid && <span className="text-danger">name is invalid</span>}
                            {name?.value === "" && <span className='text-danger'>name is required</span>}


                            <FormGroup controlId='username' className='mt-3 mb-1'>
                                <FormLabel>
                                    Username
                                </FormLabel>
                                <FormControl name='username' placeholder='enter username' onChange={contentreducer}></FormControl>
                            </FormGroup>
                            {username?.value && !username?.isValid && <span className="text-danger">username is invalid</span>}
                            {username?.value === "" && <span className='text-danger'>username is required</span>}


                            <FormGroup controlId='email' className='mt-3 mb-1'>
                                <FormLabel>
                                    Email
                                </FormLabel>
                                <FormControl name='email' type="email" placeholder='enter email ' onChange={contentreducer}></FormControl>
                            </FormGroup>
                            {email?.value && !email?.isValid && <span className="text-danger">email is invalid</span>}
                            {email?.value === "" && <span className='text-danger'>email is required</span>}



                            <FormGroup controlId='password' className='mt-3 mb-1'>
                                <FormLabel>
                                    Password
                                </FormLabel>
                                <section style={{ position: "relative" }}>
                                    <FormControl type={pass ? "text" : "password"} name='password' placeholder='enter password ' onChange={contentreducer} style={{ position: 'relative' }} />
                                    <span onClick={() => setPass(!pass)} style={{ position: 'absolute', right: "10px", top: "5px", fontSize: "18px" }}> {pass ? <Eye /> : <EyeSlash />}</span>
                                </section>
                            </FormGroup>
                            {password?.value && !isPassword ? <ul>
                                <li className={password.validation.hasLowerCase ? 'text-success' : 'text-danger'}>At least one lowercase character</li>
                                <li className={password.validation.hasUpperCase ? 'text-success' : 'text-danger'}>At least one uppercase character</li>
                                <li className={password.validation.hasSpecialCharacter ? "text-success" : "text-danger"}>At least one special character</li>
                                <li className={password.validation.hasNumber ? "text-success" : "text-danger"}>At least one number</li>
                                <li className={password.validation.meetsMinChReq ? "text-success" : "text-danger"}>minimum 8 characters</li>
                            </ul> : null}

                        </CardBody>
                        <CardFooter>
                            <Button variant="outline-primary" disabled={!isFormValid} onClick={onSignup}>signup</Button>
                        </CardFooter>
                    </Card>
                    <section style={{
                        marginTop: "20px", display: "flex", justifyContent: "center", fontSize: "18px"
                    }}>
                        If you already have a account -- <Link style={{ textDecoration: "none" }} to='/login'>Login</Link>
                    </section>
                </Col>

            </Row>
        </Container>
    )
}

export default Signup
