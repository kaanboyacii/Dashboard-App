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
  Store as StoreIcon,
  CreditCard as CreditCardIcon,
  LowPriority as LowPriorityIcon,
  InsertChart as InsertChartIcon,
  NotificationsNone as NotificationsNoneIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  ExitToApp as ExitToAppIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import "./frontbase.scss";
import Logo from "../../images/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice.js";

const Frontbase = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatchL = useDispatch();
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleMediaChange = (e) => {
      setIsSidebarOpen(e.matches);
    };

    handleMediaChange(mediaQuery);
    mediaQuery.addListener(handleMediaChange);

    return () => {
      mediaQuery.removeListener(handleMediaChange);
    };
  }, []);

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
            <Link to="/costs" style={{ textDecoration: "none" }}>
              <ListItem button>
                <ListItemIcon>
                  <StoreIcon className="icon" />
                </ListItemIcon>
                <ListItemText primary="Maliyetler" />
              </ListItem>
            </Link>
            <Link to="/payments" style={{ textDecoration: "none" }}>
              <ListItem button>
                <ListItemIcon>
                  <CreditCardIcon className="icon" />
                </ListItemIcon>
                <ListItemText primary="Ödemeler" />
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
