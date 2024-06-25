import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Components/Home";
import ResultsPage from "./Components/ResultsPage.js";

function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
          <Route element={<Home />} path="/" ></Route>
          <Route element={<ResultsPage />} path="/Results" exact ></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}
export default App;

