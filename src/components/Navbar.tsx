import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.profile.data);

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Profile Management
        </Typography>
        {profile?.name ? (
          <Typography variant="subtitle1">welcome, {profile.name}</Typography>
        ) : (
          <Button color="inherit" onClick={() => navigate("/profile-form")}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
