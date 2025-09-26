import Image from "next/image";
import React from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { InfoCard } from "./InfoCard";

interface PageLayoutProps {
  title: string;
  sections?: { title: string; description: React.ReactNode }[];
  children?: React.ReactNode;
  image: string;
}

export const PageLayout = ({
  title,
  sections,
  children,
  image,
}: PageLayoutProps) => (
  <div>
    {/* Header */}
    <header className="bg-[#f5f5f5] flex flex-col justify-center items-center pt-50 pb-20">
      <h2 className="text-5xl lg:text-8xl font-bold">{title}</h2>
      <Breadcrumbs title={title} />
    </header>

    {/* Image Section */}
    <section className="bg-[#f5f5f5] w-full">
      <div className="container w-full mx-auto">
        <Image
          src={image}
          alt={`${title} Image`}
          width={500}
          height={300}
          className="w-full h-100 object-cover filter grayscale"
        />
      </div>
    </section>

    {/* Info Sections */}
    <section className="bg-[#f5f5f5] py-12">
      <div className="container mx-auto flex flex-wrap justify-center gap-6">
        {sections &&
          sections.map(({ title, description }, index) => (
            <InfoCard key={index} title={title} description={description} />
          ))}
      </div>
      <div className="container mx-auto p-8 lg:p-28">{children}</div>
    </section>
  </div>
);
