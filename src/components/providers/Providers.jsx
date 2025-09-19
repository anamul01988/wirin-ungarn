"use client";

import React from "react";
import { ThemeProvider } from "@material-tailwind/react";
import { AuthProvider } from "../../lib/auth-context";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  );
}
