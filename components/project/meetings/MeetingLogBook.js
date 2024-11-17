import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import moment from 'moment';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  date: {
    marginTop: 5,
    fontSize: 10,
    color: 'grey',
  },
  table: {
    display: 'table',
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderColor: '#000',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: 5,
    flex: 1,
    textAlign: 'left',
    borderRightWidth: 1,
    borderColor: '#000',
  },
  lastCell: {
    borderRightWidth: 0,
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

// PDF document component
const MeetingLogBook = React.memo(({ meetings, studentName, supervisorName }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Logbook</Text>
        <Text style={styles.date}>Generated on: {moment().format('MMMM Do YYYY, h:mm A')}</Text>
      </View>

      {/* Table */}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>ID</Text>
          <Text style={styles.tableCell}>Purpose</Text>
          <Text style={styles.tableCell}>Status</Text>
          <Text style={[styles.tableCell, styles.lastCell]}>Date & Time</Text>
        </View>

        {/* Table Rows */}
        {meetings.map((meeting, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCell}>{index + 1}</Text>
            <Text style={styles.tableCell}>{meeting.purpose}</Text>
            <Text style={styles.tableCell}>{meeting.isAttended ? 'Attended' : 'Not Attended'}</Text>
            <Text style={[styles.tableCell, styles.lastCell]}>
              {moment(meeting.date).format('MM/DD/YYYY, h:mm A')}
            </Text>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Student Name: {studentName}</Text>
        <Text style={styles.footerText}>Supervisor Name: {supervisorName}</Text>
      </View>
    </Page>
  </Document>
));

export default MeetingLogBook;
