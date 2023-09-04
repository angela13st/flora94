import React from "react";
import { Form, Button } from "react-bootstrap";

const AdminProductCreate = ({ submitHandler, name, setName, price, setPrice, image, setImage, brand, setBrand, category, setCategory, description, setDescription, countInStock, setCountInStock }) => {
  return (
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
        <Form.Label>Količina na zalihi</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter count in stock"
          value={countInStock}
          onChange={(e) => setCountInStock(e.target.value)}
        />
      </Form.Group>

      <Button type="submit" variant="primary">
        Dodaj proizvod
      </Button>
    </Form>
  );
};

export default AdminProductCreate;
