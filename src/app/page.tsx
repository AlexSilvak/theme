"use client"
import { LoginForm } from "@/components/login-form";
import { useState, useEffect } from "react";
export default function Login(){

  const [themeColor, setThemeColor] = useState("zinc");
  const [themeMode, setThemeMode] = useState("light");

  useEffect(() => {
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeMode]);

  return (
      
        
     <>
     
     <LoginForm/>
     </>
  );
}
