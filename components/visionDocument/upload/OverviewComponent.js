import React from "react";
import {
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";

const OverviewComponent = ({
  title,
  titleError,
  abstract,
  abstractError,
  scope,
  scopeError,
  handleChange,
}) => {
  const lecturers = [
    "Prof. Ts. Dr. Mazlina Abdul Majid",
    "Assoc. Prof. Ts. Dr. Adzhar Kamaludin",
    "Assoc. Prof. Ts. Dr. Ferda Ernawan",
    "Ts. Dr. Nur Shamsiah Abdul Rahman",
    "Ts. Dr. Nabilah Filzah Mohd Radhuan",
  ];

  return (
    <Grid container spacing={3}>
      {/* Title Field */}
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          label="Title"
          fullWidth
          name="title"
          placeholder="Enter Project Title"
          required
          error={titleError.show}
          helperText={
            titleError.show
              ? titleError.message
              : `${title.length}/100`
          }
          value={title}
          onChange={handleChange}
        />
      </Grid>

      {/* Scope Field */}
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          label="Scope"
          fullWidth
          name="scope"
          placeholder="Enter Project Scope"
          required
          error={scopeError.show}
          helperText={
            scopeError.show
              ? scopeError.message
              : `${scope.length}/1000`
          }
          value={scope}
          onChange={handleChange}
          multiline
          rows={4}
        />
      </Grid>

      {/* Lecturer Selection */}
      <Grid item xs={12}>
        <FormControl component="fieldset" required>
          <FormLabel component="legend">Select a Lecturer</FormLabel>
          <RadioGroup
            name="abstract"
            value={abstract}
            onChange={handleChange}
          >
            <Grid container spacing={2}>
              {lecturers.map((lecturer, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card variant="outlined">
                    <CardContent>
                      <FormControlLabel
                        value={lecturer}
                        control={<Radio />}
                        label={
                          <Typography variant="body1">
                            {lecturer}
                          </Typography>
                        }
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
          {abstractError.show && (
            <FormLabel error>{abstractError.message}</FormLabel>
          )}
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default OverviewComponent;
