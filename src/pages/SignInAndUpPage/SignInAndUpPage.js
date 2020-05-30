import React from 'react';
import SignInComponent from '../../components/SignInComponent/SignInComponent';
import SignUp from '../../components/SignUpComponent/SignUp';

const SignInAndUpPage = (props) => {

    return (
            <div className="flex justify-center">
                <SignInComponent/>
                <SignUp/>
            </div>
               
        
    );
}

export default SignInAndUpPage;