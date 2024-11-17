import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MeetingLogBook from './MeetingLogBook';
import { Button } from '@material-ui/core';

// Generate LogBook Button Component
const GenerateLogBookButton = ({ meetings, studentName, supervisorName }) => {
  const fileName = `${studentName}_logbook.pdf`;

  return (
    <div style={{ marginTop: 20, textAlign: 'right' }}>
      <PDFDownloadLink
        document={
          <MeetingLogBook
            meetings={meetings}
            studentName={studentName}
            supervisorName={supervisorName}
          />
        }
        fileName={fileName}
      >
        {({ loading }) =>
          loading ? (
            <Button variant="outlined" disabled>
              Generating LogBook...
            </Button>
          ) : (
            <Button variant="outlined" color="primary">
              Download LogBook
            </Button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default GenerateLogBookButton;
