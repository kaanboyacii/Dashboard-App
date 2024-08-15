import "./update.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPayments = ({ setOpenPayments }) => {
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
      const res = await axios.post("/payments", newCost);
      console.log("Yeni ödeme eklendi:", res.data);
      setOpenPayments(false);
      navigate(`/project/${currentProject._id}`);
      window.location.reload();
    } catch (err) {
      console.error("Ödeme eklenemedi:", err);
    }
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
        <button onClick={handleAdd} className="button">
          Ekle
        </button>
      </div>
    </div>
  );
};

export default AddPayments;
