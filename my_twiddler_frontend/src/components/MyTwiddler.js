import React from "react";
import Layout from "./Layout";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NotFound from "./NotFound";

export default function MyTwiddler() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Layout>
              {" "}
              <Home />{" "}
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              {" "}
              <NotFound />{" "}
            </Layout>
          }
        ></Route>
      </Routes>
    </Router>
  );
}
