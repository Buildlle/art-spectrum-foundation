import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export default function MissionStatement() {
  return (
    <section className="container mx-auto px-5 py-24">
      <div className="bg-black/5 p-16 h-[450px] flex flex-col rounded-[3px] justify-end items-start">
        <h3 className="text-2xl md:text-3xl font-bold uppercase">
          Our Mission Statement
        </h3>
        <p className="my-6 text-lg md:text-xl leading-relaxed">
          We foster creativity, empower artists, and provide platforms for
          innovation.
        </p>
        <Button className="text-lg cursor-pointer" size="lg" variant="link">
          Join Us
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </section>
  );
}
