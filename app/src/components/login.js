import React from 'react';
//Material Components
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Init from './init';
import '../main.css';

export default function Login() {

    return(
      <div className="main">
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} lg={6}>
            <Paper className="paper-main">
              <Grid container direction="column" justify="center" alignItems="center">
                <Grid item xs={12}>
                  <h3>Welcome to robertoyoc.com</h3>
                  <Init />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }