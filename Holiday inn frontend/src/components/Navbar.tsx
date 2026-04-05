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

  // detect admin
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsAdmin(!!token);
  }, []);

  // detect background change
  useEffect(() => {

    const handleScroll = () => {

      const heroHeight = window.innerHeight;

      if (window.scrollY > heroHeight - 100) {
        setIsWhiteBg(true);
      } else {
        setIsWhiteBg(false);
      }

    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);


  const scrollTo = (href: string) => {

    setMenuOpen(false);

    const el = document.querySelector(href);

    if (el) el.scrollIntoView({ behavior: "smooth" });

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


  // dynamic nav text color
  const navTextColor = isWhiteBg
    ? "text-black"
    : "text-white";


  return (

    <motion.header

      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}

      className="
        fixed top-0 left-0 right-0 z-50
        bg-transparent
        backdrop-blur-md
      "
    >


      {/* Animated bottom line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1 }}
        className="
          absolute bottom-0 left-0 right-0
          h-[1px]
          bg-gradient-to-r
          from-transparent
          via-[#E6C97A]
          to-transparent
          origin-left
        "
      />


      {/* NAVBAR CONTENT */}
      <div className="w-full h-20 flex items-center">


      <div className="pl-[100px]">

<button
  onClick={() => scrollTo("#home")}
  className="flex flex-col"
>

 
</button>

</div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-8 ml-auto pr-[80px]">


          {/* NAV LINKS */}
          {navLinks.map(link => (

            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}

              className={`
                relative font-logo text-lg tracking-[0.2em]
                transition-all duration-300
                ${navTextColor}

                hover:text-[#E6C97A]

                before:absolute
                before:left-0
                before:-bottom-1
                before:h-[1.5px]
                before:w-0
                before:bg-[#E6C97A]
                before:transition-all

                hover:before:w-full
              `}
            >
              {link.label}
            </button>

          ))}



          {/* ADMIN ICON */}
          <button
            onClick={handleAdminClick}
            className={`${navTextColor} hover:text-[#E6C97A]`}
          >
            <User size={20}/>
          </button>



          {/* LOGOUT */}
          {isAdmin && (
            <button onClick={handleLogout}>
              <LogOut size={20} className="text-red-400"/>
            </button>
          )}



          {/* BOOK NOW */}
          <motion.button

            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}

            onClick={() => scrollTo("#rooms")}

            className="
              px-7 py-2.5
              rounded-md
              font-logo text-sm
              tracking-[0.18em]

              text-[#E6C97A]

              border border-[#C6A75E]/40

              bg-[#0b0b0b]
            "
          >
            Book Now
          </motion.button>



          {/* CONTACT */}
          <motion.button

            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}

            onClick={() => scrollTo("#contact")}

            className="
              px-7 py-2.5
              rounded-md
              font-logo text-sm
              tracking-[0.18em]

              bg-gradient-to-r
              from-[#E6C97A]
              via-[#C6A75E]
              to-[#A8893E]

              text-black

              border border-[#C6A75E]/40
            "
          >
            Contact
          </motion.button>


        </div>



        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden ml-auto pr-[40px] ${navTextColor}`}
        >
          {menuOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>


      </div>



      {/* MOBILE MENU */}
      <AnimatePresence>

        {menuOpen && (

          <motion.div

            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}

            className="
              backdrop-blur-md
              bg-black/80
              px-6 py-4
              flex flex-col gap-4
            "
          >

            {navLinks.map(link => (

              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-white text-left font-logo tracking-[0.2em]"
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