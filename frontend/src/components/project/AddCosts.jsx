import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, InputLabel } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddCost = ({ setOpenCosts }) => {
  const { currentProject } = useSelector((state) => state.project);
  const [inputs, setInputs] = useState({});
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    const selectedCategory = categories.find(
      (category) => category.name === inputs.category
    );

    if (!selectedCategory) {
      alert("Lütfen geçerli bir kategori seçin.");
      return;
    }

    const newCost = {
      projectId: currentProject._id,
      title: inputs.title,
      category: selectedCategory._id,
      amount: inputs.amount,
    };

    try {
      const res = await axios.post("/costs", newCost);
      console.log("Yeni maliyet eklendi:", res.data);
      setOpenCosts(false);
      navigate(`/project/${currentProject._id}`);
      window.location.reload(); 
    } catch (err) {
      console.error("Maliyet eklenemedi:", err);
    }
  };

  return (
    <Dialog open={true} onClose={() => setOpenCosts(false)}>
      <DialogTitle>Yeni Maliyet Ekle</DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off" onSubmit={handleAdd}>
          <TextField
            label="Başlık"
            fullWidth
            margin="normal"
            placeholder="Başlık"
            name="title"
            onChange={handleChange}
            required
          />
          <InputLabel id="category-label">Kategori</InputLabel>
          <Select
            labelId="category-label"
            name="category"
            value={inputs.category || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            displayEmpty
            required
          >
            <MenuItem value="" disabled>Kategori Seçin</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Miktar (₺)"
            fullWidth
            margin="normal"
            placeholder="Miktar (₺)"
            name="amount"
            onChange={handleChange}
            required
          />
          <DialogActions>
            <Button
              onClick={() => setOpenCosts(false)}
              color="primary"
            >
              Kapat
            </Button>
            <Button
              type="submit"
              color="primary"
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

export default AddCost;
