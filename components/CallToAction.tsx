"use client";

import { Button } from "./ui/button";

const CallToAction = () => (
  <footer className="flex flex-col py-8 px-12 bg-[#F5F5F5] text-[white] text-sm tracking-wide">
    <div className="container mx-auto flex items-center justify-between pb-12">
      <div>
        <h3 className="text-5xl font-semibold max-w-2xl tracking-tight py-4">
          Sign up to our newsletter & get the latest info
        </h3>
      </div>

      <div>
        <Button
          className="uppercase text-lg p-8 cursor-pointer bg-white text-foreground hover:bg-white/90 hover:text-black rounded-none"
          size="lg"
        >
          Sign Up for Free
        </Button>
      </div>
    </div>
  </footer>
);

export default CallToAction;
