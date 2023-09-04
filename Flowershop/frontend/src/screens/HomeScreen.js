import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
// import "./style.css";

const Banner = () => {
  const images = [
    {
      id: 1,
      url: "/images/slide/s00.gif",
    },
    {
      id: 2,
      url: "/images/slide/s1.gif",
    },
    {
      id: 3,
      url: "/images/slide/s2.png",
    },
    {
      id: 4,
      url: "/images/slide/s3.png",
    },
    {
      id: 5,
      url: "/images/slide/s4.png",
    },
    {
      id: 6,
      url: "https://media.tenor.com/HddAaoNav68AAAAd/ng%E1%BB%ADi-hoa-t%E1%BA%B7ng-hoa.gif",
    },
    {
      id: 7,
      url: "/images/slide/s15.gif",
    },
    {
      id: 8,
      url:"/images/slide/s16.gif" ,
    },
    {
      id: 9,
      url: "/images/slide/s17.gif",
    },
    {
      id: 10,
      url: "/images/slide/s18.gif",
    },
    {
      id: 11,
      url: "/images/slide/s19.gif",
    },
    {
      id: 12,
      url: "/images/slide/s10.png",
    },
    {
      id: 13,
      url: "/images/slide/s11.png",
    },
    {
      id: 14,
      url: "/images/slide/s12.png",
    },
    {
      id: 15,
      url: "/images/slide/s13.png",
    },
    {
      id: 16,
      url: "https://media.tenor.com/uEkXBKLnEGAAAAAC/wedding-kiss.gif",
    },
    {
      id: 17,
      url: "/images/slide/s14.png",
    },
  ];

  return (
    <Swiper
      pagination={true}
      modules={[Pagination, Autoplay]}
      className="mySwiper"
      loop={true}
      speed={1}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      {images.map((image) => {
        return (
          <SwiperSlide key={image.id}>
            <img src={image.url} alt="image" width="1300" height="512" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);


  const sortedProducts = [...products].sort((a, b) => b.unitsSold - a.unitsSold);

  return (
    <>
      <Banner />
      <h1>Najprodavanije</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {sortedProducts &&
            sortedProducts.map((product) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              );
            })}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;