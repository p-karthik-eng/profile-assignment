import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileForm, ProfilePage, PageNotFound } from "./pages";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import type { RootState } from "./store";

function App() {
  const profile = useSelector((state: RootState) => state.profile.data);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {profile ? (
          <Route path="/" element={<Navigate to="/profile-page" />} />
        ) : (
          <Route path="/" element={<Navigate to="/profile-form" />} />
        )}
        <Route path="/profile-form" element={<ProfileForm />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
