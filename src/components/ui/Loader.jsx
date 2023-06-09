import React from "react";

import classes from './Loader.module.scss'

import { Oval } from  'react-loader-spinner'


const Loader = () => {
  return (
    <div className={classes.loader}>
    <Oval
    height={80}
    width={80}
    color="#586B89"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    ariaLabel='oval-loading'
    secondaryColor="#384967"
    strokeWidth={2}
    strokeWidthSecondary={2}
  
  />
  </div>
  );
};

export default Loader;
