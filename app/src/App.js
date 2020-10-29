import React, {Component, useEffect, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import SmsIcon from '@material-ui/icons/Sms';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Chart from "react-google-charts";
import Chatbox from './chatbox';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import ReactCardCarousel from 'react-card-carousel';
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
  const [displayCards, setDisplay] = useState(false);
  const [displayChat, setDisplayChat] = useState(false);
  let history = useHistory();

  const viewCourses = () => {
    setDisplay(!displayCards);
  }

  const viewChat = () => {
    setDisplayChat(!displayChat);
  }

  if(!isAuthenticated){
    history.push("/");
  } else {
    return(
      <div style={{marginTop: '10px'}}>
        <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
          <Grid item xs={12} lg={7}>
            <Paper style={{padding: '20px'}}>
              <Grid container direction="column" justify="center" alignItems="center">
                <Avatar className="large-avatar" alt="Roberto Yoc" src="https://www.flaticon.com/svg/static/icons/svg/2922/2922506.svg" />
                <h3 style={{color: 'dimgrey'}}>Roberto Carlos Yoc Ramirez</h3>
                <p style={{textAlign: 'justify'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus lorem ut lorem efficitur, 
                  sit amet eleifend nisi tincidunt. Proin cursus pretium augue. Duis at ultrices leo. In consectetur, 
                  justo non pulvinar iaculis, dolor libero ultrices augue, faucibus tempor nibh tortor vitae justo. 
                  Curabitur efficitur facilisis semper. Vestibulum egestas dictum eros eu facilisis. Fusce ipsum nisi, 
                  fringilla quis mauris in, vestibulum consectetur nisi. Ut a neque lorem. Nam fermentum eleifend nulla, 
                  quis semper enim pharetra vel. Vivamus fermentum fringilla efficitur.</p>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} lg={7}>
            <Paper className="paper-main">
              <Grid container direction="column" justify="center" alignItems="center">
                <ChartProgramming />
                <Button className="margin-btn" variant="outlined" color="primary" onClick={viewCourses}>
                  Ver Cursos
                </Button>
                <IconButton 
                  aria-label="delete" 
                  style={{display: !displayChat ? 'block': 'none', position: 'fixed', bottom: 0, right: 0, zIndex: 999, color: 'white'}}
                  onClick={viewChat}
                >
                  <SmsIcon fontSize="large" />
                </IconButton>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <div style={{display: displayChat ? 'block': 'none'}}>
          <Chatbox user={user.nickname} close={viewChat} />
        </div>
        <div className="full-view" style={{display: displayCards? 'block': 'none'}}>
          <Courses />
        </div>
        <IconButton 
          aria-label="delete" 
          style={{display: displayCards ? 'block': 'none', position: 'fixed', bottom: 0, zIndex: 999, color: 'red', width: '100vw'}}
          onClick={viewCourses}
        >
          <CancelIcon fontSize="large" />
        </IconButton>
      </div>
    );
  }
}

function Courses() {
  let displayCards = false;
  return(
    <ReactCardCarousel style={{display: displayCards===true? 'block': 'none' }} autoplay={ true } autoplay_speed={ 4000 }>
      <div className="card-carousel react-card">
        <h3>Start your React Course Now</h3>
        <img src="https://lh3.googleusercontent.com/proxy/Iigt7CHuhfUrgtx0uiX-GzaiTvd9ymxkMR84UG_qpJ8MewT3Ys399HSxo3rMm06aaKhq8GA1lFsak1Qgpc35URyDxBDHzsDZ2nCn5NhZYLbuCy6KmaMWZwDcdYRj3Bl2H7qHX2OCOnQ3WedC2YkIFBtFL0cbHWC0" width="100%" />
        <Link to="/course"><Button variant="outlined" color="primary">Enroll Course</Button></Link>
      </div>
      <div className="card-carousel angular-card">
        <h3>Start your Angular Course Now</h3>
        <img src="https://angular.io/assets/images/logos/angularjs/AngularJS-Shield.svg" width="100%" />
        <Link to="/course"><Button variant="outlined" color="primary">Enroll Course</Button></Link>
      </div>
      <div className="card-carousel aws-card">
        <h3>Start your AWS Course Now</h3>
        <img src="https://i1.wp.com/elementi.me/wp-content/uploads/2019/12/AWS-white-logo.png?fit=200%2C200&ssl=1" width="100%" />
        <Link to="/course"><Button variant="outlined" color="primary">Enroll Course</Button></Link>
      </div>
      <div className="card-carousel python-card">
        <h3>Start your Python Course Now</h3>
        <img src="https://cdn.freebiesupply.com/logos/large/2x/python-5-logo-svg-vector.svg" width="100%" />
        <Link to="/course"><Button variant="outlined" color="primary">Enroll Course</Button></Link>
      </div>
      <div className="card-carousel javascript-card">
        <h3>Start your javascript Course Now</h3>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Unofficial_JavaScript_logo.svg/480px-Unofficial_JavaScript_logo.svg.png" width="100%" />
        <Link to="/course"><Button variant="outlined" color="primary">Enroll Course</Button></Link>
      </div>
      <div className="card-carousel html-card">
        <h3>Start your HTML Course Now</h3>
        <img src="https://www.w3.org/html/logo/downloads/HTML5_1Color_White.svg" width="100%" />
        <Link to="/course"><Button variant="outlined" color="primary">Enroll Course</Button></Link>
      </div>
      <div className="card-carousel design-card">
        <h3>Start your Web Design Course Now</h3>
        <img src="https://www.flaticon.com/svg/static/icons/svg/3437/3437294.svg" width="100%" />
        <Link to="/course"><Button variant="outlined" color="primary">Enroll Course</Button></Link>
      </div>
      <div className="card-carousel docker-card">
        <h3>Start your Docker Course Now</h3>
        <img src="https://www.docker.com/sites/default/files/d8/2019-07/Docker-Logo-White-RGB_Vertical.png" width="100%" />
        <Link to="/course"><Button variant="outlined" color="primary">Enroll Course</Button></Link>
      </div>
    </ReactCardCarousel>
  );
}

function ChartProgramming() {
  const data = [
    ["Language", "Numbers of jobs"],
    ["Python", 19000],
    ["Javascript", 24000],
    ["Java", 20000],
    ["C", 18000],
    ["Go", 1500]
  ];
  const options = {
    title: "Most popular programming language",
    pieHole: 0.4,
    is3D: false
  };

  return(
    <Chart
      chartType="PieChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}

function Menu() {
  const {user, isAuthenticated, isLoading} = useAuth0();
  return(
    <AppBar position="static" style={{backgroundColor: 'white', color: 'black', marginBottom: '15px'}}>
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>
            Robertoyoc.com
          </Typography>
          {isAuthenticated && (
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <Link to="/main" style={{margin: '0', color: 'black'}}>
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

function CourseDetail() {
  return(
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} lg={6}>
          <Paper>
            <Grid container direction="column" justify="center" alignItems="center">
              <Grid item xs={12}>
                <img src="https://lh3.googleusercontent.com/proxy/Iigt7CHuhfUrgtx0uiX-GzaiTvd9ymxkMR84UG_qpJ8MewT3Ys399HSxo3rMm06aaKhq8GA1lFsak1Qgpc35URyDxBDHzsDZ2nCn5NhZYLbuCy6KmaMWZwDcdYRj3Bl2H7qHX2OCOnQ3WedC2YkIFBtFL0cbHWC0" />
                <p style={{textAlign: 'justify'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus lorem ut lorem efficitur, 
                  sit amet eleifend nisi tincidunt. Proin cursus pretium augue. Duis at ultrices leo. In consectetur, 
                  justo non pulvinar iaculis, dolor libero ultrices augue, faucibus tempor nibh tortor vitae justo. 
                  Curabitur efficitur facilisis semper. Vestibulum egestas dictum eros eu facilisis. Fusce ipsum nisi, 
                  fringilla quis mauris in, vestibulum consectetur nisi. Ut a neque lorem. Nam fermentum eleifend nulla, 
                  quis semper enim pharetra vel. Vivamus fermentum fringilla efficitur.</p>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

function Profile() {
  let history = useHistory();
  const {user, isAuthenticated, isLoading} = useAuth0();
  console.log(user);
  return isAuthenticated ? (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} lg={6}>
          <Paper>
            <Grid container direction="column" justify="center" alignItems="center">
              <Avatar className="large-avatar" alt={user.name} src={user.picture} style={{margin: '0 10px'}} />
              <h3>{user.name}</h3>
              <p style={{color: 'grey'}}>Begginer</p>
              <span>Courses Enrolled: </span>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  ): 
  (<div>
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12} lg={6}>
        <Paper>
          <Grid container direction="column" justify="center" alignItems="center">
            <p>Please login:</p>
            <LoginButton />
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  </div>);
}

export default function App() {
  return(
    <Router>
      <Menu />
      <Route path="/" exact={true} component={Login} />
      <Route path="/main" component={Main} />
      <Route path="/course" component={CourseDetail} />
      <Route path="/profile" component={Profile} />
    </Router>
  );
}