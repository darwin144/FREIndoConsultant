/* eslint-disable no-unused-vars */
import React from "react";
import { RiWhatsappFill } from "react-icons/ri";

const WhatsApp = () => {
  return (
    <div className="fixed bottom-5 left-5 p-4 rounded-full bg-gray-300">
      <a href="https://wa.me/6281210011569">
        <RiWhatsappFill className="text-[#3BD776]" size={42} />
      </a>
    </div>
  );
};

export default WhatsApp;
