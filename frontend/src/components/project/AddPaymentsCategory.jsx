import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

const AddPaymentsCategory = ({ setOpenPaymentsCategory }) => {
  const [categoryName, setCategoryName] = useState("");
  const { currentProject } = useSelector((state) => state.project);

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/payment-category", {
        name: categoryName,
        projectId: currentProject._id,
      });
      console.log("Kategori başarıyla eklendi:", response.data);
      setOpenPaymentsCategory(false);
      // window.location.reload(); 
    } catch (error) {
      console.error("Kategori eklenirken bir hata oluştu:", error);
    }
  };

  return (
    <Dialog open={true} onClose={() => setOpenPaymentsCategory(false)}>
      <DialogTitle>Yeni Ödeme Kategorisi Ekle</DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            label="Kategori Adı"
            fullWidth
            margin="normal"
            placeholder="Kategori adı"
            value={categoryName}
            onChange={handleChange}
            required
          />
          <DialogActions>
            <Button
              onClick={() => setOpenPaymentsCategory(false)}
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

export default AddPaymentsCategory;
