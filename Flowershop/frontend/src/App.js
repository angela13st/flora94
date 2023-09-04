import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import AdminRoutes from "./AdminRoutes"; // Import the AdminRoutes component
import ProductList from "./screens/ProductList";
import CustomBouquetScreen from "./screens/CustomBouquet";
import ScheduleScreen from "./screens/ScheduleScreen";
import RestockForm from "./screens/RestockForm";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";
import ArticleListScreen from "./screens/ArticleListScreen";
import ArticleDetailsScreen from "./screens/ArticleDetailsScreen";
import ArticleCreateScreen from "./screens/ArticleCreateScreen";
import AboutUs from "./screens/AboutUsScreen";
import AssortmentScreen from "./screens/AssortmentScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/orders/:id" element={<OrderScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile/:id" element={<ProfileScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id?" element={<CartScreen />} />
            <Route path="/allProducts" element={<ProductList />} />
            <Route path="/custombouquet" element={<CustomBouquetScreen/>} />
            <Route path="/myschedule" element={<ScheduleScreen />} />
            <Route path="/restock" element={<RestockForm />} />
            <Route path="/order/:id" element={<OrderDetailsScreen />} />
            <Route path="/admin/*" element={<AdminRoutes />} /> 
            <Route path="/" element={<HomeScreen />} />
            <Route path="/articles" element={<ArticleListScreen />} />
            <Route path="/article/:id" element={<ArticleDetailsScreen />} />
            <Route path="/create-article" element={<ArticleCreateScreen />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/Assortment" element={<AssortmentScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
