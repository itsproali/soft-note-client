import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import {Toaster} from "react-hot-toast"
import Loading from "./components/Loading";

function App() {
  return (
    <div className="">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/loading" element={<Loading />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
