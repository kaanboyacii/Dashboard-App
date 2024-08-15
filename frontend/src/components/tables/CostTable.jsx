import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import "./table.scss";

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
            const category = categories.find(cat => cat._id === cost.category);
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

  const columns = [
    { field: "title", headerName: "Başlık", width: 120 },
    { field: "category", headerName: "Kategori", width: 120 },
    { field: "amount", headerName: "Miktar", width: 50 },
    {
      field: "date",
      headerName: "Tarih",
      width: 120,
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
