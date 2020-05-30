import React from 'react';
import FirmInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import { auth , createDocumentUserDb } from '../../FireBase/FireBaseUtil';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            repassword: ''
        }
    }

    handleInputs = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    handleSignIn = async (e) => {
        e.preventDefault();
        if (this.state.password === this.state.repassword) {
            const { email, password , displayName } = this.state;
            const { user }  = await auth.createUserWithEmailAndPassword(email, password);
            createDocumentUserDb(user,{displayName} )
        } else {
            alert("Contraseñas no Coinciden");
        }
        //   this.setState({ username : '', password : ''})
    }

    render() {
        return (
            <div className="flex justify-center">
                <div className="w-full max-w-xs">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={this.handleSignIn}>
                        <div className="mb-4">
                            <FirmInput onChange={this.handleInputs} label="Usuario" id="displayName" name='displayName' type="text" placeholder="Usuario" />
                        </div>
                        <div className="mb-4">
                            <FirmInput onChange={this.handleInputs} label="Email" id="email" name='email' type="email" placeholder="Email" />
                        </div>
                        <div className="mb-6">
                            <FirmInput label="Contraseña" onChange={this.handleInputs} id="pass" name="password" type="password" placeholder="******************" />
                            <p className="text-red-500 text-xs italic">Please choose a password.</p>
                        </div>
                        <div className="mb-6">
                            <FirmInput label="Repetir Contraseña" onChange={this.handleInputs} id="repeat" name="repassword" type="password" placeholder="******************" />
                            <p className="text-red-500 text-xs italic">Please choose a password.</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <Button type="submit" >Iniciar Sesion</Button>
                        </div>
                    </form>
                </div>
            </div>

        );

    }

}


export default SignUp;