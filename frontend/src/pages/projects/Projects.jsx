import React, { useEffect, useState } from "react";
import Frontbase from "../../layouts/frontbase/Frontbase";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./projects.scss";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const UserId = currentUser.user._id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectRes = await axios.get(`/projects/user/${UserId}`);
        if (projectRes.data.success) {
          const formattedProjects = projectRes.data.projects.map((project) => ({
            id: project._id,
            title: project.title,
            status: project.status,
            contact: project.contact,
            balance: project.balance,
            earning: project.earning,
            totalCosts: project.totalCosts,
            totalPayments: project.totalPayments,
            createdAt: new Date(project.createdAt).toLocaleDateString(),
            updatedAt: new Date(project.updatedAt).toLocaleDateString(),
          }));
          setProjects(formattedProjects);
        }
      } catch (err) {
        console.log("Error fetching projects:", err);
      }
    };
    fetchData();
  }, [UserId]);

  const handleRowClick = (id) => {
    navigate(`/projects/${id}`);
  };

  return (
    <Frontbase>
      <div className="projects-content">
        <Typography variant="h5" gutterBottom className="card-header">
          Projeler
        </Typography>
        <div className="table-container">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Proje Adı</TableCell>
                  <TableCell>Durum</TableCell>
                  <TableCell>İletişim</TableCell>
                  <TableCell>Bakiye</TableCell>
                  <TableCell>Kazanç</TableCell>
                  <TableCell>Toplam Maliyet</TableCell>
                  <TableCell>Toplam Ödeme</TableCell>
                  <TableCell>Oluşturulma Tarihi</TableCell>
                  <TableCell>Güncellenme Tarihi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((project) => (
                  <TableRow
                    key={project.id}
                    hover
                    onClick={() => handleRowClick(project.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>{project.title}</TableCell>
                    <TableCell>{project.status}</TableCell>
                    <TableCell>{project.contact}</TableCell>
                    <TableCell>{project.balance}</TableCell>
                    <TableCell>{project.earning}</TableCell>
                    <TableCell>{project.totalCosts}</TableCell>
                    <TableCell>{project.totalPayments}</TableCell>
                    <TableCell>{project.createdAt}</TableCell>
                    <TableCell>{project.updatedAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Frontbase>
  );
};

export default Projects;
