import React, {useState, useEffect} from 'react';

//Component for Authorization Auth0
import {useAuth0} from '@auth0/auth0-react';

//Material Components
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import SmsIcon from '@material-ui/icons/Sms';

//Component fro display charts
import Chart from "react-google-charts";

//Component for display courses ub cards
import ReactCardCarousel from 'react-card-carousel';

//Component for display chat with watson
import Chatbox from './chatbox';

//Navigate into app
import {
    useHistory
  } from "react-router-dom";

import '../main.css';
const axios = require('axios');

export default function Main() {
  //Recover data from Auth0
    const {user, isAuthenticated} = useAuth0();
    //Decide if cards courses going to be displayed
    const [displayCards, setDisplay] = useState(false);
    //Decide if chat going to be displayed
    const [displayChat, setDisplayChat] = useState(false);
    //Store data of courses
    const [courses, setCourse] = useState([]);

    //Graph data
    const data = [
        ["Language", "Numbers of jobs"],
        ["Python", 19000],
        ["Javascript", 24000],
        ["Java", 20000],
        ["C", 18000],
        ["Go", 1500]
    ];

    //Graph options for display
    const options = {
        title: "Most popular programming language",
        pieHole: 0.4,
        is3D: false
    };

    //Navigate in app
    let history = useHistory();

    //Fetch data
    useEffect(() => {
      console.log(user);
      axios.get('http://127.0.0.1:5002/courses')
      .then(res => {
        console.log(res.data);
        setCourse(res.data);
      })
      .catch(err => console.log(err));
    }, []);
  
    //Enroll course for users
    const enroll = (id) => {
      axios.post('http://127.0.0.1:5002/enrolls', {
        user: user.nickname,
        course: id
      })
      .then(res => {
        console.log(res);
        history.push(`/course/${id}`);
      })
      .catch(err => {
        console.log(err);
      });
    }
  
    //Manage if you want to display courses
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
                <Chart
                  chartType="PieChart"
                  width="100%"
                  height="400px"
                  data={data}
                  options={options}
                />
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
          <ReactCardCarousel style={{display: displayCards===true? 'block': 'none' }} autoplay={ true } autoplay_speed={ 4000 }>
            {courses.map((course, index) => {
              return (
                <div className="card-carousel" style={{background: course.bg}}>
                  <h3>Start your {course.name} Course Now</h3>
                  <img src={course.image} width="100%" />
                  <Button className="btn-white-outline" variant="outlined" color="primary" style={{color: 'white', border: '1px solid white'}} onClick={() => enroll(course.course_id)}>Enroll Course</Button>
                </div>
              );
            })}
          </ReactCardCarousel>
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