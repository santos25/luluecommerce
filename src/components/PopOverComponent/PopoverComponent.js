import React from "react";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dropdown: {
    position: "absolute",
    top: "63px",
    width: "300px",
    transform: (props) =>
      props.transform ? props.transform : "translateX(-45%)",
    border: "1px solid #474a4d",
    borderRadius: "3px",
    padding: (props) => (props.padding ? props.padding : "1rem"),
    overflow: "hidden",
    transition: "height var(500ms) ease",
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  user: {
    fontWeight: "bold",
  },
  signout: {
    textDecoration: "underline",
    cursor: "pointer",
  },
}));

const PopoverComponent = ({ children, height, maxHeight, ...props }) => {
  const classes = useStyles(props);

  return (
    <div
      className={classes.dropdown}
      style={{ height: height, maxHeight: maxHeight }}
    >
      {children}
    </div>
  );
};

export default PopoverComponent;
