"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import LoginForm from "@/app/components/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/pages/dashboard");
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <LoginForm />
    </div>
  );
}
