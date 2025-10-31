"use client";
import { Carousel } from "@material-tailwind/react";
import { landingCards, slideData } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";
import { useImperativeHandle, forwardRef, useRef } from "react";

const PostsSlider = forwardRef(({ onTitleClick, postDetails }, ref) => {
  const router = useRouter();
  const carouselRef = useRef(null);

  useImperativeHandle(ref, () => ({
    goToPrev: () => {
      const prevBtn = document.querySelector(".submenu-carousel .prev-btn");
      if (prevBtn) prevBtn.click();
    },
    goToNext: () => {
      const nextBtn = document.querySelector(".submenu-carousel .next-btn");
      if (nextBtn) nextBtn.click();
    },
  }));

  const handleImageClick = (route) => {
    router.push(route);
  };
  console.log("postDetails 2222222222", postDetails, landingCards);

  // Reorder the array to put the matching item first with circular order
  const getOrderedData = () => {
    if (postDetails && postDetails.title) {
      const matchingIndex = landingCards.findIndex(
        (item) => item.title === postDetails.title
      );

      if (matchingIndex >= 0) {
        // Create a new array with the matching item first, followed by items after it, then items before it
        const itemsBefore = landingCards.slice(0, matchingIndex);
        const itemsFromMatching = landingCards.slice(matchingIndex);
        const reorderedData = [...itemsFromMatching, ...itemsBefore];
        return reorderedData;
      }
    }
    return landingCards;
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
        <button
          onClick={handlePrev}
          className="prev-btn"
          style={{ visibility: "hidden", position: "absolute" }}
        />
      )}
      nextArrow={({ handleNext }) => (
        <button
          onClick={handleNext}
          className="next-btn"
          style={{ visibility: "hidden", position: "absolute" }}
        />
      )}
    >
      {orderedData.map((item, idx) => (
        <div key={idx} className="relative h-full w-full">
          <div
            className="relative h-full w-full cursor-pointer overflow-hidden rounded-lg"
            onClick={() => handleImageClick(item.route)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-contain transition-transform duration-300"
            />
            {/* Overlay with title */}
            {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="text-white text-lg font-semibold">{item.title}</h3>
            </div> */}
          </div>
        </div>
      ))}
    </Carousel>
  );
});

PostsSlider.displayName = "PostsSlider";

export default PostsSlider;
