import { useState, useEffect } from "react";
import "./movements.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Frontbase from "../../layouts/frontbase/Frontbase.jsx";

const Movements = () => {
  const [payments, setPayments] = useState([]);
  const [costs, setCosts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          `/payments/user/${currentUser.user._id}`
        );
        setPayments(response.data);
      } catch (error) {
        console.error("Ödemeler alınırken bir hata oluştu:", error);
      }
    };

    fetchPayments();
  }, [currentUser]);

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const response = await axios.get(`/costs/user/${currentUser.user._id}`);
        setCosts(response.data);
      } catch (error) {
        console.error("Maliyetler alınırken bir hata oluştu:", error);
      }
    };

    fetchCosts();
  }, [currentUser]);

  const columns = [
    { field: "title", headerName: "Başlık", width: 150 },
    { field: "amount", headerName: "Miktar", width: 150 },
    {
      field: "date",
      headerName: "Tarih",
      width: 150,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString("tr-TR");
      },
    },
  ];

  return (
    <Frontbase>
      <div className="movements-container">
        <div className="card">
          <h2>Ödemeler</h2>
          <div style={{ height: 550, width: "100%" }}>
            <DataGrid
              rows={payments}
              columns={columns}
              pageSize={3}
              getRowId={(row) => row._id}
              disableSelectionOnClick
            />
          </div>
        </div>
        <div className="card">
          <h2>Maliyetler</h2>
          <div style={{ height: 550, width: "100%" }}>
            <DataGrid
              rows={costs}
              columns={columns}
              pageSize={3}
              getRowId={(row) => row._id}
              disableSelectionOnClick
            />
          </div>
        </div>
      </div>
    </Frontbase>
  );
};

export default Movements;
