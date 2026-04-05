import { Wifi, Car, Coffee, Utensils, Shield, Clock } from "lucide-react";
import { motion, Variants } from "framer-motion";

/* ---------------- AMENITIES DATA ---------------- */

const amenities = [
  {
    icon: <Wifi size={22} />,
    title: "Free High-Speed WiFi",
    desc: "Stay connected throughout your stay",
  },
  {
    icon: <Car size={22} />,
    title: "Free Parking",
    desc: "Ample secure parking space for guests",
  },
  {
    icon: <Coffee size={22} />,
    title: "Complimentary Breakfast",
    desc: "Fresh homemade breakfast every morning",
  },
  {
    icon: <Utensils size={22} />,
    title: "In-house Dining",
    desc: "Authentic home-cooked meals on request",
  },
  {
    icon: <Shield size={22} />,
    title: "24/7 Security",
    desc: "Round-the-clock CCTV and security staff",
  },
  {
    icon: <Clock size={22} />,
    title: "Flexible Check-in",
    desc: "Early check-in and late check-out available",
  },
];

/* ---------------- EXACT FOOTER ANIMATION ---------------- */

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* ---------------- COMPONENT ---------------- */

export default function AmenitiesSection() {
  return (
    <section
      id="amenities"
      className="relative py-28 px-6 overflow-hidden"
      style={{
        backgroundImage: "url('/luxury-lobby.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* content */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* header */}

        <motion.div
          variants={container}
          className="text-center mb-20"
        >
          <motion.p
            variants={item}
            className="text-[#E6C97A] font-logo text-xs tracking-[0.4em] uppercase mb-4"
          >
            What We Offer
          </motion.p>

          <motion.h2
            variants={item}
            className="font-logo text-5xl tracking-[0.2em] text-white mb-6"
          >
            Guest Amenities
          </motion.h2>

          <motion.div
            variants={item}
            className="w-16 h-[2px] bg-[#E6C97A] mx-auto"
          />
        </motion.div>

        {/* cards */}

        <motion.div
          variants={container}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {amenities.map((amenity) => (
            <motion.div
              key={amenity.title}
              variants={item}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="
                flex items-center gap-5
                backdrop-blur-xl
                bg-white/[0.06]
                border border-white/[0.15]
                rounded-xl
                p-6
                transition-all duration-300
                hover:border-[#E6C97A]/60
                hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]
                group
              "
            >
              {/* icon */}

              <motion.div
                whileHover={{
                  scale: 1.15,
                  rotate: 2,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                }}
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
                <h4 className="font-logo text-white tracking-[0.15em] mb-1">
                  {amenity.title}
                </h4>

                <p className="font-body text-white/70 text-sm">
                  {amenity.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}