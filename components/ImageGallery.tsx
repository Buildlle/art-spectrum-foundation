import Image from "next/image";
import { Slide } from "./Slides";
import { ScrollFadeIn } from "./ScrollFadeIn";

const images = [
  "https://drive.google.com/uc?export=view&id=14He9H4anMBe58gJrSlIaY-KYbBvOyNUr",
  "https://drive.google.com/uc?export=view&id=101zQsSc6HtB2uj6YBeHQSDximm6cMDIR",
  "https://drive.google.com/uc?export=view&id=15iVTfVyRAkWwZrqJfWmBWmXV7KX9UenZ",
  "https://drive.google.com/uc?export=view&id=18Ar5GGdhGWcOaIeM_RTJMnftosqdOCed",
  "https://drive.google.com/uc?export=view&id=1AhnorD1JqyqngIwndoyD0NSeUx2O_s4W",
  "https://drive.google.com/uc?export=view&id=1L7OAC1074t5HTWXGbAlOCSHxvNU3Qyvz",
  "https://drive.google.com/uc?export=view&id=1P2fNn4FuXCKIsXHBd5oKJ9fRLJC2ImFZ",
  "https://drive.google.com/uc?export=view&id=1Qx9J3fiCt_sOV_isnVvVwu8w4B12sWlp",
  "https://drive.google.com/uc?export=view&id=1XlBrq9xTjdj9FsC2-sAiHk5FJgwC9AqR",
  "https://drive.google.com/uc?export=view&id=1c0oFdrU9pqHKp2bOd98KhAM0X_zYyzrn",
  "https://drive.google.com/uc?export=view&id=1zQta_4smFFg_6NiDYY0mO34f2C4iqJj7",
  "https://drive.google.com/uc?export=view&id=1MLXxt25Xi__eE6PDl0OduCoi5pahZoET",
  "https://drive.google.com/uc?export=view&id=1Bg-WwrMCxGAzozsRGWRcuNWsXUqRuBK6",
];

export default function ImageGallery() {
  return (
    <Slide top="6" backgroundColor="#f5f5f5" useOverlay={false}>
      <div className="flex flex-col justify-center container mx-auto px-0 py-16 text-white">
        <div className="max-w-6xl">
          <ScrollFadeIn>
            <h2 className="text-4xl text-black py-8 px-4 md:text-6xl lg:text-[4rem] font-bold leading-tight tracking-tight">
              Gallery
            </h2>
          </ScrollFadeIn>
        </div>

        <div className="">
          <div className="grid md:grid-cols-3 gap-0">
            {images.map((src, index) => (
              <div
                key={index}
                className="overflow-hidden bg-blend-luminosity rounded-none"
              >
                <Image
                  src={src}
                  alt={`Gallery Image ${index + 1}`}
                  width={500}
                  height={350}
                  // className="w-full h-auto bg-blend-luminosity object-cover"
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}
