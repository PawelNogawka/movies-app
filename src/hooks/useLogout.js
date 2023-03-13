import { useState, useEffect } from "react";

import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);


  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsLoading(true);

    const abortController = new AbortController();

    try {
      await projectAuth.signOut()

      dispatch({ type: "LOGOUT" });
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

  return { logout, error, isLoading };
};
