import Context from "../context/UserContext";
import { useCallback, useContext, useState } from "react";
import loginService from "../services/login";

export default function useUser() {
  const { jwt, setJwt } = useContext(Context);
  const [state, setState] = useState({
    isLoading: false,
    isError: false,
    errorMsg: "",
  });

  const login = useCallback(
    (email, password) => {
      setState({ isLoading: true, isError: false, errorMsg: "" });
      loginService(email, password)
        .then((response) => {
          const jwt = response.headers.get("Authorization");
          const userData = response.data.status.data;
          window.sessionStorage.setItem("user", JSON.stringify(userData));
          window.sessionStorage.setItem("jwt", jwt);
          setState({ isLoading: false, isError: false, errorMsg: "" });
          console.log(response);
          setJwt("jwt");
        })
        .catch((error) => {
          window.sessionStorage.removeItem("user");
          window.sessionStorage.removeItem("jwt");
          console.log(error);
          setState({
            isLoading: false,
            isError: true,
            errorMsg: error.toJSON().message.response.data,
          });
        });
    },
    [setJwt, setState]
  );

  const logout = useCallback(() => {
    window.sessionStorage.removeItem("user");
    window.sessionStorage.removeItem("jwt");
    setJwt(null);
  }, [setJwt]);

  const getUserData = useCallback(() => {
    const userData = window.sessionStorage.getItem("user");
    return JSON.parse(userData);
  }, []);

  return {
    isAuthenticated: Boolean(jwt),
    isLoading: state.isLoading,
    isError: state.isError,
    errorMsg: state.errorMsg,
    login,
    logout,
    getUserData,
  };
}
