import {Container, Grid, Typography, Button, Avatar} from '@material-ui/core';
import LandingPageLayout from "../components/Layouts/LandingPageLayout";
import {withLandingAuthSync} from "../components/routers/landingAuth";
import {makeStyles} from "@material-ui/styles";
import CopyrightComponent from "../components/CopyrightComponent";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useEffect} from "react";
import Link from 'next/link';
// import {Facebook, LinkedIn, GitHub} from '@material-ui/icons'
// import {serverUrl} from "../utils/config";

const useStyles = makeStyles(theme => ({
  textContainer: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

  },
  mainTitle: {
    marginBottom: theme.spacing(2),
    fontWeight: 500,
    fontSize: '2.75rem'
  },
  textRightContainer: {
    marginLeft: theme.spacing(0),
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2),
      marginLeft: theme.spacing(10),
    },
  },
  image: {
    maxWidth: '90%',
    padding: theme.spacing(2)
  },
  firstHeadingContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(5)
  },
  margin: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10)
  },

  developerDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  avatar: {
    width: 150,
    height: 150,
    marginBottom: theme.spacing(2)
  },
  developerHeading: {
    textAlign: 'center',
    marginBottom: theme.spacing(5)
  },
  socialLinks: {
    textDecoration: 'none',
    color: "inherit",
    '&:hover': {
      color: theme.palette.primary.dark,
      'transition': 'all 0.2s ease',
      '& svg': {
        'transform': 'scale(1.1)',
        'transition': 'all 0.3s ease',
      }

    }
  }
}));
const Index = () => {
  const landingClasses = useStyles();
  useEffect(() => {
    if (AOS.refresh() === undefined) {
      AOS.init({
        offset: 200,
        duration: 600,
        easing: 'ease-in-sine',
        delay: 100,
      });
    }
  }, [])
  return (
    <LandingPageLayout>
      <Container style={{overflow: 'hidden'}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5} className={landingClasses.textContainer}>
            <div className={landingClasses.textRightContainer}>
              <Typography variant='h5' color='textPrimary' className={landingClasses.mainTitle}>
              Your new gate to a world of digital FYP Projects
              </Typography>
              <Link href='/student/sign-up'>
                <Button variant='contained' color='primary'>Start Now</Button>
              </Link>
            </div>
          </Grid>
          <Grid item xs={12} sm={7} className={landingClasses.textContainer}>
            <img src='/static/avatar/data-points.png' alt='im1' className={landingClasses.image}/>
          </Grid>
          <Grid item xs={12} sm={7} className={landingClasses.textContainer}>
            <img src='/static/avatar/frontImage2.png' alt='im2' className={landingClasses.image}/>
          </Grid>
          <Grid item xs={12} sm={5} className={landingClasses.textContainer}>
            <div className={landingClasses.firstHeadingContainer}>
              <Typography variant='h6' color='textPrimary'>Propose</Typography>
              <Typography variant='subtitle1' color='textPrimary'>Propose your innovative idea and start building
                it</Typography>
            </div>
            <div>
              <Typography variant='h6' color='textPrimary'>Plan</Typography>
              <Typography variant='subtitle1' color='textPrimary'>Create User Stories, plan sprints and distribute
                tasks</Typography>
            </div>

          </Grid>

          <Grid item xs={12} sm={5} className={landingClasses.textContainer} data-aos="fade-left">
            <div className={landingClasses.textRightContainer}>
              <div className={landingClasses.firstHeadingContainer}>
                <Typography variant='h6' color='textPrimary'>Track</Typography>
                <Typography variant='subtitle1' color='textPrimary'>Prioritize and discuss your work with complete
                  visibility</Typography>
              </div>
              <div>
                <Typography variant='h6' color='textPrimary'>Report</Typography>
                <Typography variant='subtitle1' color='textPrimary'>Improve your performance based on visual data that
                  you can put to use.</Typography>
              </div>
            </div>


          </Grid>
          <Grid item xs={12} sm={7} className={landingClasses.textContainer} data-aos="fade-left">
            <img src='/static/avatar/frontImage3.png' alt='IM3' className={landingClasses.image}/>
          </Grid>
        </Grid>
 
        <CopyrightComponent/>
      </Container>
    </LandingPageLayout>
  );
};


export default withLandingAuthSync(Index);
