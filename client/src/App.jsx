import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Today from "./components/Today";
import Memories from "./components/Memories";
import Login from "./components/Login";
import "./App.css";

import { useState } from "react";

const App = () => {

  window.onbeforeunload = function() {
    localStorage.clear();
  }

  // localStorage.setItem('username', '');
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <Navbar loggedIn={loggedIn}/>
        <div className="body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home/*" element={<Home />} />
            <Route path="/date/*" element={<Today />} />
            <Route path="/memories" element={<Memories />} />
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};
export default App