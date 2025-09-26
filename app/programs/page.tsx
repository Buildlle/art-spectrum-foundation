import { PageLayout } from "@/components/PageLayout";

export default function Programs() {
  const programs = [
    {
      title: "Skill Development",
      description: (
        <>
          <strong>Hands-on training in various creative fields.</strong>
          From digital art to traditional craftsmanship, we equip aspiring
          artists with industry-relevant skills through structured workshops and
          mentorship.
        </>
      ),
    },
    {
      title: "Mentorship Programs",
      description: (
        <>
          <strong>Guidance from industry professionals.</strong>
          Our mentorship programs connect young creatives with experienced
          professionals, providing insights, networking, and career-building
          opportunities.
        </>
      ),
    },
    {
      title: "Art Entrepreneurship",
      description: (
        <>
          <strong>Turning passion into sustainable careers.</strong>
          We help artists monetize their skills through business training,
          product development, and market access strategies.
        </>
      ),
    },
  ];

  return (
    <PageLayout
      title="Programs"
      sections={programs}
      image="/images/programs.jpg"
    >
      <p>
        Our programs are designed to nurture artistic talent, provide essential
        skills, and create opportunities for creatives to thrive in their
        industries.
      </p>
    </PageLayout>
  );
}
