import React from 'react';
import Button from '@material-ui/core/Button';
import {useAuth0} from '@auth0/auth0-react';

//Button for login in the app

export default function LoginButton () {
    const {loginWithRedirect} = useAuth0();
    return <Button variant="outlined" color="primary" onClick={() => loginWithRedirect()}>Login</Button>;
}