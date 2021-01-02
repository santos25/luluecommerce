import React, { useEffect, useRef, useState } from "react";

//components
import ListItemComponent from "../../ListItemComponent/ListItemComponent";

//routers
import { useHistory } from "react-router-dom";

import { CSSTransition } from "react-transition-group";
//materialUI
import { Box, IconButton, List, Typography } from "@material-ui/core";

import {
  ArrowBack as ArrowBackIcon,
  Storefront as StoreFrontIcon,
} from "@material-ui/icons";

import UseStyles from "./Styles";

const DropdownMenu = ({ datas }) => {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const [collections, setCollections] = useState({
    title: "",
    collections: [],
  });
  const [selectedKey, setSelectedKey] = useState("");
  const dropdownRef = useRef(null);

  const classes = UseStyles();
  const history = useHistory();

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  const getCollections = (key) => {
    console.log(datas[key]);
    setSelectedKey(key);
    setActiveMenu(key);
    setCollections({ title: key, collections: datas[key] });
    // setcollections({ title: key, collections: categories[key] });
    // setCurrentPage(1);
  };

  const redirectCollections = (link) => {
    history.push(`/mujer/${encodeURI(link)}`);
  };

  // function DropdownItem(props) {
  //   return (
  //     <a
  //       href="#"
  //       className={classes.menuItem}
  //       onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
  //     >
  //       {/* <span className="icon-button">{props.leftIcon}</span> */}
  //       {props.children}
  //       {/* <span className="icon-right">{props.rightIcon}</span> */}
  //     </a>
  //   );
  // }

  return (
    <div
      className={classes.dropdown}
      style={{ height: menuHeight }}
      ref={dropdownRef}
    >
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className={classes.menu}>
          <Box
            mt={1}
            mb={1}
            borderBottom={1}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <StoreFrontIcon />
            <Typography className={classes.title} variant="body1">
              Colecciones
            </Typography>
          </Box>

          <List>
            {Object.keys(datas).map((key, index) => (
              <ListItemComponent
                key={index}
                text={key}
                getDataClick={() => getCollections(key)}
                avatarClass={classes.large}
                titleClass={classes.title}
                image={datas[key][0].image}
                variant="body1"
              />
            ))}
          </List>

          {/* <DropdownItem>My Profile</DropdownItem>
          <DropdownItem
            // leftIcon={<CogIcon />}
            // rightIcon={<ChevronIcon />}
            goToMenu="settings"
          >
            Settings
          </DropdownItem>
         */}
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === selectedKey}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className={classes.menu}>
          <Box
            mt={1}
            mb={1}
            borderBottom={1}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <IconButton
              edge="start"
              color="primary"
              aria-label="back"
              onClick={() => setActiveMenu("main")}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography className={classes.title} variant="body1">
              {collections.title}
            </Typography>
          </Box>
          <Box className={classes.background} mt={1} pt={1} pb={0.5} px={1}>
            <Typography className={classes.titleProd} variant="body2">
              Ver por producto
            </Typography>
          </Box>
          <List>
            {collections.collections.map((collection, index) => (
              <ListItemComponent
                key={index}
                text={collection.name}
                getDataClick={() => redirectCollections(collection.name)}
                avatarClass={classes.large}
                image={collection.image}
                variant="subtitle1"
              />
            ))}
          </List>
        </div>
      </CSSTransition>
    </div>
  );
};

export default DropdownMenu;
