import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ORDER_PAY_RESET } from "../constants/orderConstants";
import { Axios } from "../utils";

const OrderScreen = () => {
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [order, id, successPay, dispatch]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));

    if (userInfo) {
      const newLoyaltyPoints = userInfo.loyaltyPoints + 10;
      axios.put(`/api/users/${userInfo._id}`, { loyaltyPoints: newLoyaltyPoints });
    }
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Narudžba {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Dostava</h2>
              <p>
                <strong>Ime:</strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <Link to={`mailto:${order.user.email}`}>
                  {order.user.email}
                </Link>
              </p>
              <p>
                <strong>Adresa:</strong>{" "}
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode}{" "}
                {order.shippingAddress.country}
              </p>

              {order.isDelivered ? (
                <Message variant="success">
                  Dostavljeno dana {order.DeliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Nije dostavljeno</Message>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Vrsta plačanja</h2>
              <p>
                <strong>Vrsta:</strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Plačeno na {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Nije plačeno</Message>
              )}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Proizvodi</h2>
              {order.orderItems.length === 0 ? (
                <Message>Nema proizvoda</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
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
                  <Col>€{order.itemsPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Dostava</Col>
                  <Col>€{order.shippingPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>PDV</Col>
                  <Col>€{order.taxPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Ukupno</Col>
                  <Col>€{order.totalPrice}</Col>
                </Row>
              </ListGroupItem>
              {!order.isPaid && (
                <ListGroupItem>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      options={{
                        currency: "EUR",
                        clientId: "ARRyN3gdniItyzberuDf06e76s6ZAetnooOAQnf8YLqJ9nqinU3yuxIwg78ePuKi7fIB7EeRcv-ZOJvQ",
                      }}
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroupItem>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
