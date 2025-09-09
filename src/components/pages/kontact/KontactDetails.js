import { kontactData } from "@/lib/utils/utils";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import React from "react";

const KontactDetails = ({ onBack }) => {
  return (
    <div className="p-4">
      <div className="w-full mx-auto">
        {/* Header Section */}
        <h1 className={kontactData.page.header.h1.style}>
          {kontactData.page.header.h1.text}
        </h1>

        {/* Content Section */}
        {kontactData.page.content.sections.map((section, index) => (
          <div key={index} className="mb-3">
            <p className={section.paragraph.text.style}>
              {section.paragraph.text}
            </p>
          </div>
        ))}

       <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-6 flex flex-col gap-6">
          <div>
            <Input
              size="lg"
              label="Dein Name"
              className="text-sm"
            />
          </div>
          <div>
            <Input
              size="lg"
              label="Deine E-Mail-Adresse"
              type="email"
              className="text-sm"
            />
          </div>
          <div>
            <Textarea
              size="lg"
              label="Deine Nachricht"
              className="text-sm"
            />
          </div>
        </div>

        <Typography variant="small" color="gray" className="mt-2 flex items-center gap-1 font-normal">
          Um zu bestätigen, dass ich kein Computer bin, schreibe ich die Zeichenfolge in das Feld darunter.
        </Typography>
        <Input
          size="lg"
          label="MLWF"
          className="mt-2 text-sm"
        />

        <Button className="mt-6 w-full bg-red-500 hover:bg-red-600" type="submit">
          NACHRICHT SENDEN
        </Button>
      </form>
      </div>
    </div>
  );
};

export default KontactDetails;
