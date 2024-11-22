import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import ContactForm from "./components/ContactForm";
import PrivateRoute from "./components/PrivateRoute";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/home" element = {<Home/>}></Route>
        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <ContactForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
