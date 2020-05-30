import React from 'react';

const Button = ({children, ...otherProperties}) => {

    return (
        <div>
           <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-1 rounded focus:outline-none focus:shadow-outline"  {...otherProperties}>
                {children}
            </button>
        </div>
    )
}

export default Button;