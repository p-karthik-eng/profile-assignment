import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../store/profileSlice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store";
import { loginUser } from "../utils/api";
import { saveToLocalStorage } from "../utils/localStorage";

const ProfileForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const existingProfile = useSelector((state: RootState) => state.profile.data);

  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingProfile) {
      setForm({
        name: existingProfile.name,
        email: existingProfile.email,
        age: existingProfile.age?.toString() || "",
      });
    }
  }, [existingProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    if (!form.name || form.name.length < 3) {
      return "Name must be at least 3 characters";
    }
    if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      return "Invalid email";
    }
    if (form.age && isNaN(Number(form.age))) {
      return "Age must be a number";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const err = validate();
    if (err) return setError(err);

    const payload = {
      name: form.name,
      email: form.email,
      age: form.age ? Number(form.age) : undefined,
    };

    try {
      const user = await loginUser(form.name, payload);
      dispatch(setProfile(user));
      saveToLocalStorage(user);
      setSuccess(true);
      setTimeout(() => navigate("/profile-page"), 1000);
    } catch (error) {
      setError("Failed to save profile");
      setLoading(false);
    }
  };

  return (
    <Box
      minHeight="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <form onSubmit={handleSubmit}>
        <Paper
          elevation={2}
          sx={{
            p: 4,
            maxWidth: 350,
            width: "100%",
            borderRadius: 0.5,
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
            Profile Form
          </Typography>
          <TextField
            label="Name"
            name="name"
            fullWidth
            sx={{ mb: 2 }}
            value={form.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            sx={{ mb: 2 }}
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            fullWidth
            sx={{ mb: 2 }}
            value={form.age}
            onChange={handleChange}
          />
          <Button
            type="submit"
            disabled={loading}
            variant="contained"
            fullWidth
            sx={{ mt: 1 }}
          >
            {existingProfile
              ? loading
                ? "Updating..."
                : "Update Profile"
              : loading
              ? "Saving..."
              : "Save Profile"}
          </Button>
          {error && (
            <Typography color="error" mt={2} textAlign="center">
              {error}
            </Typography>
          )}
        </Paper>
      </form>
      <Snackbar
        open={success}
        autoHideDuration={2000}
        message="Profile saved!"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </Box>
  );
};

export default ProfileForm;
