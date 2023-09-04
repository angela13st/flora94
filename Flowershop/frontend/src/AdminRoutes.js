import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminProductListScreen from "./screens/AdminProductListScreen";
import AdminProductEditScreen from "./screens/AdminProductEditScreen";
import AdminProductCreateScreen from "./screens/AdminProductCreateScreen";
import AdminUserListScreen from "./screens/AdminUserListScreen";
import EditUserScreen from "./screens/EditUserScreen";
import CreateUserScreen from "./screens/CreateUserScreen";
import SchedulePage from "./screens/SchedulePage";
import ScheduleForm from "./screens/ScheduleForm";
import RestockListScreen from "./screens/RestockListScreen";
import AdminArticleListScreen from "./screens/AdminArticleListScreen";
import AdminArticleEditScreen from "./screens/AdminArticleEditScreen";


const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/productlist" element={<AdminProductListScreen />} />
      <Route path="/product/:id/edit" element={<AdminProductEditScreen />} />
      <Route path="/product/create" element={<AdminProductCreateScreen />} />
      <Route path="/userList" element={<AdminUserListScreen />} />
      <Route path="/user/:userId/edit" element={<EditUserScreen />} />
      <Route path="/user/create" element={<CreateUserScreen />} />
      <Route path="/schedule" element={<SchedulePage/>} />
      <Route path="/allRestocks" element={<RestockListScreen/>} />
      <Route path="/create-schedule/:employeeId" element={<ScheduleForm />} />
      <Route path="/articles" element={<AdminArticleListScreen/>} />
      <Route path="/articles/:id/edit" element={<AdminArticleEditScreen />} />



    </Routes>
  );
};

export default AdminRoutes;
