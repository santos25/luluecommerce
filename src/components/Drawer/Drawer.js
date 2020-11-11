import React, { useState } from "react";

//redux
import { connect } from "react-redux";
//selectors
import { categoriesSelector } from "../../Redux/shop/shop.selectors";

//components
import DrawerCategory from "./DrawerCategory/DrawerCategory";
import DrawerCollection from "./DrawerCollections/DrawerCollection";
import { makeStyles } from "@material-ui/core";

import clsx from "clsx";
const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));

const Drawer = ({ anchor, toggleDrawer, categories }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [collections, setcollections] = useState([]);

  console.log(categories);
  const classes = useStyles();

  const getCollections = (key) => {
    console.log(key);
    setcollections(categories[key]);
    setCurrentPage(1);
  };
  const renderPages = () => {
    switch (currentPage) {
      case 0:
        return (
          <DrawerCategory
            categories={categories}
            getCollections={getCollections}
          />
        );
      case 1:
        return <DrawerCollection collections={collections} />;
      default:
        break;
    }
  };

  return (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {renderPages()}
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: categoriesSelector()(state),
});
export default connect(mapStateToProps)(Drawer);
