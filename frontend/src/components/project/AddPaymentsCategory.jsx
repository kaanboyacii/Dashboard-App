import "./update.scss";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchSuccess } from "../../redux/projectSlice.js";
import { useLocation, useNavigate } from "react-router-dom";

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
      window.location.reload();
    } catch (error) {
      console.error("Kategori eklenirken bir hata oluştu:", error);
    }
  };
  return (
    <div className="container">
      <div className="wrapperU">
        <div className="close" onClick={() => setOpenPaymentsCategory(false)}>
          X
        </div>
        <h1 className="title">Yeni ödeme kategorisi ekle</h1>
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

export default AddPaymentsCategory;
