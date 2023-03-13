import React from 'react'

import classes from './Error.module.scss'

const Error = ({error}) => {
  return (
    <div className={classes.error}>
      <p className={classes.message}>{error}</p>
    </div>
  )
}

export default Error
