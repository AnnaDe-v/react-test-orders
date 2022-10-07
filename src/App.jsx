import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Orders from "./Orders";
import { AuthProvider } from "./firebase/AuthProvider";
import Login from "./Login";
import SignUp from "./SignUp";


function App() {

  return (
    <>
        <BrowserRouter>
      <AuthProvider>
          <Routes>
            <Route path="react-test-orders"  element={<Orders/>} />
            <Route exact path="react-test-orders/login" element={<Login/>}/>
            <Route exact path="react-test-orders/signup" element={<SignUp/>}/>
          </Routes>
      </AuthProvider>
        </BrowserRouter>
    </>
  );
}

export default App;
