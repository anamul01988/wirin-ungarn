"use client";

import { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";

export default function Modal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} color="blue">
        Open Modal
      </Button>
      <Dialog open={open} handler={handleOpen} className="outline-none border-4 border-[#406c4d]">
        <DialogHeader>Modal Title</DialogHeader>
        <DialogBody divider>This is a reusable modal component.</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button color="green" onClick={handleOpen}>
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
