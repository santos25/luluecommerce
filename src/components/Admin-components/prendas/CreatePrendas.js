import React, { useState, useEffect } from 'react'
//redux
import { connect } from 'react-redux'
//actions
import { fetchingTallasAsync } from '../../../Redux/Admin/prendas/prendas.actions'

//components
import HandleRegisterPrenda from './HandleRegisterPrenda'

import { firestore } from '../../../FireBase/FireBaseUtil'
import {
    Grid,
    Box,
    Button,
    Typography,
    Container,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    TextField
} from '@material-ui/core';

// const HandleGenrePrenda = ({ setStep, setGenre, genre }) => {

//     return (
//         <Container maxWidth="sm">
//             <Grid container>
//                 <Grid xs={12} item>
//                     <FormControl fullWidth>
//                         <InputLabel id="select-genre">Seleccion Genero</InputLabel>
//                         <Select
//                             labelId="select-genre"
//                             id="genre"
//                             value={genre}
//                             name="genre"
//                             onChange={(e) => setGenre(e.target.value)}
//                         >
//                             <MenuItem value="mujer">Mujer</MenuItem>
//                             <MenuItem value="hombre">Hombre</MenuItem>
//                         </Select>
//                     </FormControl>
//                 </Grid>
//                 <Grid xs={12} item>
//                     <Button
//                         onClick={() => setStep(1)}
//                         // fullWidth
//                         variant="contained"
//                         color="primary"
//                     >
//                         Siguiente
//                             </Button>
//                 </Grid>
//             </Grid>
//         </Container>
//     )
// }


const CreatePrendas = () => {
    const [step, setSteps] = useState(0);
    const [genre, setGenre] = useState('');
    const [quantity, setQuantity] = useState(1);
    let [prendasitems, setPrendasItems] = useState([{ name: '', typetalla: '' }]);
    const [tallas, setTallas] = useState([]);

    useEffect(() => {
        const collectionsRef = firestore.collection('tallas');
        collectionsRef.get().then((snapshot) => {
            const arrayvalues = snapshot.docs.map(doc => ({ id: doc.id, value: doc.data().name }))
            console.log(arrayvalues);
            setTallas(arrayvalues)
        })
    }, [])


    const savePrenda = () => {
        console.log("Save prenda");
        const newprendasRef = firestore.collection("genre").doc(genre).collection("prendas");
        let batch = firestore.batch();
        prendasitems.forEach(prenda => {
            const newDocPrendaRef = newprendasRef.doc();
            batch.set(newDocPrendaRef, prenda)
        })

        batch.commit();

    }
    // const renderCreatePrendas = () => {

    //     switch (step) {
    //         case 0:
    //             return <HandleGenrePrenda  setStep={setSteps} />
    //         case 1:
    //             return <HandleRegisterPrenda
    //                 quantity={quantity}
    //                 setQuantity={setQuantity}
    //                 prendasitems={prendasitems}
    //                 setPrendasItems={setPrendasItems}
    //                 tallavalues={tallas}
    //                 savePrenda={savePrenda}
    //                 setGenre={setGenre} 
    //                 genre={genre} />
    //         default:
    //             break;
    //     }
    // }


    return (
        <HandleRegisterPrenda
            quantity={quantity}
            setQuantity={setQuantity}
            prendasitems={prendasitems}
            setPrendasItems={setPrendasItems}
            tallavalues={tallas}
            savePrenda={savePrenda}
            setGenre={setGenre}
            genre={genre} />
    )

}

// const mapDispatchToState = (dispatch) => ({
//     fetchTallas : () => dispatch(fetchingTallasAsync())
// })

export default connect(null, null)(CreatePrendas)
