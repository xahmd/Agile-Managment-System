import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    borderBottom: '2px solid black',
    paddingBottom: 10,
  },
  tableContainer: {
    marginTop: 10,
  },
  table: {
    display: 'table',
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
  },
  tableRowAlternate: {
    backgroundColor: '#f9f9f9', // Alternating row color
  },
  tableCellHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
    backgroundColor: '#d3d3d3', // Header background
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderRightStyle: 'solid',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderRightStyle: 'solid',
  },
  tableCellLast: {
    borderRightWidth: 0, // Remove the right border for the last cell
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 10,
    color: '#666',
    borderTop: '1px solid black',
    paddingTop: 10,
  },
});

// PDF Document Component
const StudentGradeListPDF = ({ students }) => {
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Title Section */}
        <Text style={styles.header}>Graded Projects Report</Text>

        {/* Table Section */}
        <View style={styles.tableContainer}>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Project Title</Text>
              <Text style={styles.tableCellHeader}>Supervisor</Text>
              <Text style={styles.tableCellHeader}>External Evaluator</Text>
              <Text style={styles.tableCellHeader}>Internal Evaluator</Text>
              <Text style={[styles.tableCellHeader, styles.tableCellLast]}>Grade</Text>
            </View>
            {/* Table Rows */}
            {students.map((student, index) => (
              <View
                key={index}
                style={[
                  styles.tableRow,
                  index % 2 === 0 ? styles.tableRowAlternate : null, // Alternate row styling
                ]}
              >
                <Text style={styles.tableCell}>{student.projectTitle || 'N/A'}</Text>
                <Text style={styles.tableCell}>{student.supervisor || 'N/A'}</Text>
                <Text style={styles.tableCell}>{student.externalEvaluator || 'N/A'}</Text>
                <Text style={styles.tableCell}>{student.internalEvaluator || 'N/A'}</Text>
                <Text style={[styles.tableCell, styles.tableCellLast]}>{student.grade || 'N/A'}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Footer Section */}
        <Text style={styles.footer}>
          © {new Date().getFullYear()} Graded Projects Report | All Rights Reserved
        </Text>
      </Page>
    </Document>
  );

  return (
    <PDFDownloadLink document={<MyDocument />} fileName="graded_projects_report.pdf">
      {({ loading }) =>
        loading ? 'Loading document...' : 'Download Graded Projects PDF'
      }
    </PDFDownloadLink>
  );
};

export default StudentGradeListPDF;
