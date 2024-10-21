import React from 'react';
import Typography from "@material-ui/core/Typography";

const CopyrightComponent = () => {
  return (
    <Typography variant="body2" style={{paddingBottom: 30}} color="textSecondary" align="center">
      &copy;{` FYP Managment System | By AHMAD JAMOS. ${(new Date().getFullYear())}`}
    </Typography>
  );
};

export default CopyrightComponent;
