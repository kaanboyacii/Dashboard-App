import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchSuccess } from "../../redux/projectSlice.js";


const Datatable = ({type}) => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentProject } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/projects/find/${path}`);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {
        console.log("User AUTH Error");
      }
    };
    fetchData();
  }, [path, dispatch]);

  const columns = [
    { field: "title", headerName: "Başlık", width: 130 },
    {
      field: "amount",
      headerName: "Miktar",
      type: "number",
      width: 90,
    },
    {
      field: "date",
      headerName: "Tarih",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];
  
  let rows = [];
  if (type === "payments") {
    rows = currentProject.payments.map((payment) => ({
      id: payment._id,
      title: payment.title,
      amount: payment.amount,
      date: payment.date,
    }));
  } else if (type === "costs") {
    rows = currentProject.costs.map((cost) => ({
      id: cost._id,
      title: cost.title,
      amount: cost.amount,
      date: cost.date,
    }));
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
    
  );
};

export default Datatable;
