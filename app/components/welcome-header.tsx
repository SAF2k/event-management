'use client'

import Image from "next/image";
import { useState } from "react";

import Icon from "/public/logo/logo-png.png";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Company", href: "#" },
  { name: "FAQ", href: "#" },
];

export default function WelcomeHeader() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
      <div>
        <header className="absolute z-50 inset-x-0 top-0">
          <nav
            className="flex items-center justify-between p-6 lg:px-6"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <Image src={Icon} alt="logo" height={200} width={200} />
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="p-2.5 rounded-md inline-flex items-center justify-center text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open Main menu</span>
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  href={item.href}
                  key={item.href}
                  className="text-sm font-semibold leading-6 text-gray-500"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        </header>
      </div>
    );
    
}