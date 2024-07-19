import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register, registerFailure, registerSuccess } from "../../redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import "./register.scss";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(register());
    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      dispatch(registerSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(registerFailure());
      setErrorMessage2("Geçersiz kullanıcı bilgileri !");
    }
  };

  return (
    <div className="register-container">
      <div className="wrapper">
        <form className="form">
          <h1 className="title">Kayıt ol</h1>
          <input
            placeholder="Kullanıcı adı"
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <input
            placeholder="E-posta"
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Şifre"
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <button onClick={handleRegister} className="button">Kayıt ol</button>
          <p className="error">{errorMessage2 && <div>{errorMessage2}</div>}</p>
          <h1 className="subTitle">Zaten hesabın var mı ?</h1>
          <button onClick={() => navigate("/login")} className="button">Giriş yap</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
