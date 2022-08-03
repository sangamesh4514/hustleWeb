import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HustlerRegister from "./components/auth/HustlerRegister";
import Login from "./components/auth/Login";
import Otp from "./components/auth/Otp";
import Register from "./components/auth/Register";
import Home from "./components/tabs/Home";
import Errors from "./components/utils/Errors";
import Navbar from "./components/utils/Navbar";
import Profile from "./components/profile/Profile";
import EditUser from "./components/profile/EditUser";
import EditHustler from "./components/profile/EditHustler";
import SplashScreen from "./components/utils/SplashScreen";
import SearchPlaces from "./components/tabs/SearchPlaces";
import Hustlers from "./components/tabs/Hustlers";
import Hustler from "./components/tabs/Hustler";
import Map from "./components/tabs/Map";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/register/user" element={<Register />} />
        <Route path="/register/hustler" element={<HustlerRegister />} />
        <Route path="/edit/user" element={<EditUser />} />
        <Route path="/edit/hustler" element={<EditHustler />} />
        <Route path="/location/search" element={<SearchPlaces />} />
        <Route path="/location/map" element={<Map />} />
        <Route path="home" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="hustlers/:skill" element={<Hustlers />} />
          <Route path="hustler/:userId" element={<Hustler />} />
          <Route path="me" element={<Profile />} />
        </Route>
        <Route path="*" element={<Errors />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
