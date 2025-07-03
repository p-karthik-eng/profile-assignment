import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { clearProfile } from "../store/profileSlice";
import { useNavigate } from "react-router-dom";
import { clearLocalStorage } from "../utils/localStorage";

const ProfilePage: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);

  React.useEffect(() => {
    if (!profile) {
      setNotFound(true);
    }
  }, [profile]);

  const handleDelete = () => {
    if (confirm("Are you sure to delete your profile?")) {
      dispatch(clearProfile());
      clearLocalStorage();
      navigate("/profile-form");
    }
  };

  if (notFound) {
    return (
      <Box
        sx={{ minHeight: "80vh" }}
        width={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h5">No profile found !!</Typography>
        <Typography sx={{ mb: 2, mt: 1 }}>
          You can create one by clicking the button below.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/profile-form")}>
          Login
        </Button>
      </Box>
    );
  }

  if (!profile) return null;

  return (
    <Box p={4}>
      <Typography fontSize={26} sx={{ textDecoration: "underline" }}>
        Profile Details
      </Typography>
      <Typography sx={{ mt: 1 }}>Name: {profile.name}</Typography>
      <Typography>Email: {profile.email}</Typography>
      <Typography sx={{ mb: 1 }}>
        Age: {profile.age || "Not Provided"}
      </Typography>
      <Box mt={2}>
        <Button
          variant="outlined"
          onClick={() => navigate("/profile-form")}
          sx={{ mr: 2 }}
        >
          Edit
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete &amp; Logout
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePage;
