"use client";

import React from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Typography} from "@material-tailwind/react";

const Breadcrumb = ({
  customItems = null,
  showHome = true,
  separator = "/",
  className = "",
  isSinglePage = false,
}) => {
  const pathname = usePathname();

  // Route mapping for better display names
  const routeNames = {
    "": "Home",
    sprachkurs: "Sprachkurs",
    kategorien: "Kategorien",
    "kulinarische-seele": "Kulinarische Seele",
    kreuzwortraetsel: "Kreuzworträtsel",
    "einfach-lesen": "Einfach Lesen",
    wissenswert: "Wissenswert",
    liedtexte: "Liedtexte",
    shorts: "Shorts",
    veranstaltungen: "Veranstaltungen",
    ausflugsziele: "Ausflugsziele",
    posts: "Posts",
    profile: "Profile",
    coin: "Coin",
    "anki-karten": "Anki Karten",
    zahlentrainer: "Zahlentrainer",
    "kultour-ungarn": "Kultour Ungarn",
    "ungarisch-lernen": "Ungarisch Lernen",
    philosophie: "Philosophie",
    "ueber-uns": "Über Uns",
    karriere: "Karriere",
    kontakt: "Kontakt",
    impressum: "Impressum",
    "cookie-richtlinie-eu": "Cookie Richtlinie EU",
    datenschutz: "Datenschutz",
    "die-nutzung-des-oeffentlichen-verkehrs-in-ungarn":
      "Öffentlicher Verkehr in Ungarn",
  };

  // Generate breadcrumb items from pathname
  const generateBreadcrumbItems = () => {
    if (customItems) return customItems;

    const pathSegments = pathname.split("/").filter(Boolean);
    const items = [];

    // Add home if requested
    if (showHome) {
      items.push({
        label: "Home",
        href: "/",
        isActive: pathname === "/",
      });
    }

    // Build breadcrumb items from path segments
    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;

      items.push({
        label:
          routeNames[segment] ||
          segment.charAt(0).toUpperCase() + segment.slice(1),
        href: isLast ? null : currentPath,
        isActive: isLast,
      });
    });

    return items;
  };

  const breadcrumbItems = generateBreadcrumbItems();

  if (breadcrumbItems.length <= 1) return null;

  return (
    <nav
      className={`flex items-center space-x-2 text-sm ${className} ${
        isSinglePage && "bg-[#4a7c59] text-white px-5"
      }`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span
                className={`mx-2 ${!isSinglePage && "text-gray-400"}`}
                aria-hidden="true"
              >
                {separator}
              </span>
            )}
            {item.isActive ? (
              <Typography
                variant="small"
                className={`font-medium ${!isSinglePage && "text-gray-600"}`}
                aria-current="page"
              >
                {item.label}
              </Typography>
            ) : (
              <Link
                href={item.href}
                className={`hover:underline transition-colors ${
                  !isSinglePage && "text-blue-600 hover:text-blue-800"
                }`}
              >
                <Typography variant="small" className="font-medium">
                  {item.label}
                </Typography>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
