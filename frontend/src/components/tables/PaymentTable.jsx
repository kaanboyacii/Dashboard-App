import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./table.scss";
import { DataGrid } from "@mui/x-data-grid";

const PaymentTable = () => {
  const { currentProject } = useSelector((state) => state.project);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentProject && currentProject._id) {
        try {
          const res = await axios.get(`/payments/${currentProject._id}`);
          const formattedData = res.data.map((payment) => ({
            ...payment,
            date: new Date(payment.date).toLocaleDateString(),
          }));
          setPayments(formattedData);
        } catch (err) {
          console.log("Ödeme Verileri Alınırken Bir Hata Oluştu.");
        }
      }
    };
    fetchData();
  }, [currentProject]);

  const columns = [
    { field: "title", headerName: "Başlık", width: 150 },
    { field: "amount", headerName: "Miktar", width: 150 },
    {
      field: "date",
      headerName: "Tarih",
      width: 200,
    },
  ];

  return (
    <div className="costTable" style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={payments}
        columns={columns}
        pageSize={3}
        getRowId={(row) => row._id}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default PaymentTable;
