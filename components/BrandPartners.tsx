import Image from "next/image";

const brandLogos = [
  "https://drive.google.com/uc?id=1_R6KSJqajCY4_uLgievM2IthtyuYQsdK",
  "https://drive.google.com/uc?id=1XE-2SALD7nmxmPXm6dgyYGMU9aQOYan3",
  "https://drive.google.com/uc?id=1mN2zpFhl-q8o6e3aTp76MmfVPm3mknCg",
  "https://drive.google.com/uc?id=1PYUQHHR70Sol5f9k9f0X5cTH7Lxtq1_E",
  "https://drive.google.com/uc?id=1t9FPpJuQvwOLXtEQFmAU7_CYMpNZxbp7",
  "https://drive.google.com/uc?id=1vI54vwlGWuDmFXb4jRhcuAXCOsiWw8Ya",
];

export default function BrandPartners() {
  return (
    <section className="container mx-auto px-5 pt-24 text-center">
      <div className="flex flex-wrap justify-center items-center gap-10">
        {brandLogos.map((src, index) => (
          <div
            key={index}
            className="w-40 h-20 flex items-center justify-center"
          >
            <Image
              src={src}
              alt={`Partner Logo ${index + 1}`}
              width={160}
              height={80}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
