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
  const { currentUser } = useSelector((state) => state.user);
  const [projects, setProjects] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get(`/projects/findByUser/${currentUser._id}`);
      setProjects(res.data);
    };
    fetchProjects();
    const fetchOrders = async () => {
      const res = await axios.get(`/orders/findByUser/${currentUser._id}`);
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  const projectLength = projects.length;
  const ordersLength = orders.length;

  // Project işlemleri
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const yesterdayProjects = projects.filter(
    (project) => new Date(project.createdAt) <= yesterday && !project.endDate
  ).length;

  const currentProjects = projects.length;
  //PROJECTS
  const diffPercentageProjects =
    yesterdayProjects !== 0
      ? (
          ((currentProjects - yesterdayProjects) / yesterdayProjects) *
          100
        ).toFixed(2)
      : 0;
  //ORDERS
  const yesterdayOrders = orders.filter(
    (order) => new Date(order.createdAt) <= yesterday
  ).length;

  const currentOrders = orders.length;

  const diffPercentageOrders =
    yesterdayOrders !== 0
      ? (((currentOrders - yesterdayOrders) / yesterdayOrders) * 100).toFixed(2)
      : 0;

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget
            type="user"
            amount={projectLength}
            diff={diffPercentageProjects}
          />
          <Widget
            type="order"
            amount={ordersLength}
            diff={diffPercentageOrders}
          />
          <Widget type="earning" diff={0} />
          <Widget type="balance" diff={0} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Projelerim</div>
          <Table />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Son 6 Kazanç Grafiği" aspect={3 / 1} />
        </div>
      </div>
    </div>
  );
};

export default Home;
