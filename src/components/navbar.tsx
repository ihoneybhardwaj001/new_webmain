import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const closeMenu = () => {
    setTimeout(() => setMenuOpen(false), 500); // Wait for animation to complete
  };

  const navItems = [
    { href: "/meet-me", label: "Meet me" },
    { href: "/essence", label: "Essence" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
    { href: "/stories", label: "Stories" },
  ];

  const socialLinks = [
    { href: "https://www.facebook.com/rafalbojarphotography/", label: "Facebook" },
    { href: "https://vimeo.com/user33153729", label: "Vimeo" },
    { href: "https://www.instagram.com/one.story.hero/", label: "Instagram" },
  ];

  return (
    <header className="fixed w-full z-50 py-4 sm:py-6 px-4 sm:px-6 md:px-8 bg-transparent">
      <div className="flex items-center justify-between">
        <Link href="/" className="relative flex items-center">
          <div className="red-dot absolute -left-3 sm:-left-5"></div>
          <h1 className="bebas text-lg sm:text-xl md:text-2xl tracking-widest">
            HONEY BHARDWAJ
          </h1>
        </Link>

        {/* Mobile version of "ALL STORIES" tab */}
        <Link href="/stories" className="md:hidden flex items-center gap-2">
          <span className="bebas tracking-wider text-sm">ALL STORIES</span>
          <span className="text-lg">+</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/stories" className="flex items-center gap-2">
            <span className="bebas tracking-wider text-sm">ALL STORIES</span>
            <span className="text-lg">+</span>
          </Link>

          <button className="flex items-center" onClick={toggleMenu}>
            <span className="bebas tracking-wider text-sm mr-2">MENU</span>
            <div className="flex flex-col gap-1">
              <span className="w-5 h-[2px] bg-white"></span>
              <span className="w-5 h-[2px] bg-white"></span>
              <span className="w-5 h-[2px] bg-white"></span>
            </div>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden flex items-center" onClick={toggleMenu}>
          <span className="bebas tracking-wider text-sm mr-2">MENU</span>
          <div className="flex flex-col gap-1">
            <span className="w-4 h-[2px] bg-white"></span>
            <span className="w-4 h-[2px] bg-white"></span>
            <span className="w-4 h-[2px] bg-white"></span>
          </div>
        </button>
      </div>

      {/* Mobile & Desktop Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center px-6 sm:px-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Close Button */}
            <button className="absolute top-6 right-8 flex items-center gap-2 z-50" onClick={closeMenu}>
              <span className="bebas tracking-wider text-sm">CLOSE</span>
              <div className="w-5 h-5 relative">
                <span className="absolute top-1/2 left-0 w-5 h-[2px] bg-white rotate-45"></span>
                <span className="absolute top-1/2 left-0 w-5 h-[2px] bg-white -rotate-45"></span>
              </div>
            </button>

            {/* Grid Background */}
            <div className="absolute top-0 left-0 w-full h-full grid grid-cols-3 sm:grid-cols-5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-full border-r border-white/10 relative">
                  {i === 0 && <div className="absolute left-0 top-0 h-full border-l border-white/10"></div>}
                </div>
              ))}
            </div>

            {/* Navigation Links */}
            <nav className="relative z-10 mt-8">
              <ul className="space-y-4 sm:space-y-6 text-center">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="didot text-3xl sm:text-4xl md:text-5xl hover:opacity-70 transition-opacity"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social Links */}
            <div className="absolute bottom-8 sm:bottom-12 flex gap-4 sm:gap-8">
              {socialLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  className="text-sm sm:text-base uppercase hover:opacity-70 transition-opacity"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
