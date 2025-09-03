import { Carousel } from "@material-tailwind/react";
import { slideData } from "@/lib/utils/utils";

const SubMenu = () => {
  return (
      <Carousel
        className="rounded-lg"
        loop
        autoplay={false}
        prevArrow={({ handlePrev }) => (
          <button
            onClick={handlePrev}
            className="!absolute left-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg"
            aria-label="Previous"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        nextArrow={({ handleNext }) => (
          <button
            onClick={handleNext}
            className="!absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg"
            aria-label="Next"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      >
        {slideData.map((s, idx) => {
          const title = typeof s === "object" && s?.title ? s.title : `Slide ${idx + 1}`;
          const content = typeof s === "object" && s?.content ? s.content : String(s);

          return (
            <div key={idx} className="grid place-items-center">
              <div className="max-w-md w-[full] text-center">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{content}</p>
              </div>
            </div>
          );
        })}
      </Carousel>
  );
};

export default SubMenu;