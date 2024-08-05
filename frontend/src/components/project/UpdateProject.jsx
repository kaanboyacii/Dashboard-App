import "./update.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchSuccess,
  deleteProjectSuccess,
  deleteProjectFailure,
} from "../../redux/projectSlice.js";

const UpdateProject = ({ setOpenProject }) => {
  const { currentProject } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState(currentProject);
  const path = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await axios.put(`/projects/${currentProject._id}`, inputs);
    setOpenProject(false);
    res.status === 200 && navigate(`/project/${res.data.project._id}`);
    window.location.reload();
    setInputs({});
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/projects/${currentProject._id}`);
      navigate("/projects");
      dispatch(deleteProjectSuccess());
    } catch (error) {
      console.log(error);
      dispatch(deleteProjectFailure());
    }
  };

  return (
    <div className="container">
      <div className="wrapperU">
        <div className="close" onClick={() => setOpenProject(false)}>
          X
        </div>
        <h1 className="title">Projeyi düzenle</h1>
        <label className="label">Başlık:</label>
        <input
          type="text"
          name="title"
          value={inputs.title}
          onChange={handleChange}
          className="input"
        />
        <label className="label">Açıklama:</label>
        <input
          type="text"
          value={inputs.desc}
          name="desc"
          onChange={handleChange}
          className="input"
        />
        <label className="label">Durum:</label>
        <input
          type="text"
          value={inputs.status}
          name="status"
          onChange={handleChange}
          className="input"
        />
        <label className="label">İletişim:</label>
        <input
          type="text"
          value={inputs.contact}
          name="contact"
          onChange={handleChange}
          className="input"
        />
        <button onClick={handleUpdate} className="button">
          Güncelle
        </button>
        <button onClick={handleDelete} className="button-delete">
          Projeyi Kaldır
        </button>
      </div>
    </div>
  );
};

export default UpdateProject;
