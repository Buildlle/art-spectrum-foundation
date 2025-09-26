import React, { ReactNode } from "react";

interface SlideProps {
  children: ReactNode;
  top?: string; // Default will be set
  h?: string;
  backgroundImage?: string; // Optional for solid backgrounds
  useOverlay?: boolean; // Toggle overlay gradient
  backgroundColor?: string; // For solid color backgrounds
}

// Slide Component
export const Slide = ({
  children,
  top = "0",
  h,
  backgroundImage,
  useOverlay = true,
  backgroundColor,
}: SlideProps) => {
  return (
    <div className={`sticky top-${top}`}>
      <section
        className={`h-${h} bg-cover bg-center bg-no-repeat flex items-center`}
        style={{
          backgroundImage: backgroundImage
            ? `${
                useOverlay
                  ? "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), "
                  : ""
              }url(${backgroundImage})`
            : undefined,
          backgroundColor: backgroundImage
            ? undefined
            : backgroundColor || "transparent",
        }}
      >
        <div className="w-full">{children}</div>
      </section>
    </div>
  );
};
