"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import { Box, CircularProgress } from "@mui/material";
import { SidebarProvider } from "@/context/SidebarContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <SidebarProvider>
      {" "}
      {/* Wrap everything with the provider */}
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1 }}>
          <Navbar />
          <Box sx={{ padding: "24px", marginTop: "64px" }}>{children}</Box>
        </Box>
      </Box>
    </SidebarProvider>
  );
}
