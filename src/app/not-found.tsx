import React from "react";
import Link from "next/link";
import { Box, Typography, Button, Paper } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ background: "linear-gradient(135deg, #f3f4f6 0%, #e0e7ef 100%)" }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, sm: 6 },
          borderRadius: 4,
          textAlign: "center",
          maxWidth: 400,
        }}
      >
        <Typography variant="h2" color="primary" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Sorry! Something went wrong{" "}
          <span role="img" aria-label="sad">
            😢
          </span>
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          We could not find the page you were looking for.
        </Typography>
        <Button
          component={Link}
          href="/"
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2, px: 4, py: 1 }}
        >
          Go back to Home
        </Button>
      </Paper>
    </Box>
  );
};

export default NotFound;
