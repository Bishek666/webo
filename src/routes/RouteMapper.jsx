import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { ProfilePage } from "../pages/ProfilePage";
import Register from "../pages/Register";
import * as routes from "./routesConstants";

const RouteMapper = () => {
  return (
    <Routes>
      <Route
        path={routes.HOME}
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path={routes.LOGIN}
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path={routes.REGISTER}
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />
      <Route
        path={routes.Profile}
        element={
          <Layout>
            <ProfilePage />
          </Layout>
        }
      />
    </Routes>
  );
};

export default RouteMapper;
