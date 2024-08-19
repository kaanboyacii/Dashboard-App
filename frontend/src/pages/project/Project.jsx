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
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchSuccess } from "../../redux/projectSlice.js";
import { useDispatch, useSelector } from "react-redux";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Logo from "./../../images/logo.jpg";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

  const [costs, setCosts] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchCostsAndPayments = async () => {
      if (currentProject && currentProject._id) {
        try {
          const costsRes = await axios.get(`/costs/${currentProject._id}`);
          const paymentsRes = await axios.get(
            `/payments/${currentProject._id}`
          );
          setCosts(costsRes.data);
          setPayments(paymentsRes.data);
        } catch (err) {
          console.log("Veriler alınırken hata oluştu:", err);
        }
      }
    };

    fetchCostsAndPayments();
  }, [currentProject]);

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

  const generatePDF = async () => {
    const convertToBase64 = (url) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          const reader = new FileReader();
          reader.onloadend = function () {
            resolve(reader.result);
          };
          reader.readAsDataURL(xhr.response);
        };
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.send();
      });
    };

    const logoBase64 = await convertToBase64(Logo);

    const docDefinition = {
      content: [
        {
          image: logoBase64,
          width: 200,
          absolutePosition: { x: 10, y: 10 },
        },
        { text: "Proje Bilgileri", style: "header", margin: [0, 50, 0, 10] },
        {
          table: {
            body: [
              ["Başlık", currentProject.title],
              ["Açıklama", currentProject.desc],
              ["Durum", currentProject.status],
              ["İletişim", currentProject.contact],
              ["Bakiye", `${currentProject.balance} ₺`],
              ["Kar / Zarar", `${currentProject.earning} ₺`],
              ["Toplam Alınan Ödeme", `${currentProject.totalPayments} ₺`],
              ["Toplam Maliyet", `${currentProject.totalCosts} ₺`],
            ],
          },
        },
        { text: "Maliyetler", style: "subheader", margin: [0, 20, 0, 10] },
        costs.length > 0
          ? {
              table: {
                body: [
                  ["Başlık", "Miktar", "Tarih"],
                  ...costs.map((cost) => [
                    cost.title,
                    `${cost.amount} ₺`,
                    new Date(cost.date).toLocaleDateString(),
                  ]),
                ],
              },
            }
          : { text: "Maliyet kaydı yok.", italics: true },
        { text: "Ödemeler", style: "subheader", margin: [0, 20, 0, 10] },
        payments.length > 0
          ? {
              table: {
                body: [
                  ["Başlık", "Miktar", "Tarih"],
                  ...payments.map((payment) => [
                    payment.title,
                    `${payment.amount} ₺`,
                    new Date(payment.date).toLocaleDateString(),
                  ]),
                ],
              },
            }
          : { text: "Ödeme kaydı yok.", italics: true },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          marginBottom: 10,
        },
        subheader: {
          fontSize: 15,
          bold: true,
        },
      },
      defaultStyle: {
        font: "Roboto",
      },
    };

    pdfMake.createPdf(docDefinition).download(`${currentProject.title}.pdf`);
  };

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
                  <button className="pdfButton" onClick={generatePDF}>
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
