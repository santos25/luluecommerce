import React from 'react';
import logo from "./lulu.png";

const Nav = () => {
    return (
        <nav className="flex justify-end items-center bg-white w-full fixed">
            <img className="w-auto h-16  mr-auto ml-32" src={logo} alt="Lulu Logo" />
            <ul className="inline-flex mr-auto ">
                <li className="mx-6"><a className="underline" href="#tiendas">MUJER</a></li>
                <li className="mx-6"><a className="underline" href="#ropa">HOMBRE</a></li>
                <li className="mx-6"><a className="underline" href="#zapatos">ZAPATOS</a></li>
                <li className="mx-6"><a className="underline" href="#maquillaje">MAQUILLAJE</a></li>
            </ul>
            <button className="mr-8 border-double border-4 p-2 rounded-lg"> Iniciar Sesion</button>
        </nav>
    );
}

export default Nav;