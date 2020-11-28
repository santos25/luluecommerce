import React from "react";

import { useHistory, useRouteMatch } from "react-router-dom";

import {
  GridList,
  GridListTile,
  GridListTileBar,
  makeStyles,
} from "@material-ui/core";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Height } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    height: "auto",
  },
  title: {
    color: theme.palette.common.white,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  imageList: {
    cursor: "pointer",
    width: "100%",
    height: "auto",
    // backgroundPosition: "center center",
    // backgroundSize: "cover",
    // objectFit: "cover",
  },
}));

const Categories = ({ categories }) => {
  const classes = useStyles();
  let match = useRouteMatch();
  let history = useHistory();
  // console.log(data[0].image);
  // console.log(history);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          {Object.keys(categories)
            .map((key) => categories[key])
            .map((category) => {
              return category.map((item) => (
                <GridListTile
                  key={item.name}
                  rows={matches ? 1.5 : 2}
                  onClick={() =>
                    history.push(`${match.url}/${encodeURI(item.name)}`)
                  }
                >
                  <img
                    className={classes.imageList}
                    src={`http://${item.image}`}
                    alt=""
                  />
                  <GridListTileBar
                    classes={{
                      root: classes.titleBar,
                      title: classes.title,
                    }}
                    title={item.name}
                    // subtitle={<span>by: {tile.author}</span>}
                    // actionIcon={
                    //   <IconButton
                    //     aria-label={`info about ${tile.title}`}
                    //     className={classes.icon}
                    //   >
                    //     <InfoIcon />
                    //   </IconButton>
                    // }
                  />
                </GridListTile>
              ));
            })}
        </GridList>
      </div>
    </>
  );
};

export default Categories;
