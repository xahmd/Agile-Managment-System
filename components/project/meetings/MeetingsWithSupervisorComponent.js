import React, { useContext, useState, useMemo } from 'react';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  LinearProgress,
} from '@material-ui/core';
import moment from 'moment';
import { useListItemStyles } from '../../../src/material-styles/listItemStyles';
import { useTableStyles } from '../../../src/material-styles/tableStyles';
import UserContext from '../../../context/user/user-context';
import ProjectContext from '../../../context/project/project-context';
import DialogTitleComponent from '../../DialogTitleComponent';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import SuccessSnackBar from '../../snakbars/SuccessSnackBar';
import { getSupervisorMeetingChipColor } from '../../../src/material-styles/visionDocsListBorderColor';
import GenerateLogBookButton from './GenerateLogBookButton';

const MeetingsWithSupervisorComponent = ({ meetings, role }) => {
  const userContext = useContext(UserContext);
  const projectContext = useContext(ProjectContext);
  const emptyStyles = useListItemStyles();
  const tableClasses = useTableStyles();

  const [dialog, setDialog] = useState({
    scheduleMeeting: false,
    requestMeeting: false,
  });
  const [selectedDate, handleDateChange] = useState(new Date());
  const [purpose, setPurpose] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({
    show: false,
    message: '',
  });

  // Get student and supervisor names
  const studentName = userContext?.user?.user?.name || 'Unknown Student';
  const supervisorName =
    projectContext?.project?.project?.details?.supervisor?.name || 'Unknown Supervisor';

  // Memoized meetings to prevent re-renders
  const stableMeetings = useMemo(() => meetings, [meetings]);

  const handleScheduleMeeting = () => {
    const meetingData = {
      projectId: projectContext.project.project._id,
      purpose,
      selectedDate,
    };
    setLoading(true);
    projectContext
      .scheduleSupervisorMeeting(meetingData)
      .then(() => {
        setDialog({ ...dialog, scheduleMeeting: false });
        setLoading(false);
        setSuccess({ show: true, message: 'Meeting Scheduled' });
      })
      .catch((err) => console.error(err.message));
  };

  const handleMarksAsAttended = async (meetingId) => {
    try {
      const data = {
        projectId: projectContext.project.project._id,
        meetingId,
      };
      const response = await projectContext.markSupervisorMeetingAsAttended(data);
      if (response && response.message) {
        setSuccess({ show: true, message: 'Marked as Attended' });
      }
    } catch (error) {
      console.error('Error marking as attended:', error.message);
    }
  };

  const handleMarksAsNotAttended = async (meetingId) => {
    try {
      const data = {
        projectId: projectContext.project.project._id,
        meetingId,
      };
      const response = await projectContext.markSupervisorMeetingAsNotAttended(data);
      if (response && response.message) {
        setSuccess({ show: true, message: 'Marked as Not Attended' });
      }
    } catch (error) {
      console.error('Error marking as not attended:', error.message);
    }
  };

  return (
    <div>
      <SuccessSnackBar
        open={success.show}
        message={success.message}
        handleClose={() => setSuccess({ show: false, message: '' })}
      />
      <div className={tableClasses.listHeader}>
        {role === 'Supervisor' ? (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setDialog({ ...dialog, scheduleMeeting: true })}
          >
            Schedule Meeting
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setDialog({ ...dialog, requestMeeting: true })}
          >
            Request for Meeting
          </Button>
        )}
      </div>
      <div className={tableClasses.tableWrapper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">SrNo.</TableCell>
              <TableCell align="left">Purpose</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Attended</TableCell>
              {role === 'Supervisor' && <TableCell align="left">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {(!stableMeetings || stableMeetings.length === 0) ? (
              <TableRow>
                <TableCell colSpan={role === 'Supervisor' ? 5 : 4}>
                  <div className={emptyStyles.emptyListContainer}>
                    <div className={emptyStyles.emptyList}>No Meetings Found</div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              stableMeetings.map((meeting, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell align="left">{meeting.purpose}</TableCell>
                  <TableCell align="left">{moment(meeting.date).format('MM/DD/YY, h:mm A')}</TableCell>
                  <TableCell align="left">
                    <Chip
                      label={meeting.isAttended ? 'Attended' : 'Not Attended'}
                      style={getSupervisorMeetingChipColor(meeting)}
                    />
                  </TableCell>
                  {role === 'Supervisor' && (
                    <TableCell align="left">
                      {!meeting.isAttended ? (
                        <Button
                          size="small"
                          color="primary"
                          variant="contained"
                          onClick={() => handleMarksAsAttended(meeting._id)}
                        >
                          Mark As Attended
                        </Button>
                      ) : (
                        <Button
                          size="small"
                          color="secondary"
                          variant="contained"
                          onClick={() => handleMarksAsNotAttended(meeting._id)}
                        >
                          Mark As Not Attended
                        </Button>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Generate LogBook Button */}
      <GenerateLogBookButton
        meetings={stableMeetings}
        studentName={studentName}
        supervisorName={supervisorName}
      />

      <Dialog
        open={dialog.scheduleMeeting}
        onClose={() => setDialog({ ...dialog, scheduleMeeting: false })}
        fullWidth
        maxWidth="xs"
      >
        {loading && <LinearProgress />}
        <DialogTitleComponent
          title="Schedule Meeting"
          handleClose={() => setDialog({ ...dialog, scheduleMeeting: false })}
        />
        <DialogContent dividers>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <TextField
              label="Purpose"
              fullWidth
              autoFocus
              variant="outlined"
              margin="dense"
              value={purpose}
              required
              onChange={(e) => setPurpose(e.target.value)}
            />
            <DateTimePicker
              label="Select Date & Time"
              inputVariant="outlined"
              value={selectedDate}
              onChange={handleDateChange}
              disablePast
              fullWidth
              margin="dense"
            />
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog({ ...dialog, scheduleMeeting: false })}>Cancel</Button>
          <Button
            onClick={handleScheduleMeeting}
            color="primary"
            disabled={!purpose.trim()}
          >
            Schedule
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MeetingsWithSupervisorComponent;
