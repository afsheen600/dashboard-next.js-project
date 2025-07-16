"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme as useMuiTheme, Theme } from "@mui/material/styles";
import { useMediaQuery, Snackbar, Alert } from "@mui/material";
import { auth } from "@/app/services/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import LoadingScreen from "@/app/components/LoadingScreen";

interface ClientAppWrapperProps {
  children: (
    props: {
      isMobile: boolean;
      theme: Theme;
      user?: { displayName?: string };
    } & Record<string, any>
  ) => React.ReactNode;
  [key: string]: any; // Accept any other props (like dashboardData, settingsData, etc.)
}

export default function ClientAppWrapper({
  children,
  ...rest
}: ClientAppWrapperProps) {
  const router = useRouter();
  const theme = useMuiTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [authState, setAuthState] = useState<{
    user: User | null;
    isAuthenticated: boolean;
  }>({ user: null, isAuthenticated: false });

  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthState({ user, isAuthenticated: !!user });
      setLoading(false);
      if (!user) router.push("/login");
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <LoadingScreen />;

  return (
    <>
      {children({
        isMobile,
        theme,
        user: { displayName: authState.user?.displayName || undefined },
        ...rest, // 👈 Spread extra props like dashboardData, settingsData, etc.
      })}
      {snackbar && (
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar(null)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => setSnackbar(null)}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
