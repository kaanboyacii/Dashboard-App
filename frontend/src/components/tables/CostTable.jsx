import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import "./table.scss";

const CostTable = () => {
  const { currentProject } = useSelector((state) => state.project);
  const [costs, setCosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentProject && currentProject._id) {
        try {
          const res = await axios.get(`/costs/${currentProject._id}`);
          const formattedData = res.data.map((cost) => ({
            ...cost,
            date: new Date(cost.date).toLocaleDateString(),
          }));
          setCosts(formattedData);
        } catch (err) {
          console.log("Maliyet Verileri Alınırken Bir Hata Oluştu.");
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
