import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import { Toaster } from "react-hot-toast";
import Weather from "./components/Weather";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Weather />} path="/:location" />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
