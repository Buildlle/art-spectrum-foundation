import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Breadcrumbs = ({ title }: { title: string }) => (
  <ul className="flex space-x-4 p-12">
    <li>
      <Link href="/">Home</Link>
    </li>
    <li>
      <ChevronRight />
    </li>
    <li>{title}</li>
  </ul>
);
