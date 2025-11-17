"use client";
import { landingCards } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";
import {
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
  useRef,
} from "react";

const PostsSlider = forwardRef(({ onTitleClick, postDetails }, ref) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [orderedData, setOrderedData] = useState([]);
  const orderedDataRef = useRef([]);

  // Reorder the array to put the matching item first with circular order
  useEffect(() => {
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

    const data = getOrderedData();
    setOrderedData(data);
    orderedDataRef.current = data;
    setCurrentIndex(0); // Start at first item (which is the matching one)
  }, [postDetails]);

  useImperativeHandle(
    ref,
    () => ({
      goToPrev: () => {
        setCurrentIndex((prev) => {
          const data = orderedDataRef.current;
          if (prev <= 0) {
            return data.length - 1;
          }
          return prev - 1;
        });
      },
      goToNext: () => {
        setCurrentIndex((prev) => {
          const data = orderedDataRef.current;
          if (prev >= data.length - 1) {
            return 0;
          }
          return prev + 1;
        });
      },
    }),
    []
  );

  const handleImageClick = (route) => {
    router.push(route);
  };

  if (orderedData.length === 0) {
    return null;
  }

  const currentItem = orderedData[currentIndex];

  return (
    <div
      className="cursor-pointer inline-flex items-center justify-center"
      onClick={() => handleImageClick(currentItem.route)}
      style={{
        width: "auto",
        height: "auto",
        maxWidth: "100%",
        maxHeight: "100%",
      }}
    >
      <img
        src={currentItem.image}
        alt={currentItem.title || "Post image"}
        className="slider-image"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          display: "block",
          borderRadius: "12px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
        }}
      />
    </div>
  );
});

PostsSlider.displayName = "PostsSlider";

export default PostsSlider;
