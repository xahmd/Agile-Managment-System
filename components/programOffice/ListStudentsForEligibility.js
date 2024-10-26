import React, {useEffect, useState} from 'react';
import {
  Container,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
  Tooltip,
  IconButton,
  Menu,
  ListItemIcon,
  Chip,
} from "@material-ui/core";
import {
  AccountBox,
  CheckCircleOutlined,
  Close,
  MoreVertOutlined,
  Search,
  NotInterested,
} from "@material-ui/icons";

import Button from "@material-ui/core/Button";
import {changeEligibility, fetchStudentsForEligibility} from "../../utils/apiCalls/programOffice";
import {useListContainerStyles} from "../../src/material-styles/listContainerStyles";
import DialogTitleComponent from "../DialogTitleComponent";
import CircularLoading from "../loading/CircularLoading";
import {useListItemStyles} from "../../src/material-styles/listItemStyles";
import {useTableStyles} from "../../src/material-styles/tableStyles";
import SuccessSnackBar from "../snakbars/SuccessSnackBar";
import ErrorSnackBar from "../snakbars/ErrorSnackBar";
import {useDialogStyles} from "../../src/material-styles/dialogStyles";

const ListStudentsForEligibility = ({studentsList}) => {
  const classes = useListContainerStyles();
  const emptyStyles = useListItemStyles();
  const tableClasses = useTableStyles();
  const dialogClasses = useDialogStyles();
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogLoading, setDialogLoading] = useState(false);
  const [status, setStatus] = useState('All');
  const [changedStatus, setChangedStatus] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [res, setRes] = useState({
    success: false,
    error: {
      open: false,
      message: ''
    }
  });

  useEffect(() => {
    setStudentList(studentsList);
    setStudents(studentsList);
    setFilter(studentsList);
    setLoading(false);
  }, [studentsList]);

  const handleChange = (event) => {
    setStatus(event.target.value);
    let filteredData = studentList;
    if (event.target.value === 'Pending') {
      filteredData = studentList.filter(student => student.student_details.isEligible === 'Pending');
    } else if (event.target.value === 'Not Eligible') {
      filteredData = studentList.filter(student => student.student_details.isEligible === 'Not Eligible');
    }
    setStudents(filteredData);
    setFilter(filteredData);
  };

  const handleChangeSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value ? students.filter(student => student.student_details.regNo.toLowerCase().includes(value)) : students);
  };

  const handleConfirm = (status) => {
    setChangedStatus({...changedStatus, status});
    setDialogOpen(true);
  };

  const handleChangeStatus = () => {
    setDialogLoading(true);
    changeEligibility(changedStatus.status, changedStatus.student._id)
      .then(response => {
        if (response.error) {
          setRes({...res, error: {open: true, message: response.error}});
          setDialogOpen(false);
          setDialogLoading(false);
          return;
        }
        fetchStudentsForEligibility().then(result => {
          setStudentList(result);
          setStudents(result);
          setFilter(result);
          setDialogOpen(false);
          setDialogLoading(false);
          setRes({...res, success: true});
        });
      });
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleClickActionMenu = (student, event) => {
    setChangedStatus({...changedStatus, student});
    setAnchorEl(event.currentTarget);
  };

  // Color-coded Chip for Eligibility Status
  const getEligibilityChip = (status) => {
    let chipStyle = {};
    switch (status) {
      case 'Eligible':
        chipStyle = { backgroundColor: 'green', color: 'white' };
        break;
      case 'Pending':
        chipStyle = { backgroundColor: '#ffcc00', color: 'black' };
        break;
      case 'Not Eligible':
        chipStyle = { backgroundColor: '#cc3300', color: 'white' };
        break;
      default:
        chipStyle = { backgroundColor: 'grey', color: 'white' };
    }
    return <Chip label={status} style={chipStyle} />;
  };

  return (
    <div>
      <SuccessSnackBar open={res.success} message={'Success'} handleClose={() => setRes({...res, success: false})}/>
      <ErrorSnackBar open={res.error.open} message={res.error.message}
                     handleSnackBar={() => setRes({...res, error: {open: false, message: ''}})}/>
      <Container>
        <div className={classes.listContainer}>
          <div className={classes.top}>
            <AccountBox className={classes.headerIcon}/>
            <Typography variant="h5" className={classes.topTitle}>Students</Typography>
          </div>
          <div className={classes.listHeader}>
            <FormControl variant="outlined" margin="dense" className={classes.formControl}>
              <InputLabel htmlFor="status">Status</InputLabel>
              <Select
                value={status}
                onChange={handleChange}
                input={<OutlinedInput labelWidth={47} name="status" id="status"/>}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Not Eligible">Not Eligible</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              label="Search"
              name="search"
              margin="dense"
              placeholder="Write Registration No"
              onChange={handleChangeSearch}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search/>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Divider/>
          {loading ? (
            <CircularLoading/>
          ) : (
            <div className={classes.listItemContainer}>
              <div className={tableClasses.tableWrapper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left"><strong>Student Name</strong></TableCell>
                      <TableCell align="left"><strong>Registration No</strong></TableCell>
                      <TableCell align="left"><strong>Department</strong></TableCell>
                      <TableCell align="left"><strong>Eligibility Status</strong></TableCell>
                      <TableCell align="left"><strong>Actions</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filter.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} align="center" className={emptyStyles.emptyListContainer}>
                          No Students Found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filter.map(student => (
                        <TableRow key={student._id} className={tableClasses.tableRow}>
                          <TableCell align="left">{student.name}</TableCell>
                          <TableCell align="left">{student.student_details.regNo}</TableCell>
                          <TableCell align="left">{student.department}</TableCell>
                          <TableCell align="left">{getEligibilityChip(student.student_details.isEligible)}</TableCell>
                          <TableCell align="left">
                            <Tooltip title="Click for Actions" placement="top">
                              <IconButton size="small" onClick={(event) => handleClickActionMenu(student, event)}>
                                <MoreVertOutlined/>
                              </IconButton>
                            </Tooltip>
                            <Menu
                              id="simple-menu"
                              anchorEl={anchorEl}
                              keepMounted
                              open={Boolean(anchorEl)}
                              onClose={() => setAnchorEl(null)}
                            >
                              {changedStatus.student && changedStatus.student.student_details.isEligible === 'Not Eligible' ? (
                                <MenuItem onClick={() => handleConfirm('Eligible')}>
                                  <ListItemIcon><CheckCircleOutlined/></ListItemIcon>
                                  Make Eligible
                                </MenuItem>
                              ) : (
                                <>
                                  <MenuItem onClick={() => handleConfirm('Eligible')}>
                                    <ListItemIcon><CheckCircleOutlined/></ListItemIcon>
                                    Eligible
                                  </MenuItem>
                                  <MenuItem onClick={() => handleConfirm('Not Eligible')}>
                                    <ListItemIcon><NotInterested/></ListItemIcon>
                                    Not Eligible
                                  </MenuItem>
                                </>
                              )}
                              <MenuItem onClick={() => setAnchorEl(null)}>
                                <ListItemIcon><Close/></ListItemIcon>
                                Cancel
                              </MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
        <Dialog open={dialogOpen} onClose={handleClose} classes={{paper: dialogClasses.root}}>
          {dialogLoading && <LinearProgress/>}
          <DialogTitleComponent title="Confirm" handleClose={handleClose}/>
          <DialogContent>
            <DialogContentText>Are you sure, you want to perform this action?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleChangeStatus} color="primary">Confirm</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default ListStudentsForEligibility;
