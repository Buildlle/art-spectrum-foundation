"use client";

import { Facebook, Instagram, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  // { label: "Events", href: "/events" },
];

const helpLinks = [
  { label: "Support", href: "/support" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    href: "https://web.facebook.com/p/Art-Spectrum-Foundation-100069562788336/?_rdc=1&_rdr#",
    icon: Facebook,
    color: "hover:text-blue-600",
  },
  {
    href: "https://www.instagram.com/artspectrumfoundation?igsh=ZGFjbWRwdG9ubTk4",
    icon: Instagram,
    color: "hover:text-pink-500",
  },
  // { href: "https://twitter.com", icon: Twitter, color: "hover:text-blue-400" },
  {
    href: "mailto:info@artspectrumfoundation.com",
    icon: Mail,
    color: "hover:text-red-500",
  },
];

const Footer = () => (
  <footer className="px-8 py-12 flex flex-col mt-auto mb-6 bg-[#000000]/90 backdrop-blur-lg text-white/80 text-sm capitalize -tracking-normal">
    <div className="container mx-auto flex flex-col md:flex-row justify-between gap-8 py-12">
      {/* Logo Section */}
      <div>
        <Link href="/" className="flex items-center">
          <Image
            src="/logo_asf_white.svg"
            alt="Logo"
            width={160}
            height={160}
          />
        </Link>
      </div>

      {/* Navigation Section */}
      <FooterSection title="Navigation" links={navLinks} />

      {/* Help Section */}
      <FooterSection title="Help" links={helpLinks} />

      {/* Social Icons */}
      <div className="text-center md:text-left">
        <h3 className="font-bold mb-3">Follow Us</h3>
        <div className="flex justify-center md:justify-start gap-4">
          {socialLinks.map(({ href, icon: Icon, color }, index) => (
            <Link key={index} href={href} target="_blank">
              <Icon className={`w-5 h-5 transition ${color}`} />
            </Link>
          ))}
        </div>
      </div>
    </div>

    {/* Copyright */}
    <div className="flex flex-col lg:flex-row lg:items-center uppercase justify-between border-t border-white/20 pt-6 lg:px-22 lg:text-center md:text-left">
      <p className="text-xs">
        © {new Date().getFullYear()} Art Spectrum Foundation. All Rights
        Reserved.
      </p>
      <p className="text-xs">
        Site by{" "}
        <a
          href="http://buildlle.space"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          BUILDLLE.SPACE
        </a>
      </p>
    </div>
  </footer>
);

// Reusable Footer Section Component
const FooterSection = ({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) => (
  <div>
    <h3 className="font-bold mb-3">{title}</h3>
    <ul className="space-y-2">
      {links.map(({ label, href }, index) => (
        <li key={index}>
          <Link
            href={href}
            className="hover:text-[var(--color-accent)] transition"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;