import React from 'react';
import Button from '@material-ui/core/Button';
import {useAuth0} from '@auth0/auth0-react';

//Button for logout in the app

export default function LogoutButton() {
    const {logout} = useAuth0();
    return <Button variant="outlined" color="secondary" onClick={() => logout({returnTo: window.location.origin})}>Logout</Button>
}