"use client";
import React from 'react';
import { useRouter } from "next/navigation";

const CalendarMenu = () => {
  const route = useRouter();
  
  // Mock data for calendar/name days - you can replace this with your actual data
const namedays = [
  { weekday: "Do", date: "07.08", names: "Gábor", route: "/namenstage/gabor" },
  { weekday: "Fr", date: "08.08", names: "Erzsebet, Janós", route: "/namenstage/erzsebet" },
  { weekday: "Sa", date: "09.08", names: "Katalin", route: "/namenstage/katalin" },
  { weekday: "So", date: "10.08", names: "Julika, Andal", route: "/namenstage/julika" },
  { weekday: "Mo", date: "11.08", names: "Richard", route: "/namenstage/richard" },
  { weekday: "Di", date: "12.08", names: "Mariann, Tibor", route: "/namenstage/mariann" },
];


  // Helper function to split array into chunks of specified size - just like in LandingPage
  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  return (
    <div className="hover-menu calendar-hover-menu">
       {namedays.map((day, i) => (
        <div
          key={i}
          className="menu-item cursor-pointer"
          onClick={() => route.push(day.route)}
        >
          <span className="nameday-weekday">{day.weekday}</span>
          <span className="nameday-date">{day.date}</span>
          <span className="nameday-name">{day.names}</span>
        </div>
      ))}
       <div className="menu-footer">alle anzeigen</div>
    </div>
  );
};

export default CalendarMenu;