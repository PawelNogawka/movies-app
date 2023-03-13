import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useLogin } from "../../hooks/useLogin";

import classes from "./Login.module.scss";

import Input from "../../components/ui/Input";
import Wrapper from "../../components/ui/Wrapper";
import Button from "../../components/ui/Button";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isLoading } = useLogin(email, password);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!password.trim() || !email.trim()) {
      return;
    }

    login(email, password);
  };

  return (
    <>
      <Wrapper>
        <main className={classes.signup}>
          <div className={classes["form-box"]}>
            <h1 className={classes.heading}>signin</h1>
            <form className={classes.form} onSubmit={handleFormSubmit}>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                label="email"
                placeholder="Enter your email..."
                type="email"
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
              <div className={classes.btns}>
                <Button submit text={isLoading ? "loading..." : "login"} />
                <Link to="/signup">
                  <Button outlined text="dont have an account? signup" />
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
