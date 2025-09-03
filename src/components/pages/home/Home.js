import ImpressumModal from "@/components/ui/ImpressumModal";
import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold mb-4">Modal Demo</h1>
          <p className="text-xl text-muted-foreground">
            Click the button below to see the modal in action
          </p>
        </div>
        <ImpressumModal />
      </div>
    </div>
  );
}
