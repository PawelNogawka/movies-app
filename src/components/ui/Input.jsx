import React from "react";

import classes from './Input.module.scss';

const Input = ({
  label,
  type,
  name,
  placeholder,
  onChange,
  value,
  error,
  required
}) => {
  const errorEl = <span className={classes.error}>{error}</span>;

  return (
    <div className={classes.input}>
      <label htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required = {required ? required : false}
      />
      {error && errorEl}
    </div>
  );
};

export default Input;