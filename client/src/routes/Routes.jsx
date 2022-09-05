import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

export const PublicRoutes = () => {
  return (
    <Routes>
      {publicRoutes.map((route, index) => {
        const Component = route.component;
        return (
          <Route key={index} path={route.path} element={<Component />}></Route>
        );
      })}
    </Routes>
  );
};
