import React from 'react';
import './withSpinner.css';
const WithSpinner = (WrappedComponent) => {

    const spinner = ({ isLoading, ...otherProps }) => {

        return (isLoading ? (
            <div className="spinnerOverlay">
                <div className="spinnerContainer"></div>
            </div>
        ):
        (
            <WrappedComponent {...otherProps}/>
        )
        )
    }

    return spinner;
}

export default WithSpinner;