import { onAuthStateChanged, getAuth } from "firebase/auth";
// import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  // console.log("user");
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user____", user);
      setCurrentUser(user);
      setPending(false);

      if (!user) {
        return navigate("/login");
      }
    });
  }, []);

  // if(pending){
  //   return <>Loading...</>
  // }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
