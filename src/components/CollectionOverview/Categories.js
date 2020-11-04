import React from "react";

import {
  GridList,
  GridListTile,
  GridListTileBar,
  makeStyles,
} from "@material-ui/core";

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
}));

const Categories = ({ data, history }) => {
  const classes = useStyles();
  // console.log(data[0].image);
  // console.log(history);
  return (
    <>
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          {/* <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">December</ListSubheader>
          </GridListTile> */}
          {data.map((category) => (
            <GridListTile
              key={category.id}
              rows={1.5}
              onClick={() => history.push(`/${encodeURI(category.name)}`)}
            >
              <img src={`http://${category.image}`} alt="" />
              <GridListTileBar
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                title={category.name}
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
          ))}
        </GridList>
      </div>
    </>
  );
};

export default Categories;
