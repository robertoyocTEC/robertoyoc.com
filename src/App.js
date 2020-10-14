import React, {Component} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Chatbox from './chatbox';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import './main.css';

function LoginButton () {
  const {loginWithRedirect} = useAuth0();
  return <Button variant="outlined" color="primary" onClick={() => loginWithRedirect()}>Login</Button>;
}

function LogoutButton() {
  const {logout} = useAuth0();
  return <Button variant="outlined" color="secondary" onClick={() => logout({returnTo: window.location.origin})}>Logout</Button>
}

function Login() {

  function Profile() {
    const {user, isAuthenticated, isLoading} = useAuth0();

    console.log(user);
    console.log(isAuthenticated);

    if(isAuthenticated) {
      console.log(user);
    }

    return isAuthenticated ? (<ToLogout />): (<ToLogin />);
  }

  function ToLogin() {
    return(
      <div className="centering">
        <h3>Please Login</h3>
        <LoginButton />
      </div>
    );
  }

  function ToLogout() {
    const {user} = useAuth0();
    return(
      <div className="centering">
        <Avatar className="large-avatar" alt={user.name} src={user.picture} />
        <h4>Welcome {user.name}</h4>
        <Link to="/main">
          <Button variant="contained">Go to Main</Button>
        </Link>
        <LogoutButton />
      </div>
    );
  }

  return(
    <div className="main">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} lg={6}>
          <Paper className="paper-main">
            <Grid container direction="column" justify="center" alignItems="center">
              <Grid item xs={12}>
                <h3>Welcome to robertoyoc.com</h3>
                <Profile />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

function Main() {
  const {user, isAuthenticated, isLoading} = useAuth0();
  let history = useHistory();
  if(!isAuthenticated){
    history.push("/");
  } else {
    return(
      <div>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} lg={6}>
            <Paper className="paper-main">
              <Grid container direction="column" justify="center" alignItems="center">
                <h3>Welcome {user.name}</h3>
                <LogoutButton />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Chatbox />
      </div>
    );
  }


}

export default function App() {
  return(
    <Router>
      <Route path="/" exact={true} component={Login} />
      <Route path="/main" component={Main} />
    </Router>
  );
}