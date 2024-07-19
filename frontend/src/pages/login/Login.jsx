import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isTimeout, setIsTimeout] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutDuration = 5 * 60 * 1000; // 5 dakika
    const storedTimeout = localStorage.getItem("timeout");
    const storedAttempts = localStorage.getItem("loginAttempts");

    if (storedTimeout && storedAttempts) {
      const remainingTime = timeoutDuration - (Date.now() - parseInt(storedTimeout));
      const attempts = parseInt(storedAttempts);

      if (remainingTime > 0 && attempts >= 5) {
        setIsTimeout(true);
        const timeout = setTimeout(() => {
          setIsTimeout(false);
          setLoginAttempts(0);
          localStorage.removeItem("timeout");
          localStorage.removeItem("loginAttempts");
        }, remainingTime);
        return () => clearTimeout(timeout);
      } else if (remainingTime > 0) {
        setLoginAttempts(attempts);
      }
    }
  }, []);

  useEffect(() => {
    if (isTimeout) {
      localStorage.setItem("timeout", Date.now().toString());
      localStorage.setItem("loginAttempts", loginAttempts.toString());
    } else {
      localStorage.removeItem("timeout");
      localStorage.removeItem("loginAttempts");
    }
  }, [isTimeout, loginAttempts]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isTimeout) {
      setErrorMessage("5 yanlış giriş denemesi yaptınız. Lütfen 5 dakika bekleyin.");
      return;
    }
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signin", { email, password });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure());
      setLoginAttempts((prevAttempts) => prevAttempts + 1);
      if (loginAttempts + 1 >= 5) {
        setIsTimeout(true);
        setErrorMessage("5 yanlış giriş denemesi yaptınız. Lütfen 5 dakika bekleyin.");
        const timeout = setTimeout(() => {
          setIsTimeout(false);
          setLoginAttempts(0);
          localStorage.removeItem("timeout");
          localStorage.removeItem("loginAttempts");
        }, 5 * 60 * 1000); // 5 dakika
        return () => clearTimeout(timeout);
      }
      setErrorMessage("Geçersiz giriş bilgileri!");
    }
  };

  return (
    <div className="login-container">
      <div className="wrapper">
        <form className="form">
          <h1 className="title">Giriş yap</h1>
          <input
            type="email"
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
          <button onClick={handleLogin} disabled={isTimeout} className="button">
            Giriş yap
          </button>
          <p className="error">{errorMessage}</p>
          <h1 className="subTitle">Henüz hesabınız yok ise buradan devam et</h1>
          <button onClick={() => navigate("/register")} className="button">Üye ol</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
