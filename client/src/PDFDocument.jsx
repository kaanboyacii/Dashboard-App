// import React from 'react';
// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4'
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1
//   },
//   title: {
//     fontSize: 14,
//     marginBottom: 5
//   },
//   description: {
//     fontSize: 12
//   }
// });

// const PDFDocument = ({ project }) => {
//   const costElements = project.costs.map((cost) => (
//     <Text key={cost.id}>Başlık: {cost.title} Miktar: {cost.amount}</Text>
//   ));

//   const paymentElements = project.payments.map((payment) => (
//     <Text key={payment.id}>Başlık: {payment.title} Miktar: {payment.amount}</Text>
//   ));
//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.section}>
//           <Text style={{ fontFamily: 'Arial' }}>Proje Adı: {project.title}</Text>
//           <Text>Açıklama: {project.desc}</Text>
//           <Text>Durum: {project.status}</Text>
//           <Text>İşveren İletişim: {project.contact}</Text>
//           {costElements}
//           {/* {paymentElements} */}
//           {/* Add more project details as needed */}
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default PDFDocument;
