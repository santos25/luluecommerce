import React, { useState, useRef } from "react";
import ToPdf from "react-to-pdf";

import { firestore } from "../../../FireBase/FireBaseUtil";

//components
import OrderTable from "./OrderTable";

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
} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  search: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& > *": {
      margin: theme.spacing(1),
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
}));

const CreateOrder = ({ closeModal }) => {
  const [items, setItems] = useState([]);
  const [client, setClient] = useState({ id: null, name: "" });
  const inputSearchRef = useRef(null);
  const [orderInfo, setOrderInfo] = useState({ payType: "", abono: 0 });
  const pdfRef = useRef(null);

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
    closeModal();
    // fetchOrders();
  };

  const getTotal = () => {
    const total = items.reduce((total, item) => {
      return total + item.total;
    }, 0);
    return total - orderInfo.abono;
  };
  return (
    <Box>
      <Box className={classes.search}>
        <Typography component="h2">Cliente</Typography>
        <TextField
          // onChange={(e) => handleChange(e)}
          id="userid"
          name="userid"
          label="Cedula"
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

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Tipo de Pago</InputLabel>
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
      </Box>

      <Box display="flex">
        <Grid container>
          <Grid xs={6} item>
            <TextField
              label="Nombre"
              id="username"
              name="username"
              disabled={true}
              variant="outlined"
              size="small"
              value={client.name}
            />
          </Grid>
          <Grid xs={6} item>
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

        <OrderTable
          pdfRef={pdfRef}
          items={items}
          handleItems={handleItems}
          disabled={false}
        />

        <Box display="flex" justifyContent="center" width="1">
          <Typography component="h2"> {`TOTAL: ${getTotal()}`} </Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          {loading ? (
            <div className={classes.loading}>
              <CircularProgress />
            </div>
          ) : null}

          <Button
            onClick={saveOrder}
            variant="contained"
            color="primary"
            size="small"
            disabled={client.id ? false : true}
          >
            Guardar como Pedido
          </Button>
          <ToPdf targetRef={pdfRef} filename="PreFactura.pdf">
            {({ toPdf }) => (
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={toPdf}
                disabled={client.id ? false : true}
              >
                Pre-Factura
              </Button>
            )}
          </ToPdf>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateOrder;
