import React from 'react';

const InputField = ({id , label, ...otherProperties}) => {

    return (
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>{label}</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id={id}
            {...otherProperties} />
        </div>
    )
}

export default InputField;