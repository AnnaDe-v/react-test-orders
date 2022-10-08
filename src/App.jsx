import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./firebase/AuthProvider";
import SignUp from "./SignUp";

import "./App.css";
import Login from "./login/Login";
import Orders from "./orders/Orders";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="react-test-orders" element={<Orders />} />
            <Route exact path="react-test-orders/login" element={<Login />} />
            {/* <Route exact path="react-test-orders/signup" element={<SignUp />} /> */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
