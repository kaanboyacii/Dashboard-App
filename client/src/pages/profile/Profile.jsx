import "./profile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useSelector } from "react-redux";

const Single = () => {
  const { currentProject } = useSelector((state) => state.project);

  return (
    <>
      <div className="single">
        <Sidebar />
        <div className="singleContainer">
          <Navbar />
          <div className="top">
            <h1>Profilim</h1>
          </div>
          <div className="bottom"></div>
          <div className="end"></div>
        </div>
      </div>
    </>
  );
};

export default Single;
