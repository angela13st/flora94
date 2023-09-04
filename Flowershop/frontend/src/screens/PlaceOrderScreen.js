import React, { useEffect, useState } from "react";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { updateUserLoyaltyPoints } from "../actions/userActions";

const updateSoldCountForProduct = async (productId, qty) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/products/${productId}/increase-sold`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qty }),
      }
    );

    if (response.ok) {
      console.log(`Sold count updated for product ${productId}`);
    } else {
      console.error(`Failed to update sold count for product ${productId}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [useLoyaltyPoints, setUseLoyaltyPoints] = useState(false);
  const [note, setNote] = useState("");

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);

  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));

  let totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  if (useLoyaltyPoints && userInfo && userInfo.loyaltyPoints >= 100) {
    totalPrice = (parseFloat(totalPrice) - 10).toFixed(2);
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      if (useLoyaltyPoints && userInfo.loyaltyPoints >= 100) {
        updateUserLoyaltyPoints(-100);
      } else {
        updateUserLoyaltyPoints(10);
      }
      if (order && order._id) {
        navigate(`/orders/${order._id}`);
      }
    }
  }, [success, navigate, order, useLoyaltyPoints, userInfo]);

  const updateUserLoyaltyPoints = async (pointsToAdd) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/update-loyalty/${userInfo._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pointsToAdd }),
        }
      );

      if (response.ok) {
        // Handle success or Redux update if needed
      } else {
        // Handle the error (e.g., display an error message)
      }
    } catch (error) {
      // Handle any network errors
    }
  };

  console.log(cart.note)
  const placeOrderHandler = async () => {
    try {
      const orderData = {
        orderItems: cart.cartItems.map((item) => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item.product,
        })),
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        userId: userInfo._id,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice,
        napomena: cart.note, 
      };
      
      const createdOrder = await dispatch(createOrder(orderData));
  
      const updateSoldPromises = cart.cartItems.map(async (item) => {
        await updateSoldCountForProduct(item.product, item.qty);
      });
  
      await Promise.all(updateSoldPromises);
  
      if (createdOrder && createdOrder._id) {
        navigate(`/orders/${createdOrder._id}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            {userInfo && userInfo.loyaltyPoints >= 100 && (
              <ListGroupItem>
                <Form.Check
                  type="checkbox"
                  label="Iskoristi bodove (-10€)"
                  checked={useLoyaltyPoints}
                  onChange={() => setUseLoyaltyPoints(!useLoyaltyPoints)}
                />
              </ListGroupItem>
            )}

            <ListGroupItem>
              <h2>Dostava</h2>
              <p>
                <strong>Adresa:</strong>{" "}
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode} {cart.shippingAddress.country}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Plaćanje</h2>
              <p>
                <strong>Vrsta:</strong> {cart.paymentMethod}
              </p>
            </ListGroupItem>

            <ListGroupItem>
              <h2>Napomena</h2>
              <p>{cart.note}</p>
            </ListGroupItem>

            <ListGroupItem>
              <h2>Proizvodi</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Košarica je prazna</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x €{item.price} = €{item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>Sažetak narudžbe</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Proizvodi</Col>
                  <Col>€{cart.itemsPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Dostava</Col>
                  <Col>€{cart.shippingPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>PDV</Col>
                  <Col>€{cart.taxPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>UKUPNO</Col>
                  <Col>€{totalPrice}</Col>
                </Row>
              </ListGroupItem>

              {totalPrice > 20 && userInfo && userInfo.loyaltyPoints >= 100 && (
                <ListGroupItem>
                  <Form.Check
                    type="checkbox"
                    label="Iskoristite bodove (-10€)"
                    checked={useLoyaltyPoints}
                    onChange={() => setUseLoyaltyPoints(!useLoyaltyPoints)}
                  />
                </ListGroupItem>
              )}

              <ListGroupItem>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroupItem>

              <ListGroupItem>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Naruči
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
