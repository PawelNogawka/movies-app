import React from "react";

import classes from "./Avatar.module.scss";

const Avatar = ({ src, name }) => {
  return <img className={classes.avatar} src={src} alt={name} />;
};

export default Avatar;
