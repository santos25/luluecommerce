import React from 'react';
import logo from "./lulu.png";
import { Link } from 'react-router-dom';
import { auth } from '../../FireBase/FireBaseUtil';
import { connect } from 'react-redux';
import { currentUserSelector } from '../../Redux/user/user-selectors';
import { hiddeCartSelector } from '../../Redux/Cart/cart-selectors';

import CartIconComponent from '../Cart-Icon/car-icon.component';
import CartDropdown from '../Card-Dropdown/card-dropdown';

const Nav = ({ currentUser , hidden}) => {
    // console.log({ currentUser, hidden });

    return (
        <div>
            <nav className="flex justify-end items-center bg-white w-full ">
                <Link to='/'><img className="w-auto h-16  mr-auto ml-32" src={logo} alt="Lulu Logo" /></Link>
                <ul className="inline-flex mr-auto ">
                    <li className="mx-6 underline">
                        <Link to='/mujer'> MUJER</Link>
                    </li>
                    <li className="mx-6 underline">
                        <Link to='/hombre'> HOMBRE</Link>
                    </li>

                </ul>
                {
                    currentUser ? (
                        <button className="mr-8 border-double border-4 p-2 rounded-lg" onClick={() => { auth.signOut(); }}>
                            Sign Out
                        </button>
                    ) :
                        (
                            <button className="mr-8 border-double border-4 p-2 rounded-lg">
                                <Link to='/signin'> Iniciar Sesion </Link>
                            </button>
                        )
                }
                <CartIconComponent />
            </nav>
            {hidden ? null : <CartDropdown />}
        </div>

    );
}

const mapStatetoProps = (state) => ({
    currentUser: currentUserSelector(state),
    hidden : hiddeCartSelector(state)
})


export default connect(mapStatetoProps)(Nav);