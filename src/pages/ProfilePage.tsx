import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { clearProfile } from "../store/profileSlice";
import { useNavigate } from "react-router-dom";
import { clearLocalStorage } from "../utils/localStorage";
import { deleteUser } from "../utils/api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


const ProfilePage: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) {
      setNotFound(true);
    }
  }, [profile]);

  const handleDelete = async () => {
    if (!profile || !profile.id) {
      setErrorMessage("No user ID found to delete.");
      setErrorDialogOpen(true);
      return;
    }
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(profile?.id as string);
      dispatch(clearProfile());
      clearLocalStorage();
      setSuccess("Profile deleted successfully ❌");
      setTimeout(() => navigate("/profile-form"), 1000);
    } catch (err) {
      console.log(err);
      setErrorMessage("Failed to delete user.");
      setErrorDialogOpen(true);
    } finally {
      setDeleteDialogOpen(false);
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
        <Typography variant="h5">No profile found </Typography>
        <Typography sx={{ mb: 2, mt: 1 }}>
          You can create user by clicking the login button.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/profile-form")}>
          Login
        </Button>
      </Box>
    );
  }

  if (!profile) return null;

  return (
    <Card sx={{ maxWidth: 500, margin: "2rem auto", boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Profile Details
        </Typography>

        <Typography sx={{ mt: 1 }}>Name: {profile.name}</Typography>
        <Typography>Email: {profile.email}</Typography>
        <Typography sx={{ mb: 2 }}>
          Age: {profile.age || "Not Provided"}
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => navigate("/profile-form")}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Delete
          </Button>
         
        </Box>
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Box sx={{ minWidth: 250 }}>
            Are you sure you want to delete your profile? 
          </Box>
        </DialogContent>
        <DialogActions sx={{ mb: 1, mr: 1 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            color="primary"
            size="small"
          >
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" size="small" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Box sx={{ minWidth: 250 }}>{errorMessage}</Box>
        </DialogContent>
        <DialogActions sx={{ mb: 1, mr: 1 }}>
          <Button
            onClick={() => setErrorDialogOpen(false)}
            color="primary"
            size="small"
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success messages */}
      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess(null)}
      >
        <Alert severity="success" onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default ProfilePage;
