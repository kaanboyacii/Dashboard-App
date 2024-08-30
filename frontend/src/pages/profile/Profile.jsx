import { useState } from "react";
import "./profile.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/userSlice.js";
import Frontbase from "../../layouts/frontbase/Frontbase.jsx";

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isEditing, setIsEditing] = useState(false);
  const [inputs, setInputs] = useState({ ...currentUser });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEditClick = () => {
    setIsEditing(true);
  };
  console.log(currentUser);
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/users/${currentUser._id}`, inputs);
      setIsEditing(false);
      if (res.status === 200) {
        dispatch(updateUser(res.user));
        navigate(`/profile/${res.user._id}`, { replace: true });
        setInputs({ ...currentUser });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <Frontbase>
      <div className="profile">
        <div className="profileContainer">
          <div className="top">
            <div className="left">
              <h1>Profilim</h1>
              {isEditing ? (
                <div>
                  <p>İsim:</p>
                  <input
                    type="text"
                    value={inputs.user.username}
                    onChange={handleChange}
                    className="inputField"
                    name="name"
                  />
                  <p>E-posta:</p>
                  <input
                    type="text"
                    value={inputs.user.email}
                    onChange={handleChange}
                    className="inputField"
                    name="email"
                  />
                  <p>Şifre:</p>
                  <input
                    type="password"
                    onChange={handleChange}
                    className="inputField"
                    name="password"
                  />
                  <div className="buttonContainer">
                    <div className="saveButton" onClick={handleSaveClick}>
                      Kaydet
                    </div>
                    <div className="cancelButton" onClick={handleCancelClick}>
                      Düzenlemeden Vazgeç
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="editButton" onClick={handleEditClick}>
                    Düzenle
                  </div>
                  <div className="currentUserDetails">
                    <p>İsim: {currentUser.user.username}</p>
                    <p>E-posta: {currentUser.user.email}</p>
                    <p>Şifre: *********</p>
                  </div>
                </div>
              )}
            </div>
            <div className="right"></div>
          </div>
        </div>
      </div>
    </Frontbase>
  );
};

export default Profile;
