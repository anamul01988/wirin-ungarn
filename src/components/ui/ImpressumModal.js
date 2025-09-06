"use client";

import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

export default function ImpressumModal() {
  const route = useRouter();
  const routerServerGlobal = () => {
    route.push("/wissenwert");
  };
  // const handleOpen = () => routerServerGlobal();

  return (
    <>
      <Button
        onClick={routerServerGlobal}
        color="blue"
        size="lg"
        className="px-6 py-3 capitalize"
      >
        Impressum
      </Button>
    </>
  );
}
