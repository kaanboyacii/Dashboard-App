import { useState } from "react";
import "./profile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/userSlice.js";

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isEditing, setIsEditing] = useState(false);
  const [inputs, setInputs] = useState({ ...currentUser });
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleEditClick = () => {
    setIsEditing(true);
  };

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
        dispatch(updateUser(res.data)); // Güncellenen kullanıcı bilgilerini Redux store'a aktar
        navigate(`/profile/${res.data._id}`, { replace: true });
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
    <div className="profile">
      <Sidebar />
      <div className="profileContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1>Profilim</h1>
            {isEditing ? (
              <div>
                <p>İsim:</p>
                <input
                  type="text"
                  value={inputs.name}
                  onChange={handleChange}
                  className="inputField"
                  name="name"
                />
                <p>E-posta:</p>
                <input
                  type="text"
                  value={inputs.email}
                  onChange={handleChange}
                  className="inputField"
                  name="email"
                />
                <p>Şifre:</p>
                <input
                  type="password"
                  value={inputs}
                  onChange={handleChange}
                  className="inputField"
                  name="password"
                />
                <p>Instagram URL:</p>
                <input
                  type="text"
                  value={inputs.InstagramUsername}
                  onChange={handleChange}
                  className="inputField"
                  name="InstagramUsername"
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
                  <p>İsim: {currentUser.name}</p>
                  <p>E-posta: {currentUser.email}</p>
                  <p>Şifre: *********</p>
                  <p>Instagram URL: {currentUser.InstagramUsername}</p>
                </div>
              </div>
            )}
          </div>
          <div className="right">
            <Featured />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
