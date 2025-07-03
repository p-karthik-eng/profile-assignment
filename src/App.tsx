import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileForm, ProfilePage, PageNotFound } from "./pages";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/profile-form" />} />
        <Route path="/profile-form" element={<ProfileForm />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
