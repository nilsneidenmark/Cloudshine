import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./styles/index.css";
import Navbar from "./components/Header";
import { Nav } from "react-bootstrap";
import Weather from "./Weather";
import News from "./News";
import Layout from "./layouts/Layout";
import Home from "./pages/news/Home";
import Sports from "./pages/news/Sports";
import Finance from "./pages/news/Finance";
import Tech from "./pages/news/Tech";
import Science from "./pages/news/Science";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="sports" element={<Sports />} />
      <Route path="finance" element={<Finance />} />
      <Route path="tech" element={<Tech />} />
      <Route path="science" element={<Science />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
