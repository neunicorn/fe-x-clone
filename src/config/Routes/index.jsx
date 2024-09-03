import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  SignUp,
  Login,
  HomePage,
  NotificationPage,
  ProfilePage,
} from "../../pages";
import { LoadingSpinner, RightPanel, Sidebar } from "../../components";
import { useQuery } from "@tanstack/react-query";

const Router = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
        });
        const data = await res.json();
        if (!data.status) return null;
        if (!res.ok) throw new Error(data.message);

        console.log(`auth user: ${data}`);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center mx-auto">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  return (
    <BrowserRouter>
      {authUser && <Sidebar />}
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/notifications"
          element={authUser ? <NotificationPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/profile/:username"
          element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
        />
      </Routes>
      {authUser && <RightPanel />}
    </BrowserRouter>
  );
};

export default Router;
