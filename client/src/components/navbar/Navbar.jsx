import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import { logout } from "../../redux/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const dispatchL = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleLogout = async (e) => {
    window.location.href = "/";
    e.preventDefault();
    dispatchL(logout());
    const res = await axios.post("/auth/logout");
  };

  const handleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/projects/search", {
        params: { q: searchQuery },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="navbar">
          <div className="wrapper">
            <div className="search">
              <input
                type="text"
                placeholder="Ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <SearchOutlinedIcon onClick={handleSearch} />
            </div>
            <div className="search-results">
              {searchResults.map((project) => (
                <Link to={`/projects/${project._id}`} key={project._id}>
                  <div>{project.title}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon
              className="icon"
              onClick={handleFullscreen}
            />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <Link to={`/profile/${currentUser._id}`}>
              <img src={currentUser.img} alt="" className="avatar" />
            </Link>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Çıkış yap
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
