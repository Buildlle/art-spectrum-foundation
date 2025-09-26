import { PageLayout } from "@/components/PageLayout";
import React from "react";

export default function Contact() {
  return (
    <PageLayout title="Contact" image="/images/contact.jpg">
      <p>
        We’d love to hear from you! Whether you have questions, want to
        collaborate, or just want to say hello, feel free to reach out.
      </p>

      <div className="container mx-auto mt-8 p-6 bg-white shadow-lg rounded-md">
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="border p-3 rounded-md"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border p-3 rounded-md"
          />
          <textarea
            placeholder="Your Message"
            className="border p-3 rounded-md h-32"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </PageLayout>
  );
}
