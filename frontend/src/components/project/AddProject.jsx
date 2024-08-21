import React from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";

const AddProject = ({ onClose }) => {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Yeni Proje Ekle</DialogTitle>
      <DialogContent>
        {/* Burada proje ekleme formunu yerleştirin */}
        <Button onClick={onClose} color="primary">
          Kapat
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddProject;
