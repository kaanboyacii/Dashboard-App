import "./update.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchSuccess } from "../../redux/projectSlice.js";
import { useLocation, useNavigate } from "react-router-dom";

const UpdatePayments = ({ setOpenPayments }) => {
  const { currentProject } = useSelector((state) => state.project);
  const [inputs, setInputs] = useState({});
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`/payment-category/${currentProject._id}`);
        setCategories(res.data);
      } catch (err) {
        console.error("Kategori verileri alınamadı:", err);
      }
    };

    fetchCategories();
  }, [currentProject._id]);
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const newPayment = {
      title: inputs.title,
      category: inputs.category,
      amount: inputs.amount,
      date: new Date(),
    };

    const updatedProject = {
      ...currentProject,
      payments: [...currentProject.payments, newPayment],
    };

    const res = await axios.put(
      `/projects/${currentProject._id}`,
      updatedProject
    );
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
          onChange={handleChange}
          className="input"
        />
        <label className="label">Kategori:</label>
        <select name="category" onChange={handleChange} className="input">
          <option value="">Kategori Seçin</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
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

export default UpdatePayments;
