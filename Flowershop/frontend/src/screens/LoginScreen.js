import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { Link, redirect, useNavigate } from "react-router-dom";
import { login } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const LoginScreen = ({ location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;



  useEffect(() => {
    if(userInfo){
        navigate('/')
    }
  },[userInfo])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {
        error && <Message variant='danger'>{error}</Message>
      }
      {
        loading && <Loader/>
      }
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="email">
          <FormLabel>Email adresa</FormLabel>
          <FormControl
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Lozinka</FormLabel>
          <FormControl
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Novi kupac?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Registriraj se
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
