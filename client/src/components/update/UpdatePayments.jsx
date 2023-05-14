import "./update.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchSuccess } from "../../redux/projectSlice.js";
import { useLocation, useNavigate } from "react-router-dom";

const UpdatePayments = ({ setOpenPayments }) => {
  const { currentProject } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const path = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await axios.put(`/projects/${currentProject._id}`, {
      ...inputs,
    });
    setOpenPayments(false);
    res.status === 200 && navigate(`/projects/${res.data._id}`);
    window.location.reload();
  };

  return (
    <div className="container">
      <div className="wrapperU">
        <div className="close" onClick={() => setOpenPayments(false)}>
          X
        </div>
        <h1 className="title">Yeni ödeme ekle</h1>
        <label className="label">Başlık:</label>
        <input
          type="text"
          placeholder="Başlık"
          name="title"
          onchange={handleChange}
          className="input"
        />
        <label className="label">Miktar:</label>
        <input
          type="text"
          placeholder="Miktar (₺)"
          name="title"
          onchange={handleChange}
          className="input"
        />
        <button onclick={handleUpdate} className="button">
          Ekle
        </button>
      </div>
    </div>
  );
};

export default UpdatePayments;
