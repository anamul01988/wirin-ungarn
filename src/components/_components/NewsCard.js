import React from "react";
import { FaHeart, FaComment } from "react-icons/fa";

const NewsCard = ({ date, category, categoryIcon, author, authorAvatar, title, description, link, quote }) => {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg flex flex-col md:flex-row">
      {/* Left side content */}
      <div className="flex  md:flex-row items-start space-y-4 md:space-x-4 md:space-y-0">
        <div className="flex-none flex flex-col justify-between items-center relative">
          <span className="text-base uppercase mb-0.5 text-[#436f4d] leading-[14px]">
            {date.month}
          </span>
          <span className=" top-[17px] text-xl font-bold leading-tight text-[#436f4d]">
            {date.day}
          </span>

          <div className=" top-[40px] text-[#436f4d]">
            <span className="block text-xs">{date.year}</span>
            <span className="block text-xs">{date.time}</span>
          </div>
          <div className="clear-both"></div>

          <div className="text-xs uppercase mt-10">
            <div className="tooltip" data-tooltip="Mobilität">
              <img
                src={categoryIcon}
                alt="Mobilität"
                className="w-9 h-9"
              />
            </div>
          </div>

          <div className="mt-2 ml-3">
            <div className="flex items-center">
              <img
                alt=""
                src="https://secure.gravatar.com/avatar/3fe1f16e7ca2bab216ce52edbd66d39f?s=48&d=mm&r=g"
                srcSet="https://secure.gravatar.com/avatar/3fe1f16e7ca2bab216ce52edbd66d39f?s=96&d=mm&r=g 2x"
                className="w-8 h-8 rounded-full"
                height="48"
                width="48"
              />
            </div>
            <div className="text-[10px] uppercase">Markus</div>
          </div>
        </div>

        {/* Vertical divider */}
        <div className="hidden md:block w-5 bg-[#436f4d] self-stretch"></div>

        <div>
          <p className="text-base font-semibold text-gray-600">
            INTELLIGENTE AUTOBAN M1: ENDE DER STAU IN SICHT?
          </p>
          <span className="text-[12px] block mt-[5px] normal-case">
            Nach 20 Jahren gibt es einen Wechsel an der Spitze des
            Fidesz-Wahlkampfteams. Der Stratege Balázs Orbán übernimmt. Der
            Artikel beleuchtet seine Person, seine Aufgaben und die Gründe für
          </span>
          <p className="text-red-900 text-[11px]">
            <a
              href="https://telex.hu/belfold/2025/09/08/orban-balazs-miniszterelnoki-tanacsado-kampanyfonok"
              target="_blank"
            >
              https://telex.hu/belfold/2025/09/08/orban-balazs-miniszterelnoki
            </a>
          </p>

          <blockquote className="text-[0.7em] text-left m-[0_0_0_1px] p-[0_0_0_37px] bg-[url('https://wir-in-ungarn.hu/wiucontent/themes/grimag-child-theme/assets/images/quote.jpg')] bg-[top_left] bg-no-repeat bg-[length:30px] min-h-[30px]">
            Balázs Orbán ist nicht nur ein Wahlkampf-Typ, er ist auch einer der
            Denker hinter der Langfrist-Strategie des Landes. Seine Ideen zur.
          </blockquote>
          <div className="flex items-center justify-between mt-4">
            {/* Left: Flag */}
            <div>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg"
                alt="Hungary Flag"
                className="w-7 h-5 rounded-sm shadow-sm"
              />
            </div>

            {/* Middle: Icons */}
            <div className="flex space-x-2">
              <button className="p-1.5 bg-[#436f4d] text-white rounded-md hover:bg-green-700">
                <FaHeart size={18} />
              </button>
              <button className="p-1.5 bg-[#436f4d] text-white rounded-md hover:bg-green-700">
                <FaComment size={18} />
              </button>

              {/* Right: Button */}
              <a
                href="#"
                className="bg-[#436f4d] text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                ZUR SEITE
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewsCard;
