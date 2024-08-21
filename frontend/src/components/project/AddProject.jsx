import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProjectStart, addProjectSuccess, addProjectFailure } from "../../redux/projectSlice";

const AddProject = ({ onClose }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    title: "",
    status: "",
    desc: "",
    contact: "",
    profitRate: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    dispatch(addProjectStart());
    const projectData = { ...inputs, userId: currentUser.user._id };
    try {
      const res = await axios.post("/projects", projectData);
      if (res.status === 201) {
        dispatch(addProjectSuccess(res.data.project));
        navigate(`/project/${res.data.project._id}`);
        onClose();
      }
    } catch (err) {
      console.error("Proje eklenirken hata oluştu:", err);
      dispatch(addProjectFailure());
    }
  };


  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Yeni Proje Ekle</DialogTitle>
      <DialogContent>
        <form onSubmit={handleAdd}>
          <TextField
            name="title"
            label="Proje Başlığı"
            fullWidth
            margin="normal"
            value={inputs.title}
            onChange={handleChange}
            required
          />
          <TextField
            name="status"
            label="Proje Durumu"
            fullWidth
            margin="normal"
            value={inputs.status}
            onChange={handleChange}
            required
          />
          <TextField
            name="desc"
            label="Proje Açıklaması"
            fullWidth
            margin="normal"
            value={inputs.desc}
            onChange={handleChange}
            required
          />
          <TextField
            name="contact"
            label="İletişim"
            fullWidth
            margin="normal"
            value={inputs.contact}
            onChange={handleChange}
          />
          <TextField
            name="profitRate"
            label="Kar Oranı (%)"
            type="number"
            fullWidth
            margin="normal"
            value={inputs.profitRate}
            onChange={handleChange}
          />
          <DialogActions>
            <Button
              onClick={onClose}
              color="primary"
              sx={{
                color: "#7C00FE",
                "&:hover": {
                  backgroundColor: "#7C00FE",
                  color: "#fff",
                },
              }}
            >
              Kapat
            </Button>
            <Button
              type="submit"
              color="primary"
              sx={{
                backgroundColor: "#7C00FE",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#5a00e6",
                },
              }}
              variant="contained"
            >
              Ekle
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProject;

