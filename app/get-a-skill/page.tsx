import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import React from "react";

export default function GetASkill() {
  const infoSections = [
    {
      title: "What is Get A Skill?",
      description: (
        <>
          <strong>Get A Skill (GAS)</strong> is a flagship youth empowerment
          program by Art Spectrum Foundation designed to help young people
          acquire practical, creative, and digital skills during the holidays.
          Through mentorship and hands-on learning, students transform ideas
          into action.
        </>
      ),
    },
    {
      title: "Who Can Apply?",
      description: (
        <>
          The program is open to secondary school students and recent graduates
          between <strong>ages 13–20</strong> with an interest in creativity,
          technology, or entrepreneurship. No prior experience is required —
          just curiosity and commitment.
        </>
      ),
    },
    {
      title: "Program Highlights",
      description: (
        <>
          <ul className="list-disc list-inside space-y-1">
            <li>Digital design & content creation</li>
            <li>Creative entrepreneurship</li>
            <li>Teaching aid development</li>
            <li>Team projects & mini exhibitions</li>
          </ul>
        </>
      ),
    },
    {
      title: "Why Join?",
      description: (
        <>
          Participants gain{" "}
          <strong>
            practical skills, mentorship, a creative community, and exposure
          </strong>{" "}
          to real-world projects. Whether you&apos;re planning to become an
          artist, teacher, or innovator — this is a launchpad.
        </>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <header className="bg-[#f5f5f5] container items-center flex flex-col pt-50 pb-20">
        <h2 className="text-8xl font-bold">Get a skill</h2>
        <div className="flex space-x-4 py-4">
          <Button
            className="text-base capitalize py-4 px-4 cursor-pointer text-foreground rounded-full"
            size="lg"
            variant="link"
          >
            Enroll Now
            <ArrowDown className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </header>

      {/* Image Section */}
      <section className="bg-[var(--color-fun-pink)] w-full">
        <div className="container w-full mx-auto">
          {/* <Image
            src="/images/img-20.jpg"
            alt="Header Image"
            width={500}
            height={300}
            className="w-full h-100 object-cover filter grayscale"
          /> */}
        </div>
      </section>

      {/* Info Sections */}
      <section className="bg-[var(--color-fun-green)] py-12">
        <div className="container mx-auto flex flex-wrap justify-center gap-6">
          {infoSections.map(({ title, description }, index) => (
            <InfoCard key={index} title={title} description={description} />
          ))}
        </div>
      </section>

      <section className="bg-[#F5F5F5] py-12">
        <section className="py-16">
          <div className="container mx-auto max-w-2xl px-4">
            <h3 className="text-4xl font-bold mb-8 text-center text-black">
              Enroll Now
            </h3>
            <form className="p-8 space-y-8">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-black mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:ring-[0.5px] focus:ring-[var(--color-accent)]"
                />
              </div>

              {/* Age */}
              <div>
                <label
                  htmlFor="age"
                  className="block text-lg font-medium text-black mb-2"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  required
                  className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:ring-[0.5px] focus:ring-[var(--color-accent)]"
                />
              </div>

              {/* Education Level */}
              <div>
                <label
                  htmlFor="school"
                  className="block text-lg font-medium text-black mb-2"
                >
                  School / Education Level
                </label>
                <input
                  type="text"
                  id="school"
                  name="school"
                  required
                  placeholder="e.g. SS3, Recent Graduate"
                  className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:ring-[0.5px] focus:ring-[var(--color-accent)]"
                />
              </div>

              {/* Skill Interest */}
              <div>
                <label
                  htmlFor="interests"
                  className="block text-lg font-medium text-black mb-2"
                >
                  Skill Interest
                </label>
                <select
                  id="interests"
                  name="interests"
                  defaultValue=""
                  className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:ring-[0.5px] focus:ring-[var(--color-accent)] bg-transparent"
                >
                  <option value="" disabled>
                    Select an area
                  </option>
                  <option value="digital-design">Digital Design</option>
                  <option value="content-creation">Content Creation</option>
                  <option value="teaching-aids">Teaching Aids</option>
                  <option value="entrepreneurship">
                    Creative Entrepreneurship
                  </option>
                </select>
              </div>

              {/* Guardian Contact */}
              <div>
                <label
                  htmlFor="parentContact"
                  className="block text-lg font-medium text-black mb-2"
                >
                  Parent/Guardian Contact
                </label>
                <input
                  type="text"
                  id="parentContact"
                  name="parentContact"
                  required
                  className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:ring-[0.5px] focus:ring-[var(--color-accent)]"
                />
              </div>

              {/* Motivation */}
              <div>
                <label
                  htmlFor="motivation"
                  className="block text-lg font-medium text-black mb-2"
                >
                  Why do you want to join?
                </label>
                <textarea
                  id="motivation"
                  name="motivation"
                  rows={4}
                  className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:ring-[0.5px] focus:ring-[var(--color-accent)] resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="submit"
                  className="text-lg p-8 bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white rounded-md cursor-pointer transition"
                  size="lg"
                >
                  Submit Application
                </Button>
              </div>
            </form>
          </div>
        </section>
      </section>
    </div>
  );
}

// Breadcrumbs Component
// const Breadcrumbs = () => (
//   <ul className="flex space-x-4 p-12">
//     <li>
//       <Link href="/">Home</Link>
//     </li>
//     <li>
//       <ChevronRight />
//     </li>
//     <li>Get a skill</li>
//   </ul>
// );

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
