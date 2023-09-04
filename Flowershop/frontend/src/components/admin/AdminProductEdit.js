import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import Message from "./Message";
import Loader from "./Loader";
import FormContainer from "./FormContainer";
import {
  getProductDetails,
  updateProduct,
} from "../actions/adminProductActions";
import { ADMIN_PRODUCT_UPDATE_RESET } from "../constants/adminProductConstants";

const AdminProductEdit = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [countInStock, setCountInStock] = useState(0);


  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const adminProductUpdate = useSelector((state) => state.adminProductUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = adminProductUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ADMIN_PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product || product._id !== productId) {
        dispatch(getProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setDescription(product.description);
        setRating(product.rating);
        setNumReviews(product.numReviews);
        setCountInStock(product.countInStock);

      }
    }
  }, [dispatch, productId, product, successUpdate, history]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(updateProduct(productId, { name, price, image, brand, category, description, countInStock }));
    
  };
  

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
       Povratak
      </Link>
      <FormContainer>
        <h1>Uredi proizvod</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Naziv</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
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

            {/* Add Form.Group elements for other fields */}
            
            <Button type="submit" variant="primary">
              Ažuriraj
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default AdminProductEdit;
