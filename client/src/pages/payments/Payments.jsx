import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPayments = async () => {
      const res = await axios.get(`/projects/findByUser/${currentUser._id}`);
      const projects = res.data;
      const allPayments = projects.reduce((acc, project) => {
        return [...acc, ...project.payments];
      }, []);
      setPayments(allPayments);
    };
    fetchPayments();
  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="subListContainer">
          <div className="listTitle">Tüm Ödemeler</div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" className="custom-row-head">
              <TableHead>
                <TableRow>
                  <TableCell className="custom-cell-head">Başlık</TableCell>
                  <TableCell className="custom-cell-head">Miktar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.title} className="custom-row">
                    <TableCell className="custom-cell">{payment.title}</TableCell>
                    <TableCell className="custom-cell">{payment.amount.toLocaleString()} ₺</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Payments;
