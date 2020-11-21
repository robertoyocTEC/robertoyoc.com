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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EmailIcon from '@material-ui/icons/Email';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import swal from 'sweetalert';

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
      if(user){
        console.log('user exists');
        axios.get('http://127.0.0.1:5002/courses')
        .then(res => {
          console.log('all courses: ', res.data);
          axios.get(`http://127.0.0.1:5002/enrolls?id=a01274912`)
          .then(courses => {
            console.log('enrolled courses: ', courses.data);
            const toRender = res.data.filter(course => !courses.data.some(item => item.course_id === course.course_id));
            console.log('courses not enrolled: ', toRender);
            setCourse(toRender);
          }).catch(err => console.log(err));
        })
        .catch(err => console.log(err));
      } else {
        axios.get('http://127.0.0.1:5002/courses')
        .then(res => {
          setCourse(res.data);
        }).catch(err => console.log(err));
      }
      

      

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

    const decideEnroll = (name, id) => {
      swal({
        title: "Are you sure?",
        text: `You will going to enroll to the ${name} course`,
        icon: "info",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal(`Welcome to the ${name} course`, {
            icon: "success",
          })
          .then(() => {
            enroll(id)
          });
        } else {
          swal("You are not enrolled yet");
        }
      });
    }

    const goLogin = () => {
      history.push('/login');
    }
  
    return(
      <div style={{marginTop: '10px'}}>
        <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
          <Grid item xs={12} lg={7}>
            <Grid container direction="row" justify="center" alignItems="flex-start" spacing={2}>
              <Grid item xs={12}>
                <Paper className="card-media">
                  <Avatar className="large-avatar" alt="Roberto Yoc" src="https://media-exp1.licdn.com/dms/image/C4E03AQEOospdVkmrGw/profile-displayphoto-shrink_200_200/0?e=1611187200&v=beta&t=WKqBCWiVe-xwCfk6e-c7-8un7ZRgwYVAlBtbfD51CU0" />
                  <h3 style={{color: 'dimgrey'}}>Roberto Carlos Yoc Ramirez</h3>
                  <p style={{textAlign: 'justify'}}>Perfil tecnológico multidisciplinario. Ha lanzado y administrado 
                  dos empresas: Quesadillas el Güero y Talentics.
                  Estudiante del Tecnológico de Monterrey y parte del programa “Líderes del Mañana”, 
                  ha encontrado su pasión en la intervención social.
                  Con una trayectoria académica sobresaliente y reconocimientos de índole estatal y nacional, 
                  ha buscado transmitir su ímpetu en el estudio a jóvenes estudiantes, razón por la cual comenzó a 
                  desarrollar su primer empresa: Talentics, donde la robótica, electrónica y programación son 
                  los ejes centrales. <br />
                  Talentics fue seleccionada, a través del programa INC Accelerator Seed, como una de las 
                  mejores 50 startups en Latinoamérica, teniendo presencia en INC Mty 2018. Talentics cuenta con un 
                  programa educativo que desarrolla complementos tecno-educativos para brindar a los niños de educación 
                  básica un complemento a su educación. Este programa está enfocado prioritariamente a comunidades con 
                  rezago tecnológico, con el objetivo de disminuir la brecha digital. <br />
                  Diseñó e implementó el programa “Ateny”, plataforma web que conecta casos de éxito estudiantiles con 
                  alumnos de educación básica, dándoles acceso a un mentor que desarrolla un papel inspirador en su 
                  trayectoria estudiantil.
                  En cuanto al ámbito profesional, es desarrollador web en Energyza, empresa mexicana dedicada a la 
                  eficiencia energética. Coordinó el desarrollo de un sistema de monitoreo energético y actualmente 
                  coordina el desarrollo de la segunda versión que contempla clientes como Cinépolis, Starbucks y Elektra. </p>
                  <p>Contacto: </p>
                  <List component="nav" aria-label="main mailbox folders">
                    <a href="mailto:roberto.yoc@talentics.mx" target="_blank">
                      <ListItem button>
                        <ListItemIcon>
                          <EmailIcon />
                        </ListItemIcon>
                        <ListItemText primary="roberto.yoc@talentics.mx" className="font-roboto"/>
                      </ListItem>
                    </a>
                    <a href="https://www.linkedin.com/in/robertoyoc/" target="_blank">
                      <ListItem button>
                        <ListItemIcon>
                          <LinkedInIcon />
                        </ListItemIcon>
                        <ListItemText primary="@robertoyoc" className="font-roboto" />
                      </ListItem>
                    </a>
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className="card-media">
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
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div style={{display: displayChat ? 'block': 'none'}}>
          <Chatbox user={user ? user.nickname : 'guest'} close={viewChat} />
        </div>
        <div className="full-view" style={{display: displayCards? 'block': 'none'}}>
        <ReactCardCarousel style={{display: displayCards===true? 'block': 'none' }} autoplay={ true } autoplay_speed={ 4000 }>
          {courses.map((course, index) => {
            return (
              <div className="card-carousel" style={{background: course.bg}} key={index}>
                <h3>Start your {course.name} Course Now</h3>
                <img src={course.image} width="100%" />
                <Button className="btn-white-outline" variant="outlined" color="primary" style={{color: 'white', border: '1px solid white'}} onClick={() => user ? decideEnroll(course.name, course.course_id) : goLogin()}>Enroll Course</Button>
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