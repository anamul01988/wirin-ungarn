import { fakeData } from "@/lib/utils/utils";
import { Typography } from "@material-tailwind/react";
const Indetails = ({ title, onBack, onOpenWissenswert }) => {
  return (
    <div>
      <button
        onClick={onBack}
        className="absolute top-4 left-4 flex items-center justify-center text-blue-700 hover:text-blue-900 p-1 z-10"
        aria-label="Back"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Title + Icon */}
      <div className="flex pt-10 items-start justify-start mb-6">
        <div className="flex-shrink-0 basis-[70px] h-[70px] w-[70px] flex items-start mr-3">
          <div
            className="w-full h-full cursor-pointer"
            style={{
              background: "radial-gradient(rgb(0 0 0 / 0.1), transparent)",
            }}
          >
            {fakeData.secondIcon}
          </div>
        </div>

        <div className="flex-1 pl-3">
          <Typography
            variant="h5"
            color="blue-gray"
            className="font-bold leading-snug mb-3"
            onClick={onOpenWissenswert}
          >
            {fakeData.title}
          </Typography>
          {/* Hero Image */}
          <div
            className="w-full h-56 md:h-72 bg-cover bg-center rounded-lg mb-6"
            style={{
              backgroundImage: `url('${fakeData.heroImage}')`,
            }}
          ></div>
          {/* Content */}
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-sm leading-relaxed text-left mb-5"
          >
            {fakeData.content}
          </Typography>
        </div>
      </div>

      {/* Second Section */}
      <div className="flex items-start justify-start mb-6">
        {/* Icon with fixed basis */}
        <div className="flex-shrink-0 basis-[70px] h-[70px] w-[70px] flex items-start justify-center mr-3">
          <div
            className="w-[100%] h-[100%]"
            style={{
              background: "radial-gradient(rgb(0 0 0 / 0.1), transparent)",
            }}
          >
            {fakeData.secondIcon}
          </div>
        </div>

        {/* Title takes remaining space */}
        <div className="flex-1 pl-3">
          <Typography
            variant="h5"
            color="blue-gray"
            className="font-bold leading-snug mb-3"
          >
            {fakeData.secondTitle}
          </Typography>

          {/* Content */}
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-sm leading-relaxed text-left mb-5"
          >
            {fakeData.secondContent}
          </Typography>
        </div>
      </div>

      {/* Third Section */}
      <div className="flex items-start justify-start mb-6">
        {/* Icon with fixed basis */}
        <div className="flex-shrink-0 basis-[70px] h-[70px] w-[70px] flex items-start justify-center mr-3">
          <div
            className="w-[100%] h-[100%]"
            style={{
              background: "radial-gradient(rgb(0 0 0 / 0.1), transparent)",
            }}
          >
            {fakeData.secondIcon}
          </div>
        </div>

        {/* Title takes remaining space */}
        <div className="flex-1 pl-3">
          <Typography
            variant="h5"
            color="blue-gray"
            className="font-bold leading-snug mb-3"
          >
            {fakeData.secondTitle}
          </Typography>

          {/* Content */}
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-sm leading-relaxed text-left mb-5"
          >
            {fakeData.secondContent}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Indetails;
