import { useState, useEffect } from "react";

import { projectAuth,projectStorage,projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);


  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, photo) => {
    setError(null);
    setIsLoading(true);

    const abortController = new AbortController();

    try {
      const response = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!response) {
        throw new Error("Could not complete signup");
      }

      const uploadPath = `thumbnails/${response.user.uid}/${photo.name}`;
      const img = await projectStorage.ref(uploadPath).put(photo);
      const imgUrl = await img.ref.getDownloadURL();

      await response.user.updateProfile({ displayName, photoURL: imgUrl });

      await projectFirestore.collection("users").doc(response.user.uid).set({
        online: true,
        displayName,
        photoUrl: imgUrl,
        favorites:[],
      });

      dispatch({ type: "SIGN_UP", payload: response.user });

 
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

  return { signup, error, isLoading };
};
