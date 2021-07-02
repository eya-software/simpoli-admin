import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import { Client } from "@microsoft/microsoft-graph-client";

export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // TODO: make profile pic work without sign in
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [profilePic, setProfilePic] = useState();
  const provider = new firebase.auth.OAuthProvider("microsoft.com");
  const history = useHistory();

  async function loginWithMicrosoft() {
    const res = await auth.signInWithPopup(provider);
    const credential = res.credential;
    const accessToken = credential.accessToken;
    const client = Client.initWithMiddleware({
      authProvider: {
        getAccessToken: () => Promise.resolve(accessToken),
      },
    });
    client
      .api("/me/photo/$value")
      .get()
      .then((res_1) => {
        const reader = new FileReader();
        reader.onload = () => {
          setProfilePic(reader.result);
        };
        reader.readAsDataURL(res_1);
      });
    setLoading(false);
  }

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user != null) {
        history.push("/");
      }
    });

    return unsubscribe;
  }, [history]);

  const value = {
    currentUser,
    signup,
    login,
    loginWithMicrosoft,
    logout,
    profilePic,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
