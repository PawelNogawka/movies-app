
import { Link } from "react-router-dom";

import classes from  './Tag.module.scss'

const Tag = ({text,href}) => {
  return (
    <Link className={classes.tag} to={href} >
          {text}
    </Link>
  );
};

export default Tag;
