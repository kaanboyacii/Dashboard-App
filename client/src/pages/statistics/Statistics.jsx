import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useSelector } from "react-redux";
import "./statistics.scss";
import Widget from "../../components/widget/Widget";

const Statistics = () => {
  const [projects, setProjects] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get(`/projects/findByUser/${currentUser._id}`);
      setProjects(res.data);
    };
    fetchProjects();
  }, []);

  // Calculate total earning and total balance
  const totalEarning = projects.reduce(
    (acc, project) => acc + project.earning,
    0
  );
  const totalBalance = projects.reduce(
    (acc, project) => acc + project.balance,
    0
  );

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="subListContainer">
          <div className="listTitle">Tüm İstatistikler</div>
          <div className="card">
            <div className="card-title">Total Projects</div>
            <div className="card-value">{projects.length}</div>
            <Link to="/projects">
              <div className="card-description">Detayları gör</div>
            </Link>
          </div>
          <div className="card">
            <div className="card-title">GENEL KAR</div>
            <div className="card-value">{totalEarning.toLocaleString()}</div>
            <Link to="/earning">
              <div className="card-description">Detayları gör</div>
            </Link>
          </div>
          <div className="card">
            <div className="card-title">GENEL BAKİYE</div>
            <div className="card-value">{totalBalance.toLocaleString()}</div>
            <Link to="/balance">
              <div className="card-description">Detayları gör</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
