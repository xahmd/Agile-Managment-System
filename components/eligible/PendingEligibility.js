import React from 'react';
import {Avatar, Button, Container, Typography} from '@material-ui/core';
import {usePendingStyles} from "../../src/material-styles/pending-page";
import {signout} from "../../auth";

const PendingEligibility = () => {
  const classes = usePendingStyles();
  return (
    <div>
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <Avatar alt="fk-LOGO" src="/static/avatar/fk.png" className={classes.avatar}/>
          <Typography paragraph className={classes.message}>  
            Please Wait while we Check your Eligibility
          </Typography>
          <Typography paragraph className={classes.message2}>  
          You will recieve a notification once you have been approved.
          </Typography>
          <Button variant='contained' color='primary' onClick={() => signout()}>
            Logout
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default PendingEligibility;