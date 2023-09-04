import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserById, updateUser } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const EditUserScreen = ({ history }) => {
  const { userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);

  const dispatch = useDispatch();

  const userGetById = useSelector((state) => state.userGetById);
  const { loading, error, user } = userGetById;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate || {};

  useEffect(() => {
    if (successUpdate) {
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserById(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
        setIsEmployee(user.isEmployee);
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(userId, { name, email, isAdmin, isEmployee }));
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Natrag
      </Link>
      <FormContainer>
        <h1>Uredi korisnika</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Ime</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesi ime"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Unesi email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Administrator"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Form.Group>

            <Form.Group controlId="isEmployee">
              <Form.Check
                type="checkbox"
                label="Zaposlenik"
                checked={isEmployee}
                onChange={(e) => setIsEmployee(e.target.checked)}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Spremi
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default EditUserScreen;
