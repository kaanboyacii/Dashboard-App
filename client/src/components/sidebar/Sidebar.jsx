import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice.js";
import LogoLight from "../../img/logolight.png";
import LogoDark from "../../img/logodark.png";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { darkMode } = useContext(DarkModeContext);
  const dispatchL = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleLogout = async (e) => {
    window.location.href = "/";
    e.preventDefault();
    dispatchL(logout());
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img className="logo" src={darkMode ? LogoDark : LogoLight} alt="" />
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">YÖNETİM</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Anasayfa</span>
            </li>
            <p className="title">LİSTE</p>
          </Link>
          <Link to="/projects" style={{ textDecoration: "none" }}>
            <li>
              <AssignmentIcon className="icon" />
              <span>Projeler</span>
            </li>
          </Link>
          <Link to="/costs" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Maliyetler</span>
            </li>
          </Link>
          <Link to="/payments" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Ödemeler</span>
            </li>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li>
              <LowPriorityIcon className="icon" />
              <span>Şiparişler</span>
            </li>
          </Link>
          <p className="title">KULLANIM</p>
          <Link to="/statistics" style={{ textDecoration: "none" }}>
            <li>
              <InsertChartIcon className="icon" />
              <span>İstatistikler</span>
            </li>
          </Link>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Bildirimler</span>
          </li>
          <p className="title">KULLANICI</p>
          <Link
            to={`/profile/${currentUser._id}`}
            style={{ textDecoration: "none" }}
          >
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profil</span>
            </li>
          </Link>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Çıkış yap</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
