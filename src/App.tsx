import React from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import View from "./pages/view";
import Edit from "./pages/edit";
import LayoutDefault from "./components/Layout/LayoutDefault";

function App() {
  return (
    <div>
      <LayoutDefault>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/product" element={<View />} />
          <Route path="/product/edit" element={<Edit />} />
        </Routes>
      </LayoutDefault>
    </div>
  );
}

export default App;
