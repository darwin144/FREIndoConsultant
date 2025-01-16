/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { HiBadgeCheck } from "react-icons/hi";

export default function Card({ vector, icon, title, category, desc, alt }) {
  return (
    <div className="flex flex-col gap-5 rounded-xl shadow-md p-6 group">
      <div className="rounded-full p-5 w-fit h-fit bg-[#EDF7ED] group-hover:bg-[#265093] transition duration-300">
        <img
          src={vector}
          alt={alt}
          className="transition duration-300 group-hover:scale-x-[-1] group-hover:filter group-hover:invert"
        />
      </div>
      <span className="text-3xl text-black font-medium uppercase">{title}</span>
      <span className="text-xl text-black font-medium">{category}</span>
      <ul className="flex flex-col gap-3">
        {desc.map((item, id) => (
          <li key={id} className="flex gap-2 items-center">
            <HiBadgeCheck className="w-5 h-5 text-[#265093]" />
            <span className="font-medium text-xl">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
