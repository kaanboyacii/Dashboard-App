import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Chart = ({ aspect, title }) => {
  const [projects, setProjects] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const currentMonth = new Date().toLocaleDateString('tr-TR', { month: 'long' });
  const previousMonths = [
    new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleDateString('tr-TR', { month: 'long' }),
    new Date(new Date().setMonth(new Date().getMonth() - 2)).toLocaleDateString('tr-TR', { month: 'long' }),
    new Date(new Date().setMonth(new Date().getMonth() - 3)).toLocaleDateString('tr-TR', { month: 'long' }),
    new Date(new Date().setMonth(new Date().getMonth() - 4)).toLocaleDateString('tr-TR', { month: 'long' }),
    new Date(new Date().setMonth(new Date().getMonth() - 5)).toLocaleDateString('tr-TR', { month: 'long' }),
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get(`/projects/findByUser/${currentUser._id}`);
      setProjects(res.data);
    };
    fetchProjects();
  }, []);

  // create a new data array with project earnings
  const projectData = [
    { name: previousMonths[4], Total: 0 },
    { name: previousMonths[3], Total: 0 },
    { name: previousMonths[2], Total: 0 },
    { name: previousMonths[1], Total: 0 },
    { name: previousMonths[0], Total: 0 },
    { name: currentMonth, Total: 0 },
  ];

  for (const project of projects) {
    const projectMonth = new Date(project.createdAt).toLocaleDateString('tr-TR', { month: 'long' });
    const index = previousMonths.indexOf(projectMonth);
    if (index >= 0) {
      projectData[index].Total += project.earning;
    } else if (projectMonth === currentMonth) {
      projectData[5].Total += project.earning;
    }
  }
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={projectData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f20000" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f20000" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#f20000"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
