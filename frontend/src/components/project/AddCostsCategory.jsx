import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const AddCostsCategory = ({ setOpenCostsCategory }) => {
  const [categoryName, setCategoryName] = useState("");
  const { currentProject } = useSelector((state) => state.project);

  const handleChange = (e) => {
    setCategoryName(e.target.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/cost-category", {
        name: categoryName,
        projectId: currentProject._id,
      });
      console.log("Kategori başarıyla eklendi:", response.data);
      setOpenCostsCategory(false);
    } catch (error) {
      console.error("Kategori eklenirken bir hata oluştu:", error);
    }
  };
  return (
    <div className="container">
      <div className="wrapperU">
        <div className="close" onClick={() => setOpenCostsCategory(false)}>
          X
        </div>
        <h1 className="title">Yeni maliyet kategorisi ekle</h1>
        <label className="label">Kategori adı:</label>
        <input
          type="text"
          placeholder="Kategori adı"
          value={categoryName}
          onChange={handleChange}
          className="input"
        />
        <button onClick={handleSubmit} className="button">
          Ekle
        </button>
      </div>
    </div>
  );
};

export default AddCostsCategory;
