"use client";

import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const menuItems = [
    { label: "WIU-Münzen", href: "/wiu-muenzen" },
    { label: "Soziale Projekte", href: "/soziale-projekte" },
    { label: "Ungarn-Insider", href: "/ungarn-insider" },
    { label: "Karriere", href: "/karriere" },
    { label: "Kooperationen", href: "/kooperationen" },
    { label: "Transparenz", href: "/transparenz" },
    { label: "Cookie-Richtlinie (EU)", href: "/cookie-richtlinie" },
  ];

  return (
    <footer className="w-full bg-gray-900 text-white mt-auto">
      <div className="max-w-screen-xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Logo / Info */}
        <div className="flex flex-col space-y-4">
          <div className="text-2xl font-bold">Wirin-Ungarn</div>
          <p className="text-gray-400 text-sm">
            Wirin-Ungarn ist Ihr Partner für Informationen und Projekte in
            Ungarn.
          </p>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span className="cursor-pointer hover:text-gray-400">
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Column 3: Social Media */}
        <div className="flex flex-col space-y-4">
          <p className="font-semibold">Folgen Sie uns:</p>
          <div className="flex space-x-4">
            <Link href="#">
              <FaFacebook size={20} className="hover:text-gray-400" />
            </Link>
            <Link href="#">
              <FaTwitter size={20} className="hover:text-gray-400" />
            </Link>
            <Link href="#">
              <FaInstagram size={20} className="hover:text-gray-400" />
            </Link>
            <Link href="#">
              <FaLinkedin size={20} className="hover:text-gray-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-gray-700 mt-8 py-4 text-center text-sm text-gray-400">
        &copy; 2025 Wirin-Ungarn. Alle Rechte vorbehalten.
      </div>
    </footer>
  );
}
