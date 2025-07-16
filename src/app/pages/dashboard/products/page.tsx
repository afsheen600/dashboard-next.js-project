import React from "react";
import ProductsList from "@/app/products/ProductsList";
import { Box } from "@mui/material";

const Page = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100%",
          px: 0, // Remove horizontal padding
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            width: "100%",
            overflow: "hidden",
          }}
        >
          <ProductsList />
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
