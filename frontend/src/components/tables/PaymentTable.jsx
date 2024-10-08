import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import "./table.scss";
import { Button } from "@mui/material";

const PaymentTable = () => {
  const { currentProject } = useSelector((state) => state.project);
  const [payments, setPayments] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentProject && currentProject._id) {
        try {
          const res = await axios.get(`/payments/${currentProject._id}`);
          const formattedData = res.data.map((payment) => {
            const category = categories.find(
              (cat) => cat._id === payment.category
            );
            return {
              ...payment,
              date: new Date(payment.date).toLocaleDateString(),
              category: category ? category.name : "Bilinmiyor",
            };
          });
          setPayments(formattedData);
        } catch (err) {
          console.log("Ödeme Verileri Alınırken Bir Hata Oluştu.");
        }
      }
    };
    fetchData();
  }, [currentProject, categories]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`/payment-category/${currentProject._id}`);
        setCategories(res.data);
      } catch (err) {
        console.error("Kategori verileri alınamadı:", err);
      }
    };

    fetchCategories();
  }, [currentProject._id]);

  const handleDelete = async (id) => {
    if (window.confirm("Bu ödemeyi silmek istediğinize emin misiniz?")) {
      try {
        await axios.delete(`/payments/${id}`);
        setPayments((prevPayments) => prevPayments.filter((payment) => payment._id !== id));
        alert("Ödeme başarıyla silindi.");
      } catch (err) {
        console.error("Ödeme silinirken bir hata oluştu:", err);
        alert("Ödeme silinirken bir hata oluştu.");
      }
    }
  };

  const columns = [
    { field: "title", headerName: "Başlık", width: 100 },
    { field: "category", headerName: "Kategori", width: 100 },
    { field: "amount", headerName: "Miktar", width: 100 },
    { field: "date", headerName: "Tarih", width: 100 },
    {
      field: "actions",
      headerName: "İşlemler",
      width: 100,
      renderCell: (params) => (
        <Button
          onClick={() => handleDelete(params.row._id)}
          color="error"
          variant="contained"
          size="small"
        >
          KALDIR
        </Button>
      ),
    },
  ];

  return (
    <div className="paymentTable" style={{ height: 400, width: "100%" }}>
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
