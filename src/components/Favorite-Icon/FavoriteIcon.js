import React from "react";

//redux
import { connect } from "react-redux";

//routers
import { useHistory } from "react-router-dom";

//material
import { Badge, IconButton } from "@material-ui/core";
import { FavoriteBorder as FavoriteBorderIcon } from "@material-ui/icons";

//selectors
import { itemCountFavoriteSelector } from "../../Redux/savedList/saved-selectors";

// const useStyles = makeStyles((theme) => ({
//   colorError: {
//     color: "#9ddfd3",
//   },
// }));

const FavoriteIcon = ({ itemCountFavorite }) => {
  let history = useHistory();
  //   const classes = useStyles();
  return (
    <IconButton
      aria-label="Favorite Items"
      color="inherit"
      onClick={() => history.push("/saved-lists")}
    >
      <Badge badgeContent={itemCountFavorite} color="error">
        <FavoriteBorderIcon />
      </Badge>
    </IconButton>
  );
};

const mapStateToProps = (state) => ({
  itemCountFavorite: itemCountFavoriteSelector(state),
});

export default connect(mapStateToProps)(FavoriteIcon);
