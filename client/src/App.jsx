import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./component/layout/Layout";
import { UserContextProvider } from "./context/UserContext";
import BookingPages from "./pages/account/Bookings/BookingPages";
import CreatePlaceForm from "./pages/account/Places/CreatePlaceForm";
import Places from "./pages/account/Places/Places";
import ProfilePage from "./pages/account/ProfilePage";
import Account from "./pages/account/ProfilePage";
import LoginPage from "./pages/index/auth/login/LoginPage";
import Register from "./pages/index/auth/Register/Register";
import Index from "./pages/index/Index";

function App() {
  return (
    <div>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account/" element={<ProfilePage />} />
            <Route path="/account/places" element={<Places />} />
            <Route path="/account/places/new" element={<CreatePlaceForm />} />
            <Route path="/account/places/:id" element={<CreatePlaceForm />} />
            <Route path="/account/bookings" element={<BookingPages />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
