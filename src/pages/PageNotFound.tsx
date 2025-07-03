import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      textAlign="center"
      sx={{ backgroundColor: "#f5f5f5", p: 2, height: "80vh" }}
    >
      <Typography variant="h1" fontWeight={700} color="primary">
        404
      </Typography>
      <Typography variant="h5" mt={1} mb={1}>
        Oops! Page not found.
      </Typography>
      <Typography variant="body1" maxWidth="400px">
        The page you're looking for doesn't exist or Moved to another page.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => navigate("/profile-form")}
      >
        Go to Profile Form
      </Button>
    </Box>
  );
};

export default PageNotFound;
