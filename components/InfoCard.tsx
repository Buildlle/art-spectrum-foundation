import React from "react";

export const InfoCard = ({
  title,
  description,
}: {
  title: string;
  description: React.ReactNode;
}) => (
  <li className="md:p-8 w-[300px] md:w-[325px] flex flex-col items-start p-8 gap-6 bg-white rounded-[3px] relative overflow-hidden z-0">
    <span className="w-3 h-3 mb-6 bg-[#4170e8] rounded-[3px]" />
    <div className="flex gap-3 pt-0">
      <h4 className="md:font-semibold font-medium text-lg leading-6 tracking-tight text-black">
        {title}
      </h4>
    </div>
    <div className="relative">
      <p className="opacity-90 md:text-md">{description}</p>
    </div>
  </li>
);
