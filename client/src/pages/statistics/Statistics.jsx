// Statistics.js
import React, { useEffect, useState } from "react";
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

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="subListContainer">
          <div className="listTitle">Tüm Ödemeler</div>
         
        </div>
      </div>
    </div>
  );
};

export default Statistics;
