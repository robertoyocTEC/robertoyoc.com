import React, {useState, useEffect} from 'react';

//Auth0 for Authorization
import {useAuth0} from '@auth0/auth0-react';

//Material Framework Component
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

//Component for Login with Auth0
import LoginButton from './login-button';

import '../App.css';

const axios = require('axios');

//Component for display Profile
export default function Profile() {
  //Obtain data from Auth0
  const {user, isAuthenticated} = useAuth0();
  //Manage Level of the user
  const [status, setStatus] = useState('Beginner');
  //Manage courses that user has been enrolled
  const [courses, setCourses] = useState([]);

  //Function for fetch data before inicialization
  useEffect(() => {
    axios.get(`http://127.0.0.1:5002/enrolls?id=${user.nickname}`)
    .then(res => {
      setCourses(res.data);
      //Decide level
      if(res.data.length < 3) {
        setStatus('Beginner');
      } else if (res.data.length >= 3 && res.data.length < 6) {
        setStatus('Advanced');
      } else if(res.data.length >= 6) {
        setStatus('Expert');
      }
    })
    .catch(err => {
      console.log(err);
    });
  },[]);

  //If user is logged display info, otherwise have to login
  return isAuthenticated ? (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} lg={6}>
          <Paper>
            <Grid container direction="column" justify="center" alignItems="center">
              <Avatar className="large-avatar" alt={user.name} src={user.picture} style={{margin: '0 10px'}} />
              <h3>{user.name}</h3>
              <p style={{color: 'grey'}}>{status}</p>
              <span>Courses Enrolled: </span>
              <List className="auto-width">
                {courses.map((course, index) => {
                  return(
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <Avatar alt={course.name} src={course.image} style={{backgroundColor: course.bg}} />
                        </ListItemAvatar>
                        <ListItemText primary={course.name} style={{marginRight: '25px'}} />
                          <ListItemSecondaryAction>
                            <Box position="relative" display="inline-flex">
                              <CircularProgress variant="static" value={50} color="primary" />
                              <Box
                                top={0}
                                left={0}
                                bottom={0}
                                right={0}
                                position="absolute"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Typography variant="caption" component="div" color="textSecondary">{`50%`}</Typography>
                              </Box>
                            </Box>
                          </ListItemSecondaryAction>
                      </ListItem>
                  );
                })}
              </List>
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