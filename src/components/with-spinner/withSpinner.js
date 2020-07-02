import React from 'react';

import {
    CircularProgress
} from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         '& > * + *': {
//             marginLeft: theme.spacing(2),
//         },
//     },
// }));


const WithSpinner = (WrappedComponent) => {

    const spinner = ({ isLoading, ...otherProps }) => {

        return (isLoading ? (
            <div className="">
                <CircularProgress />
            </div>
        ) :
            (
                <WrappedComponent {...otherProps} />
            )
        )
    }

    return spinner;
}

export default WithSpinner;