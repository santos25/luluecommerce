import React, { useState } from "react";

//Material UI
import { Typography } from "@material-ui/core";

import UseStyles from "./Styles";

const NavItem = (props) => {
  const [open, setOpen] = useState(false);
  const classes = UseStyles();

  return (
    <li className="nav-item">
      <Typography
        onClick={() => console.log("click menu")}
        className={classes.genre}
        variant="body1"
      >
        MUJER
      </Typography>

      {/* <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.text}
      </a> */}

      {open && props.children}
    </li>
  );
};

export default NavItem;
