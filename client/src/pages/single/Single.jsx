import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import Datatable from "../../components/datatable/Datatable";
import UpdateCosts from "../../components/update/UpdateCosts";
import UpdatePayments from "../../components/update/UpdatePayments";
import UpdateProject from "../../components/update/UpdateProject";
import List from "../../components/table/Table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchSuccess } from "../../redux/projectSlice.js";
import { useLocation, useNavigate } from "react-router-dom";

const Single = () => {
  const { currentProject } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();
  const [openPayments, setOpenPayments] = useState(false);
  const [openCosts, setOpenCosts] = useState(false);
  const [openProject, setOpenProject] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/projects/find/${path}`);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {
        console.log("User AUTH Error");
      }
    };
    fetchData();
  }, [path, dispatch]);

  let totalCosts = 0;
  currentProject.costs.forEach((cost) => {
    totalCosts += cost.amount;
  });
  let totalPayments = 0;
  currentProject.payments.forEach((payment) => {
    totalPayments += payment.amount;
  });


  return (
    <>
      <div className="single">
        <Sidebar />
        <div className="singleContainer">
          <Navbar />
          <div className="top">
            <div className="left">
              <div className="editButton" onClick={() => setOpenProject(true)}>Düzenle</div>
              <h1 className="title">Bilgiler</h1>
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
                    <span className="itemValue">
                      {currentProject.balance.toLocaleString()} ₺
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Kar / Zarar:</span>
                    <span className="itemValue">
                      {currentProject.earning.toLocaleString()} ₺
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Toplam Alınan Ödeme:</span>
                    <span className="itemValue">
                      {currentProject.totalPayments.toLocaleString()} ₺
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Toplam Maliyet:</span>
                    <span className="itemValue">
                      {currentProject.totalCosts.toLocaleString()} ₺
                    </span>
                  </div>
                </div>
              </div>
              <div className="datatableTitle">
                <div className="buttonContainer">
                  <button
                    onClick={() => setOpenPayments(true)}
                    className="paymentButton"
                  >
                    Yeni ödeme ekle
                  </button>
                  <button
                    onClick={() => setOpenCosts(true)}
                    className="costButton"
                  >
                    Yeni maliyet ekle
                  </button>
                </div>
              </div>
            </div>
            <div className="right">
              <Chart aspect={3 / 1} title="Son 6 Kazanç Grafiği" />
              {/* <h1 className="title">Ödemeler ve Maliyetler</h1>
            <Datatable project={currentProject} /> */}
            </div>
          </div>
          <div className="bottom">
            <div className="left">
              <h1 className="title">Ödemeler</h1>
              <Datatable type="payments" />
            </div>
            <div className="right">
              <h1 className="title">Maliyetler</h1>
              <Datatable type="costs" />
            </div>
          </div>
          <div className="end">
            <h1 className="title">Son işlem gören projeler</h1>
            <List />
          </div>
        </div>
      </div>
      {openPayments && <UpdatePayments setOpenPayments={setOpenPayments} />}
      {openCosts && <UpdateCosts setOpenCosts={setOpenCosts} />}
      {openProject && <UpdateProject setOpenProject={setOpenProject} />}
    </>
  );
};

export default Single;
