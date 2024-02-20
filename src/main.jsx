import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import TemplateOne from "./components/TemplateOne";
import TemplateTwo from "./components/TemplateTwo";
import TemplateThree from "./components/TemplateThree";

const Main = () => {
  return (
    <BrowserRouter forceRefresh={true}>
      <Navbar />
      <Routes>
        <Route path='/' element={<TemplateOne />} />
        <Route path='/v2' element={<TemplateTwo />} />
        <Route path='/v3' element={<TemplateThree />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
