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
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSuccess,
  deleteProjectSuccess,
  deleteProjectFailure,
} from "../../redux/projectSlice.js";

const UpdateProject = ({ setOpenProject }) => {
  const { currentProject } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState(currentProject);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/projects/${currentProject._id}`, inputs);
      if (res.status === 200) {
        setOpenProject(false);
        navigate(`/project/${res.data.project._id}`);
        dispatch(fetchSuccess(res.data.project));
      }
    } catch (error) {
      console.error("Projeyi güncellerken hata oluştu:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/projects/${currentProject._id}`);
      navigate("/projects");
      dispatch(deleteProjectSuccess());
    } catch (error) {
      console.error("Projeyi silerken hata oluştu:", error);
      dispatch(deleteProjectFailure());
    }
  };

  return (
    <Dialog open={true} onClose={() => setOpenProject(false)}>
      <DialogTitle>Projeyi Düzenle</DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off" onSubmit={handleUpdate}>
          <TextField
            name="title"
            label="Başlık"
            fullWidth
            margin="normal"
            value={inputs.title}
            onChange={handleChange}
            required
          />
          <TextField
            name="desc"
            label="Açıklama"
            fullWidth
            margin="normal"
            value={inputs.desc}
            onChange={handleChange}
            required
          />
          <TextField
            name="status"
            label="Durum"
            fullWidth
            margin="normal"
            value={inputs.status}
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
            label="Kar Oranı"
            type="number"
            fullWidth
            margin="normal"
            value={inputs.profitRate}
            onChange={handleChange}
          />
          <DialogActions>
            <Button
              onClick={handleDelete}
              color="error"
              variant="contained"
            >
              Projeyi Kaldır
            </Button>
            <Button
              onClick={handleUpdate}
              type="submit"
              color="primary"
              variant="contained"
            >
              Güncelle
            </Button>
            <Button
              onClick={() => setOpenProject(false)}
              color="primary"
            >
              Kapat
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProject;
