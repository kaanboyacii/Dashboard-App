import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Featured = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalCosts, setTotalCosts] = useState(0);
  const [totalEarning, setTotalEarning] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `/projects/findByUser/${currentUser._id}`
        );
        const projects = response.data;

        let totalPayments = 0;
        projects.forEach((project) => {
          totalPayments += project.totalPayments;
        });

        let totalEarning = 0;
        projects.forEach((project) => {
          totalEarning += project.earning;
        });

        let totalBalance = 0;
        projects.forEach((project) => {
          totalBalance += project.balance;
        });
        
        let totalCosts = 0;
        projects.forEach((project) => {
          totalCosts += project.totalCosts;
        });

        setTotalEarning(totalEarning);
        setTotalBalance(totalBalance);
        setTotalPayments(totalPayments);
        setTotalCosts(totalCosts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Toplam Gelir</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">Toplam gelir</p>
        <p className="amount">{totalPayments.toLocaleString()} ₺</p>
        <p className="desc">Bu değer toplam kar zararı gösterir</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Toplam Kar</div>
            <div className="itemResult">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">{totalEarning.toLocaleString()} ₺</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Toplam Bakiye</div>
            <div className="itemResult">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">
                {totalBalance.toLocaleString()} ₺
              </div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Toplam Gider</div>
            <div className="itemResult">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">{totalCosts.toLocaleString()} ₺</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
