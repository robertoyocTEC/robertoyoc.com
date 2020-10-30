import React from 'react';

//Buttons for Login and Logout
import LoginButton from './login-button';
import LogoutButton from './logout-button';

//Material components
import Avatar from '@material-ui/core/Avatar';
import {useAuth0} from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
    Link,
    useHistory
  } from "react-router-dom";
import '../main.css';

export default function Init() {
  //Recover data from Auth0
    const {user, isAuthenticated} = useAuth0();

    return isAuthenticated? (
      <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12}>
              <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                <Avatar className="large-avatar" alt={user.name} src={user.picture} />
                <h4>Welcome {user.name}</h4>
                <Link to="/main">
                    <Button variant="contained">Go to Main</Button>
                </Link>
                <LogoutButton />
              </Grid>
          </Grid>
      </Grid>
    ): (
      <Grid container direction="column" justify="center" alignItems="center">
        <h3>Please Login</h3>
        <LoginButton />
      </Grid>
    )
  }