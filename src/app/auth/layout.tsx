// app/(auth)/layout.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { SidebarProvider } from "@/context/SidebarContext";
// import Navbar from "@/components/Navbar";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setAuthenticated(true);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (!authenticated) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  return (
    <SidebarProvider>
      <div style={{ display: "flex" }}>
        <Navbar />
        <Sidebar />
        <main style={{ flexGrow: 1, padding: "24px", marginTop: "64px" }}>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
