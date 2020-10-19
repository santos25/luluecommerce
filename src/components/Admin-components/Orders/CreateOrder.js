import React, { useState, useRef } from "react";
import ReactToPrint from "react-to-print";

import ToPdf from "react-to-pdf";
import { firestore } from "../../../FireBase/FireBaseUtil";

//components
import OrderTable from "./OrderTable";
import PrintOrder from "./PrintOrder/PrintOrder";

import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  IconButton,
  ButtonGroup,
} from "@material-ui/core";
import { ArrowBack, Delete } from "@material-ui/icons";

const useStyle = makeStyles((theme) => ({
  search: {
    "& > *": {
      marginRight: theme.spacing(2),
    },
  },
  loading: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  print: {
    visibility: "hidden",
  },
}));

const CreateOrder = ({ closeModal, returnPage }) => {
  const [items, setItems] = useState([]);
  const [client, setClient] = useState({ id: null, name: "" });
  const inputSearchRef = useRef(null);
  const [orderInfo, setOrderInfo] = useState({ payType: "", abono: 0 });
  const pdfRef = useRef(null);
  const componentRef = useRef();

  const [loading, setLoading] = useState(false);

  const classes = useStyle();

  const addRow = () => {
    items.push({
      description: "",
      quantity: 0,
      price: 0,
      total: 0.0,
      discount: 0,
    });

    setItems([...items]);
  };

  const searchClient = () => {
    console.log(inputSearchRef.current.value);
    if (inputSearchRef.current.value !== "") {
      const docRef = firestore
        .collection("clients")
        .doc(inputSearchRef.current.value);

      docRef.get().then((document) => {
        if (document.exists) {
          console.log("Exist ", document.data());
          setClient({
            id: document.id,
            cedula: document.data().cedula,
            name: `${document.data().name} ${document.data().lastName}`,
          });
        } else {
          alert("No se encontro cliente");
        }
      });
    } else {
      alert("Ingrese Cedula del Cliente");
      setClient({ id: null, name: "" });
    }
  };

  const handleItems = (e, index) => {
    const { name, value } = e.target;

    const itemChanged = items[index];
    itemChanged[name] = value;
    if (itemChanged.quantity && itemChanged.price) {
      itemChanged.total = Number.parseFloat(
        itemChanged.quantity * itemChanged.price
      );

      if (itemChanged.discount > 0) {
        itemChanged.total =
          itemChanged.total - (itemChanged.total * itemChanged.discount) / 100;
      }
    }
    items[index] = itemChanged;
    setItems([...items]);
  };

  const saveOrder = async () => {
    console.log("save order");
    setLoading(true);

    const docRef = firestore
      .collection("clients")
      .doc(client.id)
      .collection("orders")
      .doc();

    await docRef.set({
      items: items,
      date: new Date(),
      ...orderInfo,
    });
    // let batch = firestore.batch();

    // items.forEach((item) => {
    //   const newDocRef = collecRef.doc();
    //   batch.set(newDocRef, item);
    // });

    // await batch.commit();

    setLoading(false);
    // fetchOrders();
  };

  const handleDeleteRow = (index) => {
    console.log(index);
    items.splice(index, 1);
    setItems([...items]);
  };

  const getTotal = () => {
    const total = items.reduce((total, item) => {
      return total + item.total;
    }, 0);
    return total - orderInfo.abono;
  };
  return (
    <Box>
      <Button
        onClick={returnPage}
        startIcon={<ArrowBack />}
        size="small"
        variant="contained"
        color="primary"
      >
        Regresar
      </Button>
      <Box display="flex" alignItems="center" py={2} mb={1}>
        <div className={classes.search}>
          <TextField
            id="userid"
            name="userid"
            label="Cedula"
            placeholder="Ingrese Cedula"
            inputProps={{ ref: inputSearchRef }}
            variant="outlined"
            size="small"
          />

          <Button
            variant="contained"
            size="small"
            onClick={searchClient}
            color="primary"
          >
            Buscar
          </Button>
        </div>
        <div>
          <TextField
            label="Nombre"
            id="username"
            style={{ width: "25rem" }}
            name="username"
            disabled={true}
            variant="outlined"
            size="small"
            value={client.name}
          />
        </div>
      </Box>

      <Box display="flex">
        <Grid container>
          <Grid xs={12} sm={6} item>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">
                Tipo de Pago
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={orderInfo.payType}
                onChange={(e) =>
                  setOrderInfo({ ...orderInfo, payType: e.target.value })
                }
              >
                <MenuItem value="Contra Entrega">Contra Entrega</MenuItem>
                <MenuItem value="Tarjeta">Tarjeta</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6} item>
            <TextField
              id="abono"
              name="abono"
              variant="outlined"
              size="small"
              value={orderInfo.abono}
              label="Abono"
              onChange={(e) =>
                setOrderInfo({ ...orderInfo, abono: e.target.value })
              }
            />
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Button
          variant="contained"
          onClick={addRow}
          size="small"
          color="primary"
          disabled={client.id ? false : true}
        >
          Agregar
        </Button>

        <Box my={1}>
          <OrderTable
            items={items}
            handleItems={handleItems}
            disabled={false}
            buttons={(index) => {
              return (
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteRow(index)}
                >
                  <Delete />
                </IconButton>
              );
            }}
          />
          <Box display="flex" justifyContent="flex-end" width="1" py={1} mt={1}>
            <Typography variant="h5"> {`TOTAL: ${getTotal()}`} </Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center">
          {loading ? (
            <div className={classes.loading}>
              <CircularProgress />
            </div>
          ) : null}

          <ButtonGroup aria-label="outlined primary button group">
            <Button
              onClick={saveOrder}
              variant="contained"
              color="primary"
              size="small"
              disabled={client.id ? false : true}
            >
              Guardar como Pedido
            </Button>
            <ReactToPrint
              trigger={() => (
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  disabled={client.id ? false : true}
                >
                  Generar Pre-Factura
                </Button>
              )}
              content={() => componentRef.current}
            />
          </ButtonGroup>

          {/* <ToPdf
            targetRef={pdfRef}
            filename="PreFactura.pdf"
            x={0}
            y={0}
            scale={0.8}
          >
            {({ toPdf }) => (
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={toPdf}
                disabled={client.id ? false : true}
              >
                Generar Pre-Factura
              </Button>
            )}
          </ToPdf> */}
        </Box>
        <Box className={classes.print}>
          <PrintOrder
            items={items}
            client={client}
            total={getTotal()}
            printRef={componentRef}
            orderInfo={orderInfo}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateOrder;
