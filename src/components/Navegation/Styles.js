import { makeStyles, fade } from "@material-ui/core";

export default makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    maxWidth: "1170px",
    // marginLeft: theme.spacing(7),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // width: "60px",
    // height: "60px",
    // marginRight: theme.spacing(5),
    [theme.breakpoints.up("sm")]: {
      // width: "70px",
      // height: "70px",
    },
  },
  genre: {
    fontWeight: "600",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: "0 auto",
    width: "70%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",

    [theme.breakpoints.up("sm")]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,
    },
  },
  popoverUserDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  navBarItem: {
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
  },
  genre: {
    fontWeight: "600",
    cursor: "pointer",
  },
}));
