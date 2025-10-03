"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function WordPressResetRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Extract parameters from WordPress reset URL
    const key = searchParams.get("key");
    const login = searchParams.get("login");
    const action = searchParams.get("action");

    // If this is a password reset action with key and login
    if (action === "rp" && key && login) {
      // Redirect to our Next.js reset password page
      router.push(`/reset-password?key=${key}&login=${login}`);
    } else {
      // If no valid reset parameters, redirect to home
      router.push("/");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to password reset...</p>
      </div>
    </div>
  );
}
