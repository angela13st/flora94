import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { createProduct } from "../actions/AdminProductActions";
import { ADMIN_PRODUCT_CREATE_RESET } from "../constants/adminProductConstants";

const AdminProductCreateScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [customBouquet, setCustomBouquet] = useState(false);

  const dispatch = useDispatch();

  const adminProductCreate = useSelector((state) => state.adminProductCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    createdProduct,
  } = adminProductCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
        customBouquet,
      })
    );
  };

  /*if (successCreate) {
    dispatch({ type: ADMIN_PRODUCT_CREATE_RESET });
    history.push("/admin/productlist");
  }*/

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Natrag
      </Link>
      <FormContainer>
        <h1>Dodaj proizvod</h1>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Naziv</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Cijena</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Slika</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Kategorija</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Opis</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="countInStock">
            <Form.Label>Stanje na zalihi</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter count in stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="customBouquet">
            <Form.Check
              type="checkbox"
              label="Složi buket"
              checked={customBouquet}
              onChange={(e) => setCustomBouquet(e.target.checked)}
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Dodaj
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default AdminProductCreateScreen;
