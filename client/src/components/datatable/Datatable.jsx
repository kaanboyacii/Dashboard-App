import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchSuccess } from "../../redux/projectSlice.js";

const Datatable = ({ type }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentProject } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectRes = await axios.get(`/projects/find/${path}`);
        dispatch(fetchSuccess(projectRes.data));
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
      width: 190,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <button className="deleteButton" onClick={() => deletePaymentOrCost(params.id)}>Kaldır</button>
      ),
    },
  ];

  let rows = [];
  if (type === "payments" && currentProject) {
    rows = currentProject.payments.map((payment) => ({
      id: payment._id,
      title: payment.title,
      amount: payment.amount + " ₺",
      date: new Date(payment.date).toLocaleDateString(),
    }));
  } else if (type === "costs" && currentProject) {
    rows = currentProject.costs.map((cost) => ({
      id: cost._id,
      title: cost.title,
      amount: cost.amount + " ₺",
      date: new Date(cost.date).toLocaleDateString(),
    }));
  }

  const deletePaymentOrCost = async (id) => {
    try {
      const confirmed = window.confirm("Silmek istediğinize emin misiniz?");
      if (!confirmed) {
        return;
      }
      if (type === "payments") {
        await axios.delete(`/projects/${path}/payments/${id}`);
      } else if (type === "costs") {
        await axios.delete(`/projects/${path}/costs/${id}`);
      }
      fetchData();
    } catch (err) {
      console.log("Error deleting payment or cost");
    }
  };

  const fetchData = async () => {
    try {
      const projectRes = await axios.get(`/projects/find/${path}`);
      dispatch(fetchSuccess(projectRes.data));
    } catch (err) {
      console.log("User AUTH Error");
    }
  };

  const getRowId = (row) => row.id; // Satır kimlik bilgisini belirlemek için fonksiyon

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        getRowId={getRowId} // Satır kimlik bilgisini belirtir
      />
    </div>
  );
};

export default Datatable;
