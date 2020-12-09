import React, { useState, useEffect } from "react";

import ModalDialogAdd from "./ModalDialogAdd";
import AlertComponent from "../Utils/Alert";

//components
import CreatePrendas from "./CreatePrendas";
import ListPrenda from "./ListPrenda";

import { firestore, removePrenda } from "../../../FireBase/FireBaseUtil";

import {} from "@material-ui/core";

const HomePrendas = () => {
  const [prendas, setPrendas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [currentPage, setCurrentPage] = useState("home");
  // const [openModalAdd, setOpenModal] = useState(false);
  // const [openDelete, setOpenDelete] = useState({ open: false, itemdelete: {} });

  // const classes = useStyles();

  useEffect(() => {
    fetchPrendas();
  }, []);

  const fetchPrendas = () => {
    const collectionRef = firestore.collection("genre").doc("mujer");
    collectionRef.get().then((document) => {
      const datas = [];
      console.log(document.data());
      const { categorias } = document.data();
      // console.log(categorias);
      setCategorias(categorias);
      Object.keys(categorias).forEach((key) => {
        const itemDatas = categorias[key];
        // console.log(item);
        itemDatas.forEach((item) => {
          datas.push({
            name: item.name,
            type: key,
          });
        });
      });
      setPrendas(datas);
    });
  };

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const saveNewCategory = () => {};

  const handleCategory = (e) => {
    const { name, value } = e.target;
    console.log(value);
  };

  // const handleModalAdd = () => {
  //   setOpenModal(!openModalAdd);
  // };

  // const handleCloseDelete = () => {
  //   setOpenDelete({ open: false, itemdelete: {} });
  // };

  // const handleDeleteItem = (item) => {
  //   console.log(item);
  //   const docRef = firestore.collection("genre").doc(item.genre.toLowerCase());

  //   removePrenda(docRef, item);

  //   // handleCloseDelete();
  //   fetchPrendas();
  // };

  const rowsDataTable = prendas.map((prenda) => ({
    columnValue1: { image: false, value: prenda.name },
    columnValue2: { image: false, value: prenda.type },
  }));

  const columnsDataTable = [
    { name: "NOMBRE", align: "right" },
    { name: "TIPO", align: "right" },
  ];

  const renderComponent = () => {
    switch (currentPage) {
      case "home":
        return (
          <ListPrenda
            rowsDataTable={rowsDataTable}
            columnsDataTable={columnsDataTable}
            handleCurrentPage={handleCurrentPage}
          />
        );
      case "create":
        return <CreatePrendas categorias={categorias} />;
      default:
        break;
    }
  };

  return <div>{renderComponent()}</div>;
};

export default HomePrendas;
