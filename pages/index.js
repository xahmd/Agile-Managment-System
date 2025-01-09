import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
} from "@material-ui/core";
import LandingPageLayout from "../components/Layouts/LandingPageLayout";
import { withLandingAuthSync } from "../components/routers/landingAuth";
import { makeStyles } from "@material-ui/styles";
import CopyrightComponent from "../components/CopyrightComponent";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const useStyles = makeStyles((theme) => ({
  textContainer: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  mainTitle: {
    marginBottom: theme.spacing(2),
    fontWeight: 500,
    fontSize: "2.75rem",
  },
  image: {
    maxWidth: "90%",
    padding: theme.spacing(2),
  },
  researchGroupCard: {
    margin: theme.spacing(2),
    position: "relative",
    overflow: "hidden",
    borderRadius: theme.shape.borderRadius,
    height: "200px",
  },
  cardImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "brightness(70%)", // Dim the image slightly for contrast
  },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    background: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
    color: "#fff",
    padding: theme.spacing(2),
    textAlign: "center",
  },
  researchGroupTitle: {
    fontWeight: 600,
    fontSize: "1.2rem",
  },
  researchGroupDescription: {
    fontSize: "0.9rem",
    marginTop: theme.spacing(1),
  },
  sectionTitle: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(4),
    fontWeight: 700,
    textAlign: "center",
  },
}));

const researchGroups = [
  { name: "CSRG", description: "Computer System Research Group", background: "https://fk.umpsa.edu.my/images/logoresearchgroup/csrg.png" },
  { name: "VISIC", description: "Virtual Simulation & Computing", background: "https://fk.umpsa.edu.my/images/logoresearchgroup/visic.png" },
  { name: "MIRG", description: "Machine Intelligence Research Group", background: "https://fk.umpsa.edu.my/images/logoresearchgroup/mirg.png" },
  { name: "Cy-SIG", description: "Cyber Security Interest Group", background: "https://fk.umpsa.edu.my/images/logoresearchgroup/cy-sig.png" },
  { name: "SERG", description: "Software Engineering Research Group", background: "https://fk.umpsa.edu.my/images/logoresearchgroup/serg.png" },
  { name: "KECL", description: "Knowledge Engineering & Computational Linguistic", background: "https://fk.umpsa.edu.my/images/logoresearchgroup/kecl.png" },
  { name: "DSSim", description: "Data Science & Simulation Modeling", background: "https://fk.umpsa.edu.my/images/logoresearchgroup/dssim.png" },
  { name: "DBIS", description: "Database Technology & Information System", background: "https://fk.umpsa.edu.my/images/logoresearchgroup/dbis.png" },
  { name: "EDU-TECH", description: "Educational Technology", background: "https://fk.umpsa.edu.my/images/logoresearchgroup/edu-tech.png" },
  { name: "ISP", description: "Image Signal Processing", background: "https://fk.umpsa.edu.my/images/logoresearchgroup/whatsapp-image-2022-06-30-at-3.57.37-pm.jpeg" },
  { name: "CNRG", description: "Computer Network & Research Group", background: "https://fk.umpsa.edu.my/images/logoresearchgroup/cnrg.png" },
  { name: "SCORE", description: "Soft Computing & Optimization", background: "https://fk.umpsa.edu.my/images/logoresearchgroup/score.png" },
];

const Index = () => {
  const classes = useStyles();

  useEffect(() => {
    if (AOS.refresh() === undefined) {
      AOS.init({
        offset: 200,
        duration: 600,
        easing: "ease-in-sine",
        delay: 100,
      });
    }
  }, []);

  return (
    <LandingPageLayout>
      <Container style={{ overflow: "hidden" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5} className={classes.textContainer}>
            <Typography variant="h5" color="textPrimary" className={classes.mainTitle}>
              Your new gate to a world of digital FYP Projects
            </Typography>
            <Button variant="contained" color="primary">
              Start Now
            </Button>
          </Grid>
          <Grid item xs={12} sm={7} className={classes.textContainer}>
            <img src="/static/avatar/data-points.png" alt="im1" className={classes.image} />
          </Grid>
        </Grid>

        {/* Research Groups Section */}
        <Typography variant="h4" className={classes.sectionTitle}>
          Research Groups
        </Typography>

        <Grid container spacing={2}>
          {researchGroups.map((group, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card className={classes.researchGroupCard} data-aos="fade-up">
                <img src={group.background} alt={group.name} className={classes.cardImage} />
                <div className={classes.cardOverlay}>
                  <Typography className={classes.researchGroupTitle}>{group.name}</Typography>
                  <Typography className={classes.researchGroupDescription}>{group.description}</Typography>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>

        <CopyrightComponent />
      </Container>
    </LandingPageLayout>
  );
};

export default withLandingAuthSync(Index);
