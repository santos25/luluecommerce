import React, { useState } from "react";

//redux
import { connect } from "react-redux";
//selectors
import { categoriesSelector } from "../../Redux/shop/shop.selectors";

//react-router
import { useHistory } from "react-router-dom";

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
  const [collections, setcollections] = useState({
    title: "",
    collections: [],
  });

  const classes = useStyles();
  // const match = useRouteMatch();
  const history = useHistory();

  console.log(categories);

  const getCollections = (key) => {
    console.log(key);
    setcollections({ title: key, collections: categories[key] });
    setCurrentPage(1);
  };

  const redirectCollections = (link) => {
    toggleDrawer(anchor, false)();
    history.push(`/mujer/${encodeURI(link)}`);
  };

  const renderPages = () => {
    switch (currentPage) {
      case 0:
        return (
          <DrawerCategory
            anchor={anchor}
            toggleDrawer={toggleDrawer}
            categories={categories}
            getCollections={getCollections}
          />
        );
      case 1:
        return (
          <DrawerCollection
            setCurrentPage={setCurrentPage}
            collections={collections.collections}
            title={collections.title}
            redirectCollections={redirectCollections}
          />
        );
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
      // onClick={toggleDrawer(anchor, false)}
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
