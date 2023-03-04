import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./component/layout/Layout";
import { UserContextProvider } from "./context/UserContext";
import Account from "./pages/account/Account";
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
            <Route path="/account/:subpage?" element={<Account />} />
            <Route path="/account/:subpage/:type" element={<Account />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
