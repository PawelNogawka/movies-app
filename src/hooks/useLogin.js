import { useState, useEffect } from "react";

import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);


  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsLoading(true);

    const abortController = new AbortController();

    try {
      const response = await projectAuth.signInWithEmailAndPassword(
        email,
        password
      );

      if (!response) {
        throw new Error("Could not complete login");
      }

      dispatch({ type: "LOGIN", payload: response.user });

 
        setIsLoading(false);
        setError(null);
      
    } catch (error) {

        setIsLoading(false);
        setError(error.message);
      
    } finally {
      abortController.abort();
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    return () => {
      abortController.abort();
    };
  }, []);

  return { login, error, isLoading };
};
