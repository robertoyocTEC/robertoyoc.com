import React from 'react';

//Auth0 components for Login and Logout
import {useAuth0} from '@auth0/auth0-react';
import LogoutButton from './logout-button';
import LoginButton from './login-button';

//Material Framework Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

//Link for navigate as ancore(a)
import { Link } from "react-router-dom";

export default function Menu() {
  //Recover data from auth0
    const {user, isAuthenticated} = useAuth0();
    return(
      <AppBar position="static" style={{backgroundColor: 'white', color: 'black', marginBottom: '15px'}}>
          <Toolbar>
              <Typography variant="h6" style={{flexGrow: 1}}>
                Robertoyoc.com
              </Typography>
            {isAuthenticated && (
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <Link to="/" style={{margin: '0', color: 'black'}}>
                  <Button color="inherit">Main</Button>
                </Link>
                <Link to="/profile" style={{margin: '0'}}>
                  <Avatar alt={user.name} src={user.picture} style={{margin: '0 10px'}} />
                </Link>
                <LogoutButton />
              </div>
            )}
            {isAuthenticated === false && (
              <LoginButton />
            )}
          </Toolbar>
        </AppBar>
    );
  }
  