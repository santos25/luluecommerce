import React, { useState } from "react";
//redux
import { connect } from "react-redux";
//actions
import { addItemsToCart } from "../../Redux/Cart/cart.action";
import { addItemsToSavedList } from "../../Redux/savedList/saved.action";

//routers
import { useHistory, useRouteMatch } from "react-router-dom";

//material
import { FavoriteBorder } from "@material-ui/icons";
import {
  Card,
  CardActionArea,
  Typography,
  CardMedia,
  CardContent,
  makeStyles,
  Box,
  CardActions,
  Button,
  IconButton,
  Snackbar,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 545,
    margin: theme.spacing(0.5),
  },
  media: {
    height: 340,
  },
  icon: {
    fontSize: 26,
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CardImages = ({
  item,
  addItemsToCart,
  typeCollection,
  iconFav,
  renderActions,
  additemToSavedList,
}) => {
  const [state, setState] = useState({
    open: false,
  });
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch();

  const { tagid } = match.params;

  const { open } = state;

  const handleClick = () => () => {
    setState({ open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const AddSavedList = (item) => {
    console.log(item);
    additemToSavedList(item);
    handleClick();
  };

  return (
    <Box>
      <Card className={classes.root}>
        <CardActionArea
        // onClick={() =>
        //   history.push(encodeURI(`/${tagid}/${typeCollection}/${item.name}`))
        // }
        >
          <CardMedia
            className={classes.media}
            image={`http://${item.images[0]}`}
            onClick={() =>
              history.push(
                encodeURI(`/${tagid}/${typeCollection}/${item.name}`)
              )
            }
          />
          <CardContent>
            <Box display="flex" width="auto">
              <Box flexGrow={1}>
                <Typography variant="subtitle2">
                  {item.name.substring(0, 10)}
                </Typography>
                <Typography variant="body2">
                  {`$${item.price.current.text}`}
                </Typography>
              </Box>
              {iconFav && (
                <Box>
                  <IconButton
                    // edge="start"
                    color="inherit"
                    aria-label="save list"
                    onClick={() => AddSavedList(item)}
                  >
                    <FavoriteBorder className={classes.icon} />
                  </IconButton>
                </Box>
              )}
            </Box>
          </CardContent>
        </CardActionArea>
        {renderActions && (
          <CardActions>
            <Button
              onClick={() => {
                addItemsToCart(item);
              }}
              variant="contained"
              size="small"
              color="primary"
            >
              Agregar al Carrito
            </Button>
          </CardActions>
        )}
      </Card>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Guardado!
        </Alert>
      </Snackbar>
      {/* <Snackbar
        severity="success"
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
      /> */}
    </Box>
  );
};

const mapDispatchToState = (dispatch) => ({
  addItemsToCart: (item) => {
    dispatch(addItemsToCart(item));
  },
  additemToSavedList: (item) => {
    dispatch(addItemsToSavedList(item));
  },
});

export default connect(null, mapDispatchToState)(CardImages);
