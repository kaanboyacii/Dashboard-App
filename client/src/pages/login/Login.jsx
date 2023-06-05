import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #4b56d2, #472183);
`;
const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
`;
const Wrapper = styled.div`
  background-color: #f1f6f5;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  overflow: hidden;
  width: 350px;
  animation: ${slideIn} 0.5s ease;
`;
const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin: 1rem 0;
`;
const SubTitle = styled.h1`
  font-size: 1rem;
  color: #333;
  text-align: center;
  margin: 1rem 0;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 2rem 2rem 2rem;
`;

const Input = styled.input`
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  padding: 0.8rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #333;

  &:focus {
    outline: none;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  }
`;

const Button = styled.button`
  background-color: #4b56d2;
  color: #f1f6f5;
  border: none;
  border-radius: 5px;
  padding: 1rem;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #472183;
    transition: all 0.2s ease-in-out;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  text-align: center;
`;

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
      const remainingTime =
        timeoutDuration - (Date.now() - parseInt(storedTimeout));
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
      setErrorMessage(
        "5 yanlış giriş denemesi yaptınız. Lütfen 5 dakika bekleyin."
      );
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
        setErrorMessage(
          "5 yanlış giriş denemesi yaptınız. Lütfen 5 dakika bekleyin."
        );
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
    <Container>
      <Wrapper>
        <Form>
          <Title>Giriş yap</Title>
          <Input
            type="email"
            placeholder="E-posta"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Şifre"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} disabled={isTimeout}>
            Giriş yap
          </Button>
          <Error>{errorMessage}</Error>
          <SubTitle>Henüz hesabınız yok ise buradan devam et</SubTitle>
          <Button onClick={() => navigate("/signup")}>Üye ol</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};
export default Login;
