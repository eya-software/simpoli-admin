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
  const [reauthenticating, setReauthenticating] = useState(false);
  const [profilePic, setProfilePic] = useState();
  const provider = useMemo(
    () => new firebase.auth.OAuthProvider("microsoft.com"),
    []
  );
  const history = useHistory();

  async function loginWithMicrosoft() {
    const res = await auth.signInWithPopup(provider);
    const accessToken = res.credential.accessToken;

    createTokenCookie(accessToken);
    await fetchProfilePic(accessToken);
    setLoadingProfile(false);
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
    },
    [setCookie]
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
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user != null) {
        if (cookies.token) {
          fetchProfilePic(cookies.token).then(() => setLoadingProfile(false));
        } else if (user.providerData[0].providerId === "microsoft.com") {
          if (reauthenticating) return;
          setReauthenticating(true);
          currentUser.reauthenticateWithPopup(provider).then((res) => {
            const accessToken = res.credential.accessToken;

            createTokenCookie(accessToken);
            fetchProfilePic(accessToken).then(() => setLoadingProfile(false));
          });
        }
        history.push("/");
      }
    });

    return unsubscribe;
  }, [
    history,
    cookies.token,
    createTokenCookie,
    provider,
    setCookie,
    currentUser,
    reauthenticating,
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
