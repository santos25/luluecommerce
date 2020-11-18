import React, { useState } from "react";
//redux
import { connect } from "react-redux";
//actions
import { addItemsToCart } from "../../Redux/Cart/cart.action";
import {
  addItemsToSavedList,
  removeItemSavedList,
} from "../../Redux/savedList/saved.action";

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
  Box,
  CardActions,
  Button,
  IconButton,
  Snackbar,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import useStyles from "./Styles";

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
  removeItemSaved,
  renderRemoveSaved,
  genreid,
}) => {
  const [state, setState] = useState({
    open: false,
  });
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch();

  const { tagid } = match.params;

  const { open } = state;

  const handleClick = () => {
    setState({ open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const AddSavedList = (item, tagid, typeCollection) => {
    console.log(item, tagid, typeCollection);
    additemToSavedList({ ...item, tagid, typeCollection });
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
                encodeURI(
                  `/${tagid ? tagid : genreid}/${typeCollection}/${item.name}`
                )
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
                    onClick={() => AddSavedList(item, tagid, typeCollection)}
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
        {renderRemoveSaved && (
          <CardActions>
            <Button
              onClick={() => {
                removeItemSaved(item);
              }}
              variant="contained"
              size="small"
              color="primary"
            >
              Eliminar
            </Button>
          </CardActions>
        )}
      </Card>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Guardado!
        </Alert>
      </Snackbar>
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
  removeItemSaved: (item) => {
    dispatch(removeItemSavedList(item));
  },
});

export default connect(null, mapDispatchToState)(CardImages);
