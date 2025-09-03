import { fakeData } from "@/lib/utils/utils";
import {
  Typography,
} from "@material-tailwind/react";
const Indetails = () => {
  return (
    <div>
      {/* Title + Icon */}
      <div className="flex items-start justify-start mb-6">
        <div className="flex-shrink-0 basis-[70px] h-[70px] w-[70px] flex items-start mr-3">
          <div
            className="w-full h-full"
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
