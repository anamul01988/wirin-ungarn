"use client";
import { Carousel } from "@material-tailwind/react";
import { slideData } from "@/lib/utils/utils";

const SubMenu = ({ onTitleClick }) => {
  return (
    <Carousel
      className="submenu-carousel rounded-lg"
      loop
      autoplay={false}
      prevArrow={({ handlePrev }) => (
        <button onClick={handlePrev} className="hidden prev-btn" />
      )}
      nextArrow={({ handleNext }) => (
        <button onClick={handleNext} className="hidden next-btn" />
      )}
    >
      {slideData.map((s, idx) => {
        const title =
          typeof s === "object" && s?.title ? s.title : `Slide ${idx + 1}`;
        const content =
          typeof s === "object" && s?.content ? s.content : String(s);

        return (
          <div key={idx} className="max-w-sm w-full text-center">
            <h3
              className="text-xl font-semibold mb-3 text-gray-800 cursor-pointer hover:text-blue-600"
              onClick={() => onTitleClick(title)}
            >
              {title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{content}</p>
          </div>
        );
      })}
    </Carousel>
  );
};

export default SubMenu;
