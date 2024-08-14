import React, { useEffect, useState } from "react";
import Frontbase from "../../layouts/frontbase/Frontbase";
import "./project.scss";
import PaymentTable from "../../components/tables/PaymentTable";
import CostTable from "../../components/tables/CostTable";
import UpdateCosts from "../../components/project/UpdateCosts";
import UpdatePayments from "../../components/project/UpdatePayments";
import UpdateProject from "../../components/project/UpdateProject";
import AddCostsCategory from "../../components/project/AddCostsCategory";
import AddPaymentsCategory from "../../components/project/AddPaymentsCategory";
import Success from "../../components/windows/Success";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchSuccess } from "../../redux/projectSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Project = () => {
  const { currentProject } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();
  const [openPayments, setOpenPayments] = useState(false);
  const [openCosts, setOpenCosts] = useState(false);
  const [openCostsCategory, setOpenCostsCategory] = useState(false);
  const [openPaymentsCategory, setOpenPaymentsCategory] = useState(false);
  const [openProject, setOpenProject] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/projects/project/${path}`);
        dispatch(fetchSuccess(res.data.project));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [path, dispatch]);

  return (
    <Frontbase>
      <div className="project-container">
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={() => setOpenProject(true)}>
              Düzenle
            </div>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">{currentProject.title}</h1>
                <div className="detailItem">
                  <span className="itemKey">Açıklama:</span>
                  <span className="itemValue">{currentProject.desc}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Durum:</span>
                  <span className="itemValue">{currentProject.status}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">İletişim:</span>
                  <span className="itemValue">{currentProject.contact}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Bakiye:</span>
                  <span className="itemValue">{currentProject.balance} ₺</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Kar / Zarar:</span>
                  <span className="itemValue">{currentProject.earning} ₺</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Toplam Alınan Ödeme:</span>
                  <span className="itemValue">
                    {currentProject.totalPayments} ₺
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Toplam Maliyet:</span>
                  <span className="itemValue">
                    {currentProject.totalCosts} ₺
                  </span>
                </div>
              </div>
            </div>
            <div className="datatableTitle">
              <div className="buttonContainer">
                <div className="firstRow">
                  <button
                    className="paymentButton"
                    onClick={() => setOpenPayments(true)}
                  >
                    Yeni ödeme ekle
                  </button>
                  <button className="pdfButton">Belge Oluştur</button>
                  <button
                    className="costButton"
                    onClick={() => setOpenCosts(true)}
                  >
                    Yeni maliyet ekle
                  </button>
                </div>
                <div className="secondRow">
                  <button
                    className="paymentButton"
                    onClick={() => setOpenPaymentsCategory(true)}
                  >
                    Yeni ödeme kategorisi ekle
                  </button>
                  <button
                    className="costButton"
                    onClick={() => setOpenCostsCategory(true)}
                  >
                    Yeni maliyet kategorisi ekle
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="right"></div>
        </div>
        <div className="bottom">
          <div className="left">
            <h1 className="title">Ödemeler</h1>
            <PaymentTable />
          </div>
          <div className="right">
            <h1 className="title">Maliyetler</h1>
            <CostTable />
          </div>
        </div>
      </div>
      {openPayments && <UpdatePayments setOpenPayments={setOpenPayments} />}
      {openCosts && <UpdateCosts setOpenCosts={setOpenCosts} />}
      {openProject && <UpdateProject setOpenProject={setOpenProject} />}
      {openCostsCategory && (
        <AddCostsCategory setOpenCostsCategory={setOpenCostsCategory} />
      )}
      {openPaymentsCategory && (
        <AddPaymentsCategory
          setOpenPaymentsCategory={setOpenPaymentsCategory}
        />
      )}
    </Frontbase>
  );
};

export default Project;
