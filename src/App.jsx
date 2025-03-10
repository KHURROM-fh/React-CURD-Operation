import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StockData from "./stockDataTable";
import CreateStockData from "./createStockData";
import EditStockData from "./editStockData";
import ViewStockData from "./viewStockData";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StockData />} />
        <Route path="/stockdata/create" element={<CreateStockData />} />
        <Route path="/stockdata/edit/:stockdataid" element={<EditStockData />} />
        <Route path="/stockdata/view/:stockdataid" element={<ViewStockData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
