import React from 'react';
import { ListItem, ListItemIcon, ListItemText, CssBaseline } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  Store as StoreIcon,
  CreditCard as CreditCardIcon,
  LowPriority as LowPriorityIcon,
  InsertChart as InsertChartIcon,
  NotificationsNone as NotificationsNoneIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  ExitToApp as ExitToAppIcon
} from '@mui/icons-material';
import Logo from "../../images/logo.jpg"
import './frontbase.scss';

const Frontbase = ({ children }) => {
  return (
    <div className="frontbase-container">
      <CssBaseline />
      <aside className="sidebar">
        <div className="logo">
          <img src={Logo} alt="Logo" className="logo-img" />
        </div>
        <div className="center">
          <ul>
            <p className="title">YÖNETİM</p>
            <Link to="/" style={{ textDecoration: "none" }}>
              <ListItem button>
                <ListItemIcon><DashboardIcon className="icon" /></ListItemIcon>
                <ListItemText primary="Anasayfa" />
              </ListItem>
            </Link>
            <p className="title">LİSTE</p>
            <Link to="/projects" style={{ textDecoration: "none" }}>
              <ListItem button>
                <ListItemIcon><AssignmentIcon className="icon" /></ListItemIcon>
                <ListItemText primary="Projeler" />
              </ListItem>
            </Link>
            <Link to="/costs" style={{ textDecoration: "none" }}>
              <ListItem button>
                <ListItemIcon><StoreIcon className="icon" /></ListItemIcon>
                <ListItemText primary="Maliyetler" />
              </ListItem>
            </Link>
            <Link to="/payments" style={{ textDecoration: "none" }}>
              <ListItem button>
                <ListItemIcon><CreditCardIcon className="icon" /></ListItemIcon>
                <ListItemText primary="Ödemeler" />
              </ListItem>
            </Link>
            <Link to="/orders" style={{ textDecoration: "none" }}>
              <ListItem button>
                <ListItemIcon><LowPriorityIcon className="icon" /></ListItemIcon>
                <ListItemText primary="Siparişler" />
              </ListItem>
            </Link>
            <p className="title">KULLANIM</p>
            <Link to="/statistics" style={{ textDecoration: "none" }}>
              <ListItem button>
                <ListItemIcon><InsertChartIcon className="icon" /></ListItemIcon>
                <ListItemText primary="İstatistikler" />
              </ListItem>
            </Link>
            <ListItem button>
              <ListItemIcon><NotificationsNoneIcon className="icon" /></ListItemIcon>
              <ListItemText primary="Bildirimler" />
            </ListItem>
            <p className="title">KULLANICI</p>
            <Link to={`/profile`} style={{ textDecoration: "none" }}>
              <ListItem button>
                <ListItemIcon><AccountCircleOutlinedIcon className="icon" /></ListItemIcon>
                <ListItemText primary="Profil" />
              </ListItem>
            </Link>
            <ListItem button>
              <ListItemIcon><ExitToAppIcon className="icon" /></ListItemIcon>
              <ListItemText primary="Çıkış yap" />
            </ListItem>
          </ul>
        </div>
      </aside>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; 2024 Tüm Hakları Saklıdır.</p>
      </footer>
    </div>
  );
}

export default Frontbase;
