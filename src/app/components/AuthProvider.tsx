// app/components/AuthProvider.tsx
"use client";
import { ReactNode, useEffect, useState } from "react";
import { auth } from "@/app/services/firebaseConfig"; // Adjust the import path as necessary
import { onAuthStateChanged } from "firebase/auth";
// import { useRouter } from "next/navigation";
import LoadingScreen from "../components/LoadingScreen";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
