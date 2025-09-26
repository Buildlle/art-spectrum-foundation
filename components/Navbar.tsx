"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Icons for menu

// Reusable NavLink Component
const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="font-medium tracking-wider text-[1rem] hover:text-[var(--color-accent)] transition"
  >
    {children}
  </Link>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 flex z-50 justify-between items-center my-4 container mx-auto inset-x-0 py-4 px-4 lg:pl-4 bg-[var(--color-background)] backdrop-blur-lg text-[var(--color-foreground)] text-sm capitalize tracking-normal rounded-[3px]">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            className="hover:opacity-80 transition-all"
            alt="Logo"
            width={180}
            height={30}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-between px-12 gap-3 items-center">
          {/* Left Section */}
          <div className="flex flex-1 justify-center items-center space-x-20">
            {/* <NavLink href="/programs">Programs</NavLink>
            <NavLink href="/events">Events</NavLink>
            <NavLink href="/support">Support</NavLink> */}
          </div>

          {/* Right Section */}
          <div className="flex justify-center items-center space-x-20">
            <NavLink href="/programs">Programs</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[var(--color-foreground)] focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      <div
        className={`absolute top-18 left-0 w-full bg-[var(--color-background)] backdrop-blur-lg transition-all rounded-[3px] ${
          isOpen ? "h-auto opacity-100" : "h-0 opacity-0 overflow-hidden"
        } md:hidden`}
      >
        <div className="flex flex-col px-4 space-y-6 py-6">
          {/* <NavLink href="/events">Events</NavLink> */}
          {/* <NavLink href="/support">Support</NavLink> */}
          <NavLink href="/programs">Programs</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
