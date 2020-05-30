import React from 'react';
import FirmInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import {signInWithGoogle} from '../../FireBase/FireBaseUtil';

class SignInComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  handleInputs = (e) => {
    const { name , value} = e.target;

    this.setState({ [name] : value});
  }

  handleSignIn = (e) => {
      e.preventDefault();

      this.setState({ username : '', password : ''})
  }

  render() {
    console.log(this.props);
    
    return (
      <div className="flex justify-center">
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <FirmInput onChange={this.handleInputs} label="Usuario" id="username" name='username' type="text" placeholder="Usuario" />
            </div>
            <div className="mb-6">
              <FirmInput label="Contraseña" onChange={this.handleInputs} id="password" name="password" type="password" placeholder="******************" />
              <p className="text-red-500 text-xs italic">Please choose a password.</p>
            </div>
            <div className="flex items-center justify-between">
              <Button type="submit" onClick={this.handleSignIn}>Iniciar Sesion</Button>

              <Button type="button" onClick={signInWithGoogle}>Google</Button>
              
            </div>
          </form>
        </div>
      </div>

    );

  }

}


export default SignInComponent;