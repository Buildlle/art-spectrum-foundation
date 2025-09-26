"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ScrollFadeIn } from "./ScrollFadeIn";

type Program = {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
};

type OurProgramsProps = {
  programs: Program[];
};

const bgColors = [
  "bg-[var(--color-fun-pink)]",
  "bg-[var(--color-fun-blue)]",
  "bg-[var(--color-fun-green)]",
];

export const OurPrograms: React.FC<OurProgramsProps> = ({ programs }) => {
  return (
    <div className="relative z-10 bg-[var(--color-accent)]">
      <div className="py-40 px-4 container mx-auto text-white">
        <div className="max-w-6xl">
          <ScrollFadeIn>
            <h2 className="text-4xl text-[#f5f5f5] md:text-6xl lg:text-[4rem] font-bold leading-tight tracking-tight">
              Our Programs
            </h2>
          </ScrollFadeIn>
          <ScrollFadeIn delay={0.2}>
            <p className="pt-4 pb-12 text-[#f5f5f5] opacity-80 text-md lg:text-lg md:text-2xl leading-relaxed tracking-tight">
              Hands-on learning, mentorship, and community engagement
            </p>
          </ScrollFadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className={`${
                bgColors[index % bgColors.length]
              } flex flex-col md:flex-row text-black rounded-[6px] overflow-hidden shadow-md`}
            >
              {/* Image Side */}
              <div className="w-full md:w-[220px] h-[220px] md:h-full">
                <Image
                  src={program.image}
                  alt={program.title}
                  width={220}
                  height={220}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Side */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="text-2xl font-bold mb-2">{program.title}</h4>
                  <p className="text-base leading-relaxed">
                    {program.description}
                  </p>
                </div>
                <div className="py-4">
                  <Link href={program.buttonLink}>
                    <Button
                      className="text-base capitalize py-4 px-4 cursor-pointer text-foreground rounded-full"
                      size="sm"
                      variant="link"
                    >
                      {program.buttonText}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
