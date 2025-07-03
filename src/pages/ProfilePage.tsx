import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { clearProfile } from "../store/profileSlice";
import { useNavigate } from "react-router-dom";
import { clearLocalStorage } from "../utils/localStorage";
import { deleteUser } from "../utils/api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";

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

  const handleDelete = async () => {
    if (!profile || !profile.id) {
      alert("No user ID found to delete.");
      return;
    }
    if (confirm("Are you sure to delete your profile?")) {
      try {
        await deleteUser(profile.id as string);
        dispatch(clearProfile());
        clearLocalStorage();
        navigate("/profile-form");
      } catch (error) {
        alert("Failed to delete user.");
      }
    }
  };

  const handleLogout = () => {
    dispatch(clearProfile());
    clearLocalStorage();
    navigate("/profile-form");
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
          size="small"
          startIcon={<EditIcon />}
          onClick={() => navigate("/profile-form")}
          sx={{ mr: 1 }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          sx={{ mr: 1 }}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="warning"
          size="small"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePage;
