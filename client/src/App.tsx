import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import ContactForm from "./components/ContactForm";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Upload from "./components/profile/Upload";
// import SimpleFileUpload from "./components/SimpleFileUpload";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path= "/signup" element={<SignUp/>}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element = {<Home/>}></Route>
        <Route path="/upload" element={
          <PrivateRoute>
            <Upload/>
          </PrivateRoute>
          }></Route>
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
