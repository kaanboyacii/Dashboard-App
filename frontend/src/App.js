import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import Projects from "./pages/projects/Projects";

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="app">
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {currentUser ? (
          <>
            <Route path="/">
              <Route index element={<Homepage />} />
              <Route path="/projects" element={<Projects />} />
              {/* <Route path="projects">
                <Route index element={<List />} />
                <Route path=":id" element={<Single />} />
                <Route
                  path="new"
                  element={<New />}
                />
              </Route> */}
              {/* <Route path="profile">
                <Route index path=":id" element={<Profile />} />
              </Route> */}
            </Route>
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;