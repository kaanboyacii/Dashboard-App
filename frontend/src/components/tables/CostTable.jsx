import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import "./table.scss";
import { Button } from "@mui/material";

const CostTable = () => {
  const { currentProject } = useSelector((state) => state.project);
  const [costs, setCosts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentProject && currentProject._id) {
        try {
          const res = await axios.get(`/costs/${currentProject._id}`);
          const formattedData = res.data.map((cost) => {
            const category = categories.find((cat) => cat._id === cost.category);
            return {
              ...cost,
              date: new Date(cost.date).toLocaleDateString(),
              category: category ? category.name : "Bilinmiyor",
            };
          });
          setCosts(formattedData);
        } catch (err) {
          console.log("Maliyet Verileri Alınırken Bir Hata Oluştu.");
        }
      }
    };
    fetchData();
  }, [currentProject, categories]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`/cost-category/${currentProject._id}`);
        setCategories(res.data);
      } catch (err) {
        console.error("Kategori verileri alınamadı:", err);
      }
    };

    fetchCategories();
  }, [currentProject._id]);

  const handleDelete = async (id) => {
    if (window.confirm("Bu maliyeti silmek istediğinize emin misiniz?")) {
      try {
        await axios.delete(`/costs/${id}`);
        setCosts((prevCosts) => prevCosts.filter((cost) => cost._id !== id));
        alert("Maliyet başarıyla silindi.");
      } catch (err) {
        console.error("Maliyet silinirken bir hata oluştu:", err);
        alert("Maliyet silinirken bir hata oluştu.");
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
    <div className="costTable" style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={costs}
        columns={columns}
        pageSize={3}
        getRowId={(row) => row._id}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default CostTable;
