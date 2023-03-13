import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useSignup } from "../../hooks/useSignup";

import classes from "./Signup.module.scss";

import Input from "../../components/ui/Input";
import Wrapper from "../../components/ui/Wrapper";
import Button from "../../components/ui/Button";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);

  const { signup, isLoading, error } = useSignup();

  const handleFileInputChange = (e) => {
    const photo = e.target.files[0];
    setThumbnailError(null);
    setThumbnail(null);

    if (!photo) {
      setThumbnailError("Please, choose a photo");
      return;
    }

    if (photo.size > 100000) {
      setThumbnailError("Image is too big");
      return;
    }
    if (!photo.type.includes("image")) {
      setThumbnailError("Photo must be an image");
      return;
    }

    setThumbnail(photo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!thumbnail) {
      setThumbnailError("Please, choose a photo");
      return;
    }

    if (!password.trim() || !email.trim() || !name.trim() || !thumbnail) {
      return;
    }

    signup(email, password, name, thumbnail);
  };
  return (
    <>
      <Wrapper>
        <main className={classes.signup}>
          <div className={classes["form-box"]}>
            <h1 className={classes.heading}>signup</h1>
            <form onSubmit={handleSubmit} className={classes.form}>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                label="email"
                placeholder="Enter your email..."
                type="email"
                required
              />
              <Input
                onChange={(e) => setName(e.target.value)}
                value={name}
                label="name"
                placeholder="Enter your name..."
                type="text"
                required
              />
              <Input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                label="password"
                placeholder="Enter your password..."
                type="password"
                required
              />
              <Input
                onChange={(e) => handleFileInputChange(e)}
                label="thumbanil"
                placeholder="Choose file"
                type="file"
                //  required
              />
              {thumbnailError && (
                <p className={classes.error}>{thumbnailError}</p>
              )}
              <div className={classes.btns}>
                <Button submit text={isLoading ? "loading..." : "sign up"} />
                <Link to="/signin">
                  <Button outlined text="have an account? login" />
                </Link>
              </div>
              {error && <p className={classes.error}>{error}</p>}
            </form>
          </div>
        </main>
      </Wrapper>
    </>
  );
};

export default Signup;
