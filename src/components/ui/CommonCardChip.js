"use client";

import React, { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import PostsSlider from "../pages/home/postsSlider";

// CSS styles matching z.html design
const sliderModalStyles = `
  .slider-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .slider-modal.active {
    display: block;
    opacity: 1;
  }

  .slider-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .slider-container::before {
    content: '';
    height: 5%;
    flex-shrink: 0;
    background: transparent;
  }

  .slider-container::after {
    content: '';
    height: 5%;
    flex-shrink: 0;
    background: transparent;
  }

  .slider-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5%;
    overflow: hidden;
    background: rgba(50, 50, 50, 0.5);
  }

  .slider-image-wrapper {
    position: relative;
    display: inline-block;
    max-width: 100%;
    max-height: 100%;
  }

  // .slider-image {
  //   display: block;
  //   max-width: 100%;
  //   max-height: 100%;
  //   width: auto;
  //   height: auto;
  //   object-fit: contain;
  //   border-radius: 12px;
  //   box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  // }

  .slider-logo {
    position: absolute;
    bottom: 3px;
    right: -266px;
    max-width: 60%;
    min-width: 120px;
    /* width: 354px; */
    height: auto;
    z-index: 10002;
    pointer-events: none;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  }

  .slider-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #333;
    transition: all 0.3s ease;
    z-index: 10001;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .slider-arrow:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
  }

  .slider-arrow:active {
    transform: translateY(-50%) scale(0.95);
  }

  .slider-arrow.prev {
    left: 12%;
  }

  .slider-arrow.next {
    right: 12%;
  }

  .slider-arrow::before {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
  }

  .slider-arrow.prev::before {
    border-width: 12px 18px 12px 0;
    border-color: transparent #333 transparent transparent;
    margin-right: 3px;
  }

  .slider-arrow.next::before {
    border-width: 12px 0 12px 18px;
    border-color: transparent transparent transparent #333;
    margin-left: 3px;
  }

  .slider-close {
    position: absolute;
    top: 65px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 28px;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 10001;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    line-height: 1;
  }

  .slider-close:hover {
    background: white;
    transform: rotate(90deg) scale(1.1);
  }

  @media (max-width: 768px) {
    .slider-arrow {
      width: 50px;
      height: 50px;
      font-size: 20px;
    }

    .slider-arrow.prev {
      left: 10px;
    }

    .slider-arrow.next {
      right: 10px;
    }

    .slider-close {
      width: 40px;
      height: 40px;
      font-size: 24px;
      top: 10px;
      right: 10px;
    }

    .slider-logo {
      // width: 150px;
      // min-width: 100px;
      // max-width: 45%;
      bottom: 15px;
      right: 15px;
    }
  }

  @media (max-width: 480px) {
    .slider-logo {
      // width: 120px;
      // min-width: 80px;
      // max-width: 50%;
      bottom: 10px;
      right: 10px;
    }
  }

`;

export default function CommonCardChip({
  open,
  setOpen,
  handleOpen,
  postDetails,
}) {
  const route = useRouter();
  const carouselRef = useRef(null);
  const modalRef = useRef(null);

  // Inject CSS styles when component mounts
  useEffect(() => {
    const styleId = "slider-modal-styles";
    let styleElement = document.getElementById(styleId);

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      styleElement.textContent = sliderModalStyles;
      document.head.appendChild(styleElement);
    }

    // Cleanup function to remove styles when component unmounts
    return () => {
      const element = document.getElementById(styleId);
      if (element) {
        element.remove();
      }
    };
  }, []);

  // Handle modal open/close and body scroll
  useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.classList.add("active");
      document.body.style.overflow = "hidden";
    } else if (modalRef.current) {
      modalRef.current.classList.remove("active");
      document.body.style.overflow = "";
    }
  }, [open]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleOpen();
      } else if (e.key === "ArrowLeft") {
        if (carouselRef.current) {
          carouselRef.current.goToPrev();
        }
      } else if (e.key === "ArrowRight") {
        if (carouselRef.current) {
          carouselRef.current.goToNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handleOpen]);

  // Prevent wheel scroll on modal
  useEffect(() => {
    if (!open || !modalRef.current) return;

    const handleWheel = (e) => {
      e.preventDefault();
    };

    modalRef.current.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      if (modalRef.current) {
        modalRef.current.removeEventListener("wheel", handleWheel);
      }
    };
  }, [open]);

  const handleShowDetails = (title) => {
    route.push("/wissenswert");
  };

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      handleOpen();
    }
  };

  return (
    <div ref={modalRef} className="slider-modal" onClick={handleBackdropClick}>
      <div className="slider-container">
        <button
          className="slider-close"
          onClick={handleOpen}
          aria-label="Close slider"
        >
          &times;
        </button>
        <button
          className="slider-arrow prev"
          onClick={() => {
            if (carouselRef.current) {
              carouselRef.current.goToPrev();
            }
          }}
          aria-label="Previous"
        />
        <div className="slider-content">
          <div className="slider-image-wrapper">
            <PostsSlider
              ref={carouselRef}
              postDetails={postDetails}
              onTitleClick={handleShowDetails}
            />
            <img
              // src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 100'%3E%3Crect fill='%2352b788' width='300' height='100' rx='10'/%3E%3Ctext x='150' y='35' font-family='Arial, sans-serif' font-size='20' font-weight='bold' fill='white' text-anchor='middle'%3EKLICK AUF DAS BILD%3C/text%3E%3Ctext x='150' y='65' font-family='Arial, sans-serif' font-size='20' font-weight='bold' fill='white' text-anchor='middle'%3EZUR DETAILANSICHT%3C/text%3E%3C/svg%3E"
              src="/assets/click-for-detailview.png"
              alt="Click for detail"
              className="slider-logo"
            />
          </div>
        </div>
        <button
          className="slider-arrow next"
          onClick={() => {
            if (carouselRef.current) {
              carouselRef.current.goToNext();
            }
          }}
          aria-label="Next"
        />
      </div>
    </div>
  );
}
