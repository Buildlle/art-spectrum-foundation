import React from "react";

import { PageLayout } from "@/components/PageLayout";

export default function Support() {
  const supportOptions = [
    {
      title: "Donate",
      description: (
        <>
          <strong>Support our mission.</strong>
          Your contributions help us provide resources, training, and platforms
          for emerging artists to thrive.
        </>
      ),
    },
    {
      title: "Volunteer",
      description: (
        <>
          <strong>Be a part of the creative movement.</strong>
          Join us in organizing events, mentoring young artists, and bringing
          creative projects to life.
        </>
      ),
    },
    {
      title: "Partner with Us",
      description: (
        <>
          <strong>Collaborate for impact.</strong>
          Organizations and brands can work with us to sponsor programs, co-host
          events, or support artistic initiatives.
        </>
      ),
    },
  ];

  return (
    <PageLayout
      title="Support"
      sections={supportOptions}
      image="/images/support.jpg"
    >
      <p>
        Every contribution—whether financial, time, or expertise—helps us build
        a thriving creative community. Join us in making a difference!
      </p>
    </PageLayout>
  );
}
