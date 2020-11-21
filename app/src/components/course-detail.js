import React, {useState, useEffect} from 'react';

//Material Components
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import MovieIcon from '@material-ui/icons/Movie';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import '../course.css';
const axios = require('axios');


export default function CourseDetail(props) {
  //Store course info
  const [course, setCourse] = useState({});
  const [started, setStart] = useState(false);

  //Fetch data
  useEffect(() => {
    axios.get(`http://127.0.0.1:5002/course?id=${props.match.params.id}`)
    .then(res => {
      setCourse(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  const startCourse = () => {
    setStart(true);
  }
 
  return(
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} lg={6}>
          <Paper style={{padding: '20px', backgroundColor: course.bg, color: 'white'}}>
            <Grid container direction="column" justify="center" alignItems="center">
              <h1>{course.name}</h1>
              <img src={course.image} />
              <p style={{textAlign: 'justify'}}>{course.description}</p>
              {!started && 
                <Button variant="outlined" onClick={startCourse} color="primary" style={{color: 'white', border: '1px solid white'}}>
                  Start Course
                </Button>
              }
              {started && 
                <div className="full-width">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Section 1</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense={false} className="full-width">
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <MovieIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Lection 1"
                            secondary="Fundamentals"
                          />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="play">
                              <PlayCircleOutlineIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <MovieIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Lection 2"
                            secondary="Sintax"
                          />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="play">
                              <PlayCircleOutlineIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Section 2</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense={true} className="full-width">
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <MovieIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Lection 1"
                            secondary="Conditionals"
                          />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="play">
                              <PlayCircleOutlineIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <MovieIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Lection 2"
                            secondary="Switch"
                          />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="play">
                              <PlayCircleOutlineIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </div>
              }
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}