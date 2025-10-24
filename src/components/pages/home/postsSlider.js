"use client";
import { Carousel } from "@material-tailwind/react";
import { commonCardChipData, slideData } from "@/lib/utils/utils";

const PostsSlider = ({ onTitleClick, postDetails }) => {
  console.log("postDetails 2222222222", postDetails, commonCardChipData);

  // Reorder the array to put the matching item first
  const getOrderedData = () => {
    if (postDetails && postDetails.title) {
      const matchingIndex = commonCardChipData.findIndex(
        (item) => item.title === postDetails.title
      );

      if (matchingIndex >= 0) {
        // Create a new array with the matching item first
        const reorderedData = [
          commonCardChipData[matchingIndex],
          ...commonCardChipData.filter((_, index) => index !== matchingIndex),
        ];
        return reorderedData;
      }
    }
    return commonCardChipData;
  };

  const orderedData = getOrderedData();
  console.log("orderedData 4444444444", orderedData);

  return (
    <Carousel
      className="submenu-carousel rounded-lg"
      loop
      autoplay={false}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
      prevArrow={({ handlePrev }) => (
        <button onClick={handlePrev} className="hidden prev-btn" />
      )}
      nextArrow={({ handleNext }) => (
        <button onClick={handleNext} className="hidden next-btn" />
      )}
    >
      {orderedData.map((item, idx) => (
        <div key={idx} className="relative h-full w-full">
          <div
            className="relative h-64 w-full cursor-pointer overflow-hidden rounded-lg"
            onClick={() => handleImageClick(item.route)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
            />
            {/* Overlay with title */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="text-white text-lg font-semibold">{item.title}</h3>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default PostsSlider;
