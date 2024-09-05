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
          window.sessionStorage.setItem("jwt", response);
          setState({ isLoading: false, isError: false, errorMsg: "" });
          console.log(response);
          setJwt("jwt");
        })
        .catch((error) => {
          window.sessionStorage.removeItem("jwt");
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
    window.sessionStorage.removeItem("jwt");
    setJwt(null);
  }, [setJwt]);

  return {
    isAuthenticated: Boolean(jwt),
    isLoading: state.isLoading,
    isError: state.isError,
    errorMsg: state.errorMsg,
    login,
    logout,
  };
}
