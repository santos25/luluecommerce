import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    maxWidth: 128,
    maxHeight: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));
