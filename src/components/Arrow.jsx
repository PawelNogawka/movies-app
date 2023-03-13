import React from "react";

import { TfiAngleDoubleDown } from "react-icons/tfi";

import classes from "./Arrow.module.scss";

const Arrow = ({ href }) => {
  return (
    <a className={classes.arrow} href={href}>
      <TfiAngleDoubleDown />
    </a>
  );
};

export default Arrow;
