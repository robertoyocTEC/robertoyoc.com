import React, {useState, useEffect} from 'react';

//Material Components
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
const axios = require('axios');


export default function CourseDetail(props) {
  //Store course info
  const [course, setCourse] = useState({});

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

  return(
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} lg={6}>
          <Paper style={{padding: '20px', backgroundColor: course.bg, color: 'white'}}>
            <Grid container direction="column" justify="center" alignItems="center">
              <h3>{course.name}</h3>
              <img src={course.image} />
              <p style={{textAlign: 'justify'}}>{course.description}</p>
              <Button variant="outlined" color="primary" style={{color: 'white', border: '1px solid white'}}>
                Start Course
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}