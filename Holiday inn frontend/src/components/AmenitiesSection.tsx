import { Wifi, Car, Coffee, Utensils, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";

/* ---------------- DATA ---------------- */

const amenities = [
  { icon: <Wifi size={22} />, title: "Free High-Speed WiFi", desc: "Stay connected throughout your stay" },
  { icon: <Car size={22} />, title: "Free Parking", desc: "Ample secure parking space for guests" },
  { icon: <Coffee size={22} />, title: "Complimentary Breakfast", desc: "Fresh homemade breakfast every morning" },
  { icon: <Utensils size={22} />, title: "In-house Dining", desc: "Authentic home-cooked meals on request" },
  { icon: <Shield size={22} />, title: "24/7 Security", desc: "Round-the-clock CCTV and security staff" },
  { icon: <Clock size={22} />, title: "Flexible Check-in", desc: "Early check-in and late check-out available" },
];

/* ---------------- COMPONENT ---------------- */

export default function AmenitiesSection() {
  return (
    <section
      id="amenities"
      className="
        relative
        min-h-screen min-h-[100svh]
        pt-28 md:pt-32
        pb-24 px-6
        overflow-hidden
        bg-cover bg-center bg-no-repeat
      "
      style={{ backgroundImage: "url('/luxury-lobby.jpg')" }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* content */}
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20 will-change-transform"
        >
          <p className="text-[#E6C97A] font-logo text-xs tracking-[0.4em] uppercase mb-4">
            What We Offer
          </p>

          <h2 className="font-logo text-3xl sm:text-4xl md:text-5xl tracking-[0.2em] text-white mb-6">
            Guest Amenities
          </h2>

          <div className="w-16 h-[2px] bg-[#E6C97A] mx-auto" />
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">

          {amenities.map((amenity, i) => (
            <motion.div
              key={amenity.title}

              /* 🚀 ULTRA SMOOTH ANIMATION */
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px" }}

              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: "easeOut",
              }}

              whileHover={{
                y: -6,
                scale: 1.02,
              }}

              className="
                flex items-center gap-5
                backdrop-blur-xl
                bg-white/[0.06]
                border border-white/[0.15]
                rounded-xl
                p-5 md:p-6
                transition-all duration-300
                hover:border-[#E6C97A]/60
                hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]
                group
                will-change-transform
              "
            >
              {/* icon */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 250 }}
                className="
                  w-12 h-12
                  rounded-lg
                  bg-[#E6C97A]/10
                  flex items-center justify-center
                  text-[#E6C97A]
                  flex-shrink-0
                  group-hover:bg-[#E6C97A]
                  group-hover:text-black
                "
              >
                {amenity.icon}
              </motion.div>

              {/* text */}
              <div>
                <h4 className="font-logo text-white tracking-[0.15em] mb-1 text-sm md:text-base">
                  {amenity.title}
                </h4>

                <p className="font-body text-white/70 text-xs md:text-sm">
                  {amenity.desc}
                </p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}