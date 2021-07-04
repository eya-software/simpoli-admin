import React, {
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
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
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profilePic, setProfilePic] = useState();
  const provider = useMemo(
    () => new firebase.auth.OAuthProvider("microsoft.com"),
    []
  );
  const history = useHistory();

  async function loginWithMicrosoft() {
    await auth.signInWithRedirect(provider);
  }

  async function fetchProfilePic(token) {
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

  const createTokenCookie = useCallback(
    (token) => {
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);
      setCookie("token", token, { expires: expiration });
      cookies.token = token;
    },
    [setCookie, cookies]
  );

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    removeCookie("token");
    setProfilePic(null);
    return auth.signOut();
  }

  useEffect(() => {
    auth.getRedirectResult().then((res) => {
      if (res.credential) {
        const accessToken = res.credential.accessToken;
        createTokenCookie(accessToken);
      }
    });

    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user != null) {
        if (cookies.token) {
          fetchProfilePic(cookies.token).then(() => setLoadingProfile(false));
        } else if (user.providerData[0].providerId === "microsoft.com") {
          currentUser.reauthenticateWithRedirect(provider);
        }
        history.push("/");
      }
    });
  }, [
    history,
    cookies.token,
    createTokenCookie,
    provider,
    setCookie,
    currentUser,
  ]);

  const value = {
    currentUser,
    signup,
    loadingProfile,
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
