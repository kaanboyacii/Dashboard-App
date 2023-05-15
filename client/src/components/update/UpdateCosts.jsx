import "./update.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchSuccess } from "../../redux/projectSlice.js";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateCosts = ({ setOpenCosts }) => {
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
    const newCost = {
      title: inputs.title,
      amount: inputs.amount,
      date: new Date(),
    };

    const updatedProject = {
      ...currentProject,
      costs: [...currentProject.costs, newCost],
    };

    const res = await axios.put(`/projects/${currentProject._id}`, updatedProject);
    setOpenCosts(false);
    res.status === 200 && navigate(`/projects/${res.data._id}`);
    window.location.reload();
  };

  return (
    <div className="container">
      <div className="wrapperU">
        <div className="close" onClick={() => setOpenCosts(false)}>
          X
        </div>
        <h1 className="title">Yeni maliyet ekle</h1>
        <label className="label">Başlık:</label>
        <input
          type="text"
          placeholder="Başlık"
          name="title"
          onChange={handleChange}
          className="input"
        />
        <label className="label">Miktar:</label>
        <input
          type="text"
          placeholder="Miktar (₺)"
          name="amount"
          onChange={handleChange}
          className="input"
        />
        <button onClick={handleUpdate} className="button">
          Ekle
        </button>
      </div>
    </div>
  );
};

export default UpdateCosts;
