import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import Projects from "./pages/projects/Projects";
import Project from "./pages/project/Project";
import Profile from "./pages/profile/Profile";
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme.js';
import Movements from "./pages/payments/Movements.jsx";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {currentUser ? (
              <>
                <Route path="/">
                  <Route index element={<Homepage />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="movements" element={<Movements />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="project">
                    <Route index path=":id" element={<Project />} />
                  </Route>
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
      </ThemeProvider>
    </div>
  );
}

export default App;