import { useState } from "react";
import "./costs.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Frontbase from "../../layouts/frontbase/Frontbase.jsx";

const Costs = () => {
  return (
    <Frontbase>
      <div className="costs"><h2>Costs</h2></div>
    </Frontbase>
  );
};

export default Costs;
