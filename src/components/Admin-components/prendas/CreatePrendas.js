import React, { useState, useEffect } from "react";
//redux
//actions

//components
import HandleRegisterPrenda from "./HandleRegisterPrenda";

import { firestore } from "../../../FireBase/FireBaseUtil";

const CreatePrendas = ({ categorias }) => {
  const [step, setSteps] = useState(0);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);
  let [prendasitems, setPrendasItems] = useState([
    { name: "", typetalla: "", image: "" },
  ]);
  const [tallas, setTallas] = useState([]);

  useEffect(() => {
    const collectionsRef = firestore.collection("tallas");
    collectionsRef.get().then((snapshot) => {
      const arrayvalues = snapshot.docs.map((doc) => ({
        id: doc.id,
        value: doc.data().name,
      }));
      console.log(arrayvalues);
      setTallas(arrayvalues);
    });
  }, []);

  const savePrenda = () => {
    console.log("Save prenda");
    const newprendasRef = firestore.collection("genre").doc("mujer");

    console.log(prendasitems);
    console.log(categorias);
    const newValues = [...categorias[category], ...prendasitems];
    console.log(newValues);
    newprendasRef.update({
      [`categorias.${category}`]: newValues,
    });
    // let batch = firestore.batch();
    // prendasitems.forEach((prenda) => {
    //   const newDocPrendaRef = newprendasRef.doc();
    //   batch.set(newDocPrendaRef, prenda);
    // });

    // batch.commit();
  };

  return (
    <HandleRegisterPrenda
      categorias={categorias}
      quantity={quantity}
      setQuantity={setQuantity}
      prendasitems={prendasitems}
      setPrendasItems={setPrendasItems}
      tallavalues={tallas}
      savePrenda={savePrenda}
      category={category}
      handleCategory={(e) => setCategory(e.target.value)}
    />
  );
};

// const mapDispatchToState = (dispatch) => ({
//     fetchTallas : () => dispatch(fetchingTallasAsync())
// })

export default CreatePrendas;
