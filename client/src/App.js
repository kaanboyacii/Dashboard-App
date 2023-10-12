import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import Costs from "./pages/costs/Costs";
import Payments from "./pages/payments/Payments";
import Statistics from "./pages/statistics/Statistics";
import Orders from "./pages/orders/Orders";
import New from "./pages/new/New";
import Profile from "./pages/profile/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {currentUser ? (
          <>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="payments" element={<Payments />} />
              <Route path="costs" element={<Costs />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="orders" element={<Orders />} />
              <Route path="projects">
                <Route index element={<List />} />
                <Route path=":id" element={<Single />} />
                <Route
                  path="new"
                  element={<New />}
                />
              </Route>
              <Route path="profile">
                <Route index path=":id" element={<Profile />} />
              </Route>
            </Route>
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;