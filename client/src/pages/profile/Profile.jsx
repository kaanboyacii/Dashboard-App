import { useState } from "react";
import "./profile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState(currentUser.password);
  const [instagramUsername, setInstagramUsername] = useState(
    currentUser.InstagramUsername
  );

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Güncelleme işlemleri...
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    // Düzenlemeyi iptal etmek için değerleri eski haline getir
    setName(currentUser.name);
    setEmail(currentUser.email);
    setPassword(currentUser.password);
    setInstagramUsername(currentUser.InstagramUsername);
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="inputField"
                />
                <p>E-posta:</p>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="inputField"
                />
                <p>Şifre:</p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="inputField"
                />
                <p>Instagram URL:</p>
                <input
                  type="text"
                  value={instagramUsername}
                  onChange={(e) => setInstagramUsername(e.target.value)}
                  className="inputField"
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
