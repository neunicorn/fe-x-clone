import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  SignUp,
  Login,
  HomePage,
  NotificationPage,
  ProfilePage,
} from "../../pages";
import { RightPanel, Sidebar } from "../../components";

const Router = () => {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
      </Routes>
      <RightPanel />
    </BrowserRouter>
  );
};

export default Router;
