import React from "react";
import { useSelector } from "react-redux";
import Product from "./Product";

const ListProductsComponent = () => {
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  return (
    <div>
      <h2>Lista proizvoda</h2>
      <div className="product-list">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ListProductsComponent;
