import axios from "axios";
import React, { useEffect, useState } from "react";
import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useSelector } from "react-redux";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  
  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get(`/projects/findByUser/${currentUser._id}`);
      setProjects(res.data);
    };
    fetchProjects();
  }, []);
  const projectLength = projects.length;

  const [lastDayProjects, setLastDayProjects] = useState(0);
  let diffPercentage = 20;
  
  if (lastDayProjects !== 0) {
    const diff = projectLength - lastDayProjects;
    diffPercentage = ((diff / lastDayProjects) * 100).toFixed(2);
    diffPercentage = diffPercentage > 0 ? `+${diffPercentage}` : diffPercentage;
    diffPercentage = `${diffPercentage}%`;
  }
  
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" amount={projectLength} diff={diffPercentage} />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="listContainer">
          <div className="listTitle">Projelerim</div>
          <Table />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={3 / 1} />
        </div>
      </div>
    </div>
  );
};

export default Home;
