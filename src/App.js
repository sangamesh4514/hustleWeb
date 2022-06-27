import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HustlerRegister from "./components/auth/HustlerRegister";
import Login from "./components/auth/Login";
import Otp from "./components/auth/Otp";
import Register from "./components/auth/Register";
import Home from "./components/tabs/Home";
import UserProfile from "./components/users/UserProfile";
import Users from "./components/users/Users";
import Errors from "./components/utils/Errors";
import Navbar from "./components/utils/Navbar";
import Profile from "./components/profile/Profile";
import EditUser from "./components/profile/EditUser";
import EditHustler from "./components/profile/EditHustler";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/:id" element={<HustlerRegister />} />
        <Route path="/edit/user/:id" element={<EditUser />} />
        <Route path="/edit/hustler/:id" element={<EditHustler />} />
        <Route path="home" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="users/:skill" element={<Users />} />
          <Route path="user/:userId" element={<UserProfile />} />
          <Route path="me" element={<Profile />} />
        </Route>
        <Route path="*" element={<Errors />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
