import "./costs.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { Link } from "react-router-dom"

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="subListContainer">
          <div className="listTitle">Maliyetler</div>
        </div>
      </div>
    </div>
  )
}

export default List