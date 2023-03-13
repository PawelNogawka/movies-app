import React from "react";

import classes from "./Button.module.scss";

const Button = ({
  text,
  onClick,
  submit,
  shadow,
  small,
  outlined,
  disabled,
}) => {
  const buttonClasses = `${classes.button} ${
    shadow && classes["button--shadow"]
  } ${small && classes["button--small"]} ${
    outlined && classes["button--outlined"]
  }`;
  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      type={submit ? "submit" : "button"}
      disabled={disabled ? true : false}
    >
      {text}
    </button>
  );
};

export default Button;