import React, { useEffect, useState } from "react";
import Frontbase from "../../layouts/frontbase/Frontbase";
import "./project.scss";
import PaymentTable from "../../components/tables/PaymentTable";
import CostTable from "../../components/tables/CostTable";
import AddCosts from "../../components/project/AddCosts";
import AddPayments from "../../components/project/AddPayments";
import UpdateProject from "../../components/project/UpdateProject";
import AddCostsCategory from "../../components/project/AddCostsCategory";
import AddPaymentsCategory from "../../components/project/AddPaymentsCategory";
import CategoryPie from "../../components/charts/CategoryPie";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { fetchSuccess, fetchFailure } from "../../redux/projectSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { generatePDF } from "./generatePdf.js";

const Project = () => {
  const { currentProject } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const [openPayments, setOpenPayments] = useState(false);
  const [openCosts, setOpenCosts] = useState(false);
  const [openCostsCategory, setOpenCostsCategory] = useState(false);
  const [openPaymentsCategory, setOpenPaymentsCategory] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const [costs, setCosts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [costCategories, setCostCategories] = useState([]);
  const [paymentCategories, setPaymentCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/projects/project/${path}`);
        dispatch(fetchSuccess(res.data.project));
      } catch (err) {
        console.error("Error fetching project data:", err);
        dispatch(fetchFailure());
        setError("Veri alınırken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [path, dispatch]);

  useEffect(() => {
    const fetchCostsAndPayments = async () => {
      if (currentProject && currentProject._id) {
        try {
          const [costsRes, paymentsRes] = await Promise.all([
            axios.get(`/costs/${currentProject._id}`),
            axios.get(`/payments/${currentProject._id}`),
          ]);

          const [costCategoriesRes, paymentCategoriesRes] = await Promise.all([
            axios.get(`/cost-category/${currentProject._id}`),
            axios.get(`/payment-category/${currentProject._id}`),
          ]);

          setCosts(
            costsRes.data.map((cost) => ({
              ...cost,
              category:
                costCategoriesRes.data.find((cat) => cat._id === cost.category)
                  ?.name || "Bilinmiyor",
            }))
          );
          setPayments(
            paymentsRes.data.map((payment) => ({
              ...payment,
              category:
                paymentCategoriesRes.data.find(
                  (cat) => cat._id === payment.category
                )?.name || "Bilinmiyor",
            }))
          );
          setCostCategories(costCategoriesRes.data);
          setPaymentCategories(paymentCategoriesRes.data);
        } catch (err) {
          console.error("Error fetching costs and payments:", err);
          setError("Maliyetler ve ödemeler alınırken bir hata oluştu.");
        }
      }
    };

    fetchCostsAndPayments();
  }, [currentProject]);

  if (!currentProject) {
    return <div>Loading...</div>;
  }

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
                  <span className="itemKey">Kar Oranı:</span>
                  <span className="itemValue">
                    %{currentProject.profitRate}
                  </span>
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
                  <button className="pdfButton"             onClick={() => generatePDF(currentProject, costs, payments)}
                  >
                    Belge Oluştur
                  </button>{" "}
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
          <div className="right">
            <CategoryPie />
          </div>
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
      {openPayments && <AddPayments setOpenPayments={setOpenPayments} />}
      {openCosts && <AddCosts setOpenCosts={setOpenCosts} />}
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
