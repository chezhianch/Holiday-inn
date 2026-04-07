import { useState, useEffect } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Rooms", href: "#rooms" },
  { label: "Amenities", href: "#amenities" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isWhiteBg, setIsWhiteBg] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsAdmin(!!token);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsWhiteBg(window.scrollY > heroHeight - 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ PERFECT SCROLL FIX
  const scrollTo = (href: string) => {
    setMenuOpen(false);

    setTimeout(() => {
      const el = document.querySelector(href) as HTMLElement;
      if (el) {
        const y =
          el.getBoundingClientRect().top +
          window.scrollY -
          80; // navbar height
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 80);
  };

  const handleAdminClick = () => {
    if (isAdmin) navigate("/admin/dashboard");
    else navigate("/admin");
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAdmin(false);
    navigate("/");
  };

  const navTextColor = isWhiteBg ? "text-black" : "text-white";

  return (
    <motion.header
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
    >
      {/* NAV */}
      <div className="w-full h-20 flex items-center justify-between px-4 md:px-10">

        {/* LEFT (desktop admin) */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={handleAdminClick} className={navTextColor}>
            <User size={20}/>
          </button>
          {isAdmin && (
            <button onClick={handleLogout}>
              <LogOut size={20} className="text-red-400"/>
            </button>
          )}
        </div>

        {/* MOBILE LEFT */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={navTextColor}
          >
            {menuOpen ? <X size={22}/> : <Menu size={22}/>}
          </button>

          {/* ADMIN ICON NEAR MENU */}
          <button onClick={handleAdminClick} className={navTextColor}>
            <User size={20}/>
          </button>
        </div>

        {/* CENTER LINKS */}
        <div className="hidden md:flex flex-1 justify-center gap-8">
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className={`font-logo tracking-[0.2em] ${navTextColor} hover:text-[#E6C97A]`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* RIGHT BUTTONS */}
        <div className="flex gap-2 md:gap-3">
          <button
            onClick={() => scrollTo("#rooms")}
            className="px-3 py-1.5 md:px-5 md:py-2 text-xs md:text-sm text-[#E6C97A] border border-[#C6A75E]/40 bg-black rounded-md"
          >
            Book Now
          </button>

          <button
            onClick={() => scrollTo("#contact")}
            className="px-3 py-1.5 md:px-5 md:py-2 text-xs md:text-sm bg-gradient-to-r from-[#E6C97A] to-[#A8893E] text-black rounded-md"
          >
            Contact
          </button>
        </div>
      </div>

      {/* 🔥 PREMIUM MOBILE MENU (VISIBLE CHANGE) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            exit={{ y: -10 }}
            transition={{ duration: 0.12 }}
            className="
              absolute top-20 left-0 right-0 z-40
              backdrop-blur-2xl
              bg-gradient-to-b 
              from-[#2a1e0f]/95 
              via-[#1a1408]/95 
              to-[#000000]/90
              border-t border-[#E6C97A]/30
              shadow-[0_10px_40px_rgba(0,0,0,0.6)]
              px-6 py-6
              flex flex-col gap-6
            "
          >
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="
                  text-[#E6C97A]
                  text-left text-lg
                  font-logo tracking-[0.2em]
                  hover:text-white
                  transition-all duration-150
                "
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>
  );
}