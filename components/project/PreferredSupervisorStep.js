import React, { useState } from 'react';
import { List, ListItem, ListItemText, Typography, CircularProgress } from '@material-ui/core';

const PreferredSupervisorStep = ({ selectedSupervisor, onSelectSupervisor }) => {
  // Example list of supervisors
  const supervisors = [
    { _id: '1', name: 'Dr. John Doe', email: 'john.doe@example.com' },
    { _id: '2', name: 'Dr. Sarah Connor', email: 'sarah.connor@example.com' },
    { _id: '3', name: 'Dr. Emily Smith', email: 'emily.smith@example.com' },
    { _id: '4', name: 'Dr. Michael Brown', email: 'michael.brown@example.com' },
    { _id: '5', name: 'Dr. Olivia Johnson', email: 'olivia.johnson@example.com' },
  ];

  return (
    <div>
      <Typography variant="h6">Select Preferred Supervisor</Typography>
      <List>
        {supervisors.map((supervisor) => (
          <ListItem
            button
            key={supervisor._id}
            selected={selectedSupervisor === supervisor._id}
            onClick={() => onSelectSupervisor(supervisor._id)}
          >
            <ListItemText primary={supervisor.name} secondary={supervisor.email} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PreferredSupervisorStep;
