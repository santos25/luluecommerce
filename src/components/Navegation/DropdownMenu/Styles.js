import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  dropdown: {
    position: "absolute",
    top: "60px",
    width: "300px",
    minHeight: "400px",
    maxHeight: "450px",
    transform: "translateX(-45%)",
    border: "1px solid #474a4d",
    borderRadius: "8px",
    padding: "1rem",
    overflow: "hidden",
    transition: "height var(500ms) ease",
    backgroundColor: "white",
    color: theme.palette.common.black,
  },
  menu: {
    width: "100%",
  },

  menuItem: {
    height: "auto",
    display: "flex",
    alignItems: "center",
    borderRadius: "8px",
    transition: "background 500ms",
    padding: "0.5rem",
    color: theme.palette.common.white,

    "&:hover": {
      backgroundColor: "#525357",
    },
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  title: {
    textTransform: "uppercase",
  },
  titleProd: {
    textTransform: "uppercase",
    fontWeight: "bold",
  },
}));
