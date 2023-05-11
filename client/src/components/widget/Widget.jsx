import axios from "axios";
import React, { useEffect, useState } from "react";
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useSelector } from "react-redux";

const Widget = ({ type, amount, diff }) => {
  let data;

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
      break;
    case "earning":
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
      break;
    case "balance":
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
        <span className="link">{data.link}</span>
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
