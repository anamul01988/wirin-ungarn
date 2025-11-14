"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/_components/Loader";

function WordPressResetRedirectContent() {
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
      <Loader size="large" text="Redirecting to password reset..." />
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Loader size="large" text="Loading..." />
    </div>
  );
}

export default function WordPressResetRedirect() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <WordPressResetRedirectContent />
    </Suspense>
  );
}
