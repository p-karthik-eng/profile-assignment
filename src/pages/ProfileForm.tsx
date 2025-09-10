import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Card,
  CardContent,
  Alert,
  Divider,
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
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
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
   if (!form.email || !/^[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]{0,63})@gmail\.com$/.test(form.email)) {
  return "Invalid email";
}

     if (form.age) {
      const ageNum = Number(form.age);
      if (isNaN(ageNum)) return "Age must be a number";
      if (ageNum < 1 || ageNum > 120) return "Age must be between 1 and 120";
    }
    return "";
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const err = validate();
    if (err) {
      setError(err);
      setLoading(false);
      return;
    }

    const payload = {
      name: form.name,
      email: form.email,
      age: form.age ? Number(form.age) : undefined,
    };

    try {
      const user = await loginUser(form.name, payload);
      dispatch(setProfile(user));
      saveToLocalStorage(user);
      setSuccess(
        existingProfile
          ? "Profile updated successfully 🎉"
          : "Profile created successfully 🎉"
      );
      setTimeout(() => navigate("/profile-page"), 1000);
    } catch (err) {
      console.log(err);
      setError("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minHeight="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={2}
    >
      <Card sx={{ maxWidth: 420, width: "100%", borderRadius: 3, boxShadow: 6 }}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            textAlign="center"
            fontWeight={600}
          >
            {existingProfile ? "Edit Profile" : "Create Profile"}
          </Typography>

          <Divider sx={{ mb: 3 }} />

         <Box
  component="form"
  onSubmit={handleSubmit}
  sx={{ display: "grid", gap: 2, mt: 2 }}
>
  <TextField
    label="Name"
    name="name"
    fullWidth
    value={form.name}
    onChange={handleChange}
    required
  />
  <TextField
    label="Email"
    name="email"
    type="email"
    fullWidth
    value={form.email}
    onChange={handleChange}
    required
  />
  <TextField
    label="Age"
    name="age"
    type="number"
    fullWidth
    value={form.age}
    onChange={handleChange}
  />

  {/* Buttons side by side */}
  <Box display="flex" gap={2}>
    <Button
      type="submit"
      disabled={loading}
      variant="contained"
      sx={{ flex: 1 }}
    >
      {existingProfile
        ? loading
          ? "Updating..."
          : "Update Profile"
        : loading
        ? "Saving..."
        : "Create Profile"}
    </Button>

    <Button
      type="button"
      variant="outlined"
      sx={{ flex: 1 }}
      onClick={() => setForm({ name: "", email: "", age: "" })}
    >
      Clear
    </Button>
  </Box>
</Box>

        </CardContent>
      </Card>

      {/* Snackbar for errors */}
      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>

      {/* Snackbar for success */}
      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess(null)}
      >
        <Alert severity="success" onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfileForm;
