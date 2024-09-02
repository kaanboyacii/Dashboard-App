import React, { useState, useEffect } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  LowPriority as LowPriorityIcon,
  InsertChart as InsertChartIcon,
  NotificationsNone as NotificationsNoneIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  ExitToApp as ExitToAppIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import TimelineIcon from "@mui/icons-material/Timeline";
import "./frontbase.scss";
import Logo from "../../images/logo.png";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice.js";

const Frontbase = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    JSON.parse(localStorage.getItem("isSidebarOpen")) || false
  );
  const dispatchL = useDispatch();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleMediaChange = (e) => {
      if (e.matches) {
        setIsSidebarOpen(true);
        localStorage.setItem("isSidebarOpen", JSON.stringify(true));
      }
    };

    mediaQuery.addListener(handleMediaChange);
    handleMediaChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaChange);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("isSidebarOpen", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const handleLogout = async (e) => {
    window.location.href = "/";
    e.preventDefault();
    dispatchL(logout());
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="frontbase-container">
      <CssBaseline />
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleSidebar}
        className="menu-button"
      >
        <MenuIcon />
      </IconButton>
      <aside className={`sidebar ${!isSidebarOpen ? "collapsed" : ""}`}>
        <div className="logo">
          <img src={Logo} alt="Logo" className="logo-img" />
        </div>
        <div className="center">
          <ul>
            <p className="title">YÖNETİM</p>
            <Link to="/" style={{ textDecoration: "none" }}>
              <ListItem button>
                <ListItemIcon>
                  <DashboardIcon className="icon" />
                </ListItemIcon>
                <ListItemText primary="Anasayfa" />
              </ListItem>
            </Link>
            <p className="title">LİSTE</p>
            <Link to="/projects" style={{ textDecoration: "none" }}>
              <ListItem button>
                <ListItemIcon>
                  <AssignmentIcon className="icon" />
                </ListItemIcon>
                <ListItemText primary="Projeler" />
              </ListItem>
            </Link>
            <Link to="/movements" style={{ textDecoration: "none" }}>
              <ListItem button>
                <ListItemIcon>
                  <TimelineIcon className="icon" />
                </ListItemIcon>
                <ListItemText primary="Tüm Hareketler" />
              </ListItem>
            </Link>
            <Link to="/orders" style={{ textDecoration: "none" }}>
              <ListItem button>
                <ListItemIcon>
                  <LowPriorityIcon className="icon" />
                </ListItemIcon>
                <ListItemText primary="Siparişler" />
              </ListItem>
            </Link>
            <p className="title">KULLANIM</p>
            <Link to="/statistics" style={{ textDecoration: "none" }}>
              <ListItem button>
                <ListItemIcon>
                  <InsertChartIcon className="icon" />
                </ListItemIcon>
                <ListItemText primary="İstatistikler" />
              </ListItem>
            </Link>
            <ListItem button>
              <ListItemIcon>
                <NotificationsNoneIcon className="icon" />
              </ListItemIcon>
              <ListItemText primary="Bildirimler" />
            </ListItem>
            <p className="title">KULLANICI</p>
            <Link to={`/profile`} style={{ textDecoration: "none" }}>
              <ListItem button>
                <ListItemIcon>
                  <AccountCircleOutlinedIcon className="icon" />
                </ListItemIcon>
                <ListItemText primary="Profil" />
              </ListItem>
            </Link>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon className="icon" />
              </ListItemIcon>
              <ListItemText primary="Çıkış yap" />
            </ListItem>
          </ul>
        </div>
      </aside>
      <main className={`main-content ${!isSidebarOpen ? "collapsed" : ""}`}>
        {children}
      </main>
      {/* <footer className="footer">
        <p>&copy; 2024 Tüm Hakları Saklıdır.</p>
      </footer> */}
    </div>
  );
};

export default Frontbase;
