"use client";

import { useState } from "react";
import {
  Drawer as MTDrawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";

export default function Drawer() {
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <Button onClick={openDrawer}>Open Drawer</Button>
      <MTDrawer open={open} onClose={closeDrawer} className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Sidebar Menu
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            ✕
          </IconButton>
        </div>
        <ul className="space-y-2">
          <li>
            <a href="#" className="text-blue-gray-700">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-gray-700">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-gray-700">
              Contact
            </a>
          </li>
        </ul>
      </MTDrawer>
    </>
  );
}
