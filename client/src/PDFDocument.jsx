import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  title: {
    fontFamily: 'Arial-Bold',
    fontSize: 14,
    marginBottom: 5
  },
  description: {
    fontFamily: 'Arial',
    fontSize: 12
  }
});

const PDFDocument = ({ project }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Proje Adı: {project.title}</Text>
        <Text>Açıklama: {project.desc}</Text>
        <Text>Durum: {project.status}</Text>
        <Text>İşveren İletişim: {project.contact}</Text>
        {/* Add more project details as needed */}
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
