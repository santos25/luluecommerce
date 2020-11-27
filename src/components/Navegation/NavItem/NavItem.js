import React, { useState } from "react";

//Material UI
import { Box, ClickAwayListener } from "@material-ui/core";

import UseStyles from "./Styles";

const NavItem = (props) => {
  const [open, setOpen] = useState(props.state ? props.state : false);
  const classes = UseStyles();

  const handlePopoverOpen = (event) => {
    // setAnchorEl(event.currentTarget);
    setOpen((prevState) => !prevState);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box>
        {props.renderElement(handlePopoverOpen)}
        {open && props.children}
      </Box>
    </ClickAwayListener>
  );
};

export default NavItem;
