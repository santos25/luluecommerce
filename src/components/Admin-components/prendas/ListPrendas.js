import React, { useState } from 'react'

import CreatePrendas from './CreatePrendas';
import {
    Grid,
    Box,
    Button,
    Typography
} from '@material-ui/core';
const ListPrendas = () => {
    const [currentpage, setCurrentPage] = useState('home');

    return (
        currentpage === 'home' ? (
            <Box>
                <Grid container>
                    <Grid xs={12} item container display="flex" direction="column" alignContent="center" >
                        <Typography component="h4"> PRENDAS REGISTRADAS EN EL SISTEMA</Typography>

                        <Button
                            onClick={() => setCurrentPage('create')}
                            variant="outlined"
                            color="primary"
                            size="small"
                        >
                            Agregar Prenda
                                            </Button>
                    </Grid>

                </Grid>
            </Box>
        )
            :
            (
                <CreatePrendas />
            )
    )


}

export default ListPrendas
