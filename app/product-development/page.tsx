import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function About() {
  const infoSections = [
    {
      title: "Our Mission",
      description: (
        <>
          <strong>
            Art Spectrum Foundation is dedicated to fostering creativity
          </strong>
          and providing opportunities for artists to grow, innovate, and make an
          impact.
          <strong>
            {" "}
            Through education, mentorship, and community-driven programs,{" "}
          </strong>
          we support the next generation of creatives.
        </>
      ),
    },
    {
      title: "Our Vision",
      description: (
        <>
          We envision a future where every artist, regardless of background, has
          access to the resources and platforms they need to succeed. By
          championing artistic expression, we aim to shape a society where
          creativity drives positive change.
        </>
      ),
    },
    {
      title: "Our Approach",
      description: (
        <>
          <strong> We believe in learning by doing.</strong> Our programs
          provide skill development, mentorship, and real-world opportunities,
          ensuring that creativity is not just cultivated but also applied to
          make a lasting difference.
        </>
      ),
    },
    {
      title: "Our Impact",
      description: (
        <>
          <strong>
            From skill acquisition workshops to cultural events in public
            spaces, ASF has touched countless lives.
          </strong>{" "}
          By providing safe creative hubs, we empower individuals to turn their
          talents into careers, fostering a vibrant and inclusive creative
          ecosystem.
        </>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <header className="bg-[#f5f5f5] flex flex-col justify-center items-center pt-50 pb-20">
        <h2 className="text-8xl font-bold">About</h2>
        <Breadcrumbs />
      </header>

      {/* Image Section */}
      <section className="bg-[#f5f5f5] w-full">
        <div className="container w-full mx-auto">
          <Image
            src="/images/img-20.jpg"
            alt="Header Image"
            width={500}
            height={300}
            className="w-full h-100 object-cover filter grayscale"
          />
        </div>
      </section>

      {/* Info Sections */}
      <section className="bg-[#f5f5f5] py-12">
        <div className="container mx-auto flex flex-wrap justify-center gap-6">
          {infoSections.map(({ title, description }, index) => (
            <InfoCard key={index} title={title} description={description} />
          ))}
        </div>

        <div className="container mx-auto p-28">
          <h2>
            Art Spectrum Foundation is a creative force dedicated to nurturing
            talent, fostering innovation, and transforming artistic potential
            into meaningful impact. Rooted in a deep commitment to empowerment,
            our initiatives provide young creatives with the skills, resources,
            and platforms they need to thrive. From skill acquisition to product
            development and vibrant community events, we create spaces where
            artistry meets opportunity. ASF is more than an organization—it’s a
            movement that celebrates creativity, fuels self-expression, and
            builds a future where art is both a passion and a powerful tool for
            change.
          </h2>
        </div>
      </section>
    </div>
  );
}

// Breadcrumbs Component
const Breadcrumbs = () => (
  <ul className="flex space-x-4 p-12">
    <li>
      <Link href="/">Home</Link>
    </li>
    <li>
      <ChevronRight />
    </li>
    <li>About</li>
  </ul>
);

// Info Card Component
const InfoCard = ({
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
