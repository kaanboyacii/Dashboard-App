import axios from "axios";
import React, { useEffect, useState } from "react";
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Widget = ({ type, amount, diff }) => {
  const [projects, setProjects] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get(`/projects/findByUser/${currentUser._id}`);
      setProjects(res.data);
    };
    fetchProjects();
  }, []);

  let data;
  let to;

  switch (type) {
    case "user":
      data = {
        title: "PROJELER",
        isMoney: false,
        link: "Tüm projeleri gör",
        icon: (
          <AccountTreeIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      to = "/projects"; // replace with the URL for the projects page
      break;
    case "order":
      data = {
        title: "SİPARİŞLER",
        isMoney: false,
        link: "Tüm siparişleri gör",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      to = "/orders";
      break;
    case "earning":
      const totalEarning = projects.reduce(
        (acc, project) => acc + project.earning,
        0
      );
      amount = totalEarning.toLocaleString();
      data = {
        title: "GENEL KAR",
        isMoney: true,
        link: "Detayları gör",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      to = "/earnings";
      break;
    case "balance":
      const totalBalance = projects.reduce(
        (acc, project) => acc + project.balance,
        0
      );
      amount = totalBalance.toLocaleString();
      data = {
        title: "GENEL BAKİYE",
        isMoney: true,
        link: "Detayları gör",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      to = "/balance"; // replace with the URL for the balance page
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {amount} {data.isMoney && "₺"}
        </span>
        <Link style={{ textDecoration: "none" }} to={to}>
          <span className="link">{data.link}</span>
        </Link>
      </div>
      <div className="right">
        <div
          className={`percentage ${
            diff > 0 ? "positive" : diff < 0 ? "negative" : "rule"
          }`}
        >
          {diff > 0 && <KeyboardArrowUpIcon />}
          {diff < 0 && <KeyboardArrowDownIcon />}
          {diff === 0 && <HorizontalRuleIcon />}
          {Math.abs(diff)} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
