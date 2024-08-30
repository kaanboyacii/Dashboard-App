import { useState } from "react";
import "./payments.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Frontbase from "../../layouts/frontbase/Frontbase.jsx";

const Payments = () => {
  return (
    <Frontbase>
      <div className="costs"><h2>Payments</h2></div>
    </Frontbase>
  );
};

export default Payments;
