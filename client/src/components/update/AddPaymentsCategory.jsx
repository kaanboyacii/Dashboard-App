import "./update.scss";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchSuccess } from "../../redux/projectSlice.js";
import { useLocation, useNavigate } from "react-router-dom";

const AddPaymentsCategory = ({ setOpenPaymentsCategory }) => {
  const [categoryName, setCategoryName] = useState(""); // Kategori adını tutmak için yeni bir state
  const { currentProject } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCategoryName(e.target.value); // Kategori adı değiştiğinde categoryName state'ini güncelle
  };

  const handleAdd = async () => {
    if (!categoryName) {
      console.log("Kategori adı boş olamaz.");
      return;
    }

    try {
      const response = await axios.post(
        `/projects/add-payments-category/${currentProject._id}`, // ._id olarak güncelledim
        {
          category: categoryName // Doğru şekilde category alanını ayarla
        }
      );
      dispatch(fetchSuccess(response.data));
      setOpenPaymentsCategory(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="wrapperU">
        <div className="close" onClick={() => setOpenPaymentsCategory(false)}>
          X
        </div>
        <h1 className="title">Yeni maliyet kategorisi ekle</h1>
        <label className="label">Kategori adı:</label>
        <input
          type="text"
          placeholder="Kategori adı"
          value={categoryName} // Değer categoryName state'ine bağlı olmalı
          onChange={handleChange}
          className="input"
        />
        <button onClick={handleAdd} className="button">
          Ekle
        </button>
      </div>
    </div>
  );
};

export default AddPaymentsCategory;
