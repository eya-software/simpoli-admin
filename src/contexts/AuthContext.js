import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import { Client } from "@microsoft/microsoft-graph-client";
import { useCookies } from "react-cookie";

export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [cookies, setCookie] = useCookies(["auth"]);
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [reauthenticating, setReauthenticating] = useState(false);
  const [profilePic, setProfilePic] = useState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const provider = new firebase.auth.OAuthProvider("microsoft.com");
  const history = useHistory();

  async function loginWithMicrosoft() {
    const res = await auth.signInWithPopup(provider);
    const credential = res.credential;
    const accessToken = credential.accessToken;

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    setCookie("token", credential.accessToken, { expires: expiration });

    await retrieveProfilePic(accessToken);
    setLoading(false);
  }

  async function retrieveProfilePic(token) {
    const client = Client.initWithMiddleware({
      authProvider: {
        getAccessToken: () => Promise.resolve(token),
      },
    });
    const res = await client.api("/me/photo/$value").get();
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(res);
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
      if (user != null) {
        if (cookies.token) {
          retrieveProfilePic(cookies.token).then(() => setLoading(false));
        } else {
          if (reauthenticating) return;
          setReauthenticating(true);
          currentUser.reauthenticateWithPopup(provider).then((res) => {
            const credential = res.credential;
            const accessToken = credential.accessToken;

            const expiration = new Date();
            expiration.setHours(expiration.getHours() + 1);
            setCookie("token", credential.accessToken, { expires: expiration });

            retrieveProfilePic(accessToken).then(() => setLoading(false));
          });
        }
        history.push("/");
      }
    });

    return unsubscribe;
  }, [
    history,
    cookies.token,
    provider,
    setCookie,
    currentUser,
    reauthenticating,
  ]);

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
