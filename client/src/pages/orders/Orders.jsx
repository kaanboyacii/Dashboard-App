import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./orders.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get(`/orders/findByUser/${currentUser._id}`);
      setOrders(res.data);
    };
    fetchOrders();
  }, [currentUser._id]);

  const handleDeleteClick = async (orderId) => {
    const confirmed = window.confirm("Are you sure you want to delete this order?");
    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`/orders/${orderId}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error deleting order: ", error);
    }
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="subListContainer">
          <div className="listTitle">Tüm Siparişler</div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" className="custom-row-head">
              <TableHead>
                <TableRow>
                  <TableCell className="custom-cell-head">Başlık</TableCell>
                  <TableCell className="custom-cell-head">Açıklama</TableCell>
                  <TableCell className="custom-cell-head">Durum</TableCell>
                  <TableCell className="custom-cell-head">İletişim</TableCell>
                  <TableCell className="custom-cell-head">Kaldır</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id} className="custom-row">
                    <TableCell className="custom-cell">{order.title}</TableCell>
                    <TableCell className="custom-cell">{order.desc}</TableCell>
                    <TableCell className="custom-cell">{order.status}</TableCell>
                    <TableCell className="custom-cell">{order.contact}</TableCell>
                    <TableCell className="custom-cell">
                      <DeleteIcon className="delete-icon" onClick={() => handleDeleteClick(order._id)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="addOrderButton">
            <Link to={"/orders/new"}>
              <button className="newOrderButton">Yeni Sipariş Ekle</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
