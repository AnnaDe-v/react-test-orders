import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );

      if (user) {
        return navigate("/react-test-orders");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const navigate = useNavigate();

  const register = async () => {
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (e) {
      console.log("e", e.code);
    }
  };

 

  return (
    <>
      <div>
        <h3> Login </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />

        <button onClick={login}> Login</button>
      </div>

      <h4> User Logged In: </h4>
      {user?.email}
      <button onClick={logout}> Sign Out </button>

      <button onClick={register}>register</button>
    </>
  );
};

export default Login;
