import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Today from "./components/Today";
import Memories from "./components/Memories";
import CreateUser from "./components/CreateUser";
import Login from "./components/Login";
import "./App.css";

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/today" element={<Today />} />
            <Route path="/memories" element={<Memories />} />
            <Route path="/createUser" element={<CreateUser />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};
export default App