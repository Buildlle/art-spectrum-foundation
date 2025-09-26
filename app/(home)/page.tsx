// import ImageGallery from "@/components/ImageGallery";
import ImageGallery from "@/components/ImageGallery";
import { OurPrograms } from "@/components/OurPrograms";
import { Slide } from "@/components/Slides";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/AnimatedText";
import { ScrollFadeIn } from "@/components/ScrollFadeIn";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <div className="sticky top-6">
        <header
          className="h-[100vh] flex flex-col pt-[rem] lg:pt-[0rem] justify-center bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/hero-img.jpeg')",
          }}
        >
          {/* <div className="absolute inset-0 bg-[#ffeedd]/20 z-0" /> */}
          <div className="container mx-auto px-4 pt-50 text-white">
            <div className="max-w-6xl">
              <AnimatedText
                as="h2"
                className="text-4xl md:text-6xl lg:text-[8rem] font-bold leading-tight tracking-tight"
                data-buildll-id="hero-title"
                data-buildll-text="Empowering Creativity, Building Futures"
                data-buildll-type="text"
                data-buildll-editable="true"
              >
                Empowering&nbsp;Creativity, Building Futures
              </AnimatedText>
              <AnimatedText
                as="p"
                delay={0.3}
                className="my-4 md:mt-6 text-md lg:text-lg md:text-2xl leading-relaxed opacity-80 tracking-tight"
                data-buildll-id="hero-description"
                data-buildll-text="Supporting young creatives through skill development, artistic expression, and safe creative spaces."
                data-buildll-type="text"
                data-buildll-editable="true"
              >
                Supporting young creatives through skill development, artistic
                expression, and safe creative spaces.
              </AnimatedText>
              {/* <Button className="cursor-pointer text-lg mt-6 bg-blue-600 hover:bg-blue-700 text-white">
              Support Us
            </Button> */}
              <div className="flex space-x-4 py-4">
                <Button
                  className="text-lg capitalize p-8 cursor-pointer bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent)]/90 backdrop-blur-lg hover:text-white rounded-[3px]"
                  size="lg"
                >
                  Support Us
                </Button>
                <Link href="/about">
                  <Button
                    className="text-lg capitalize p-8 cursor-pointer bg-[var(--color-background)] text-foreground hover:bg-white/90 backdrop-blur-lg hover:text-black rounded-[3px]"
                    size="lg"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Brand Partners */}
      {/* <BrandPartners /> */}

      {/* Mission Statement */}
      <div className="sticky top-6">
        <Slide backgroundImage="/images/img-2.jpeg">
          {/* <div className="absolute inset-0 bg-[#c9e4ca]/20 z-0" /> */}
          <div className="h-[100vh] flex flex-col justify-center container mx-auto px-4 pt-[0%] text-white">
            <div className="max-w-6xl">
              <ScrollFadeIn>
                <h2 className="text-4xl md:text-6xl lg:text-[8rem] font-bold leading-tight tracking-tight"
                    data-buildll-id="mission-title"
                    data-buildll-text="Our Mission Statement"
                    data-buildll-type="text"
                    data-buildll-editable="true">
                  Our Mission Statement
                </h2>
              </ScrollFadeIn>
              <ScrollFadeIn delay={0.2}>
                <p className="my-4 md:mt-6 text-md lg:text-lg md:text-2xl leading-relaxed opacity-80 tracking-tight"
                   data-buildll-id="mission-description"
                   data-buildll-text="We foster creativity, empower artists, and provide platforms for innovation."
                   data-buildll-type="text"
                   data-buildll-editable="true">
                  We foster creativity, empower artists, and provide platforms
                  for innovation.
                </p>
              </ScrollFadeIn>

              <div className="flex space-x-4 py-4">
                <Button
                  className="text-lg capitalize py-8 px-12 lg:px-16 cursor-pointer bg-white text-black backdrop-blur-lg hover:bg-white/90 hover:text-black rounded-[3px]"
                  size="lg"
                >
                  Join Us
                </Button>
              </div>
            </div>
          </div>
        </Slide>
      </div>

      {/* Programs Section */}
      <OurPrograms programs={programs} />

      {/* Image Gallery */}
      <div className="">
        <ImageGallery />
      </div>

      {/* Call to Action */}
      <section
        className="relative h-[80vh] flex flex-col text-center bg-cover bg-right text-white bg-no-repeat py-34"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/img-6.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-[#bde0fe]/20 z-0" />
        <div className="flex flex-col px-4  justify-center items-center m-auto relative z-10">
          <ScrollFadeIn>
            <h2 className="text-4xl text-[#f5f5f5] md:text-6xl lg:text-[5rem] font-bold leading-tight tracking-tight">
              Support the Movement
            </h2>
          </ScrollFadeIn>
          <ScrollFadeIn delay={0.2}>
            <p className="mt-4 text-lg text-[#f5f5f5]/80 md:text-2xl relative">
              Join us in empowering the next generation of creatives.
            </p>
          </ScrollFadeIn>
          <div className="flex py-8">
            <Button
              className="text-lg capitalize p-8 cursor-pointer bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent)]/90 backdrop-blur-lg hover:text-white rounded-[3px]"
              size="lg"
            >
              Donate Now
            </Button>
          </div>
        </div>
      </section>

      {/* <CallToAction /> */}
    </main>
  );
}

// Program Data
const programs = [
  {
    title: "Get A Skill (GAS)",
    description:
      "Get a skill, have an idea! A program designed to equip young creatives with practical skills.",
    image: "/images/img-6.jpeg",
    buttonText: "Join Program",
    buttonLink: "/get-a-skill",
  },
  {
    title: "Product Development",
    description:
      "Creating innovative teaching aids and products that drive creativity in education.",
    image: "/images/img-20.jpg",
    buttonText: "Learn More",
    buttonLink: "/get-a-skill",
  },
  {
    title: "Eko Parks & Love (EPL)",
    description:
      "Bringing street creativity into public parks, offering safe spaces for artistic expression.",
    image: "/images/epl-img.webp",
    buttonText: "Learn More",
    buttonLink: "/get-a-skill",
  },
];
