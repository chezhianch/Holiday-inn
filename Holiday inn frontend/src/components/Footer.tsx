import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import { motion } from "framer-motion";

/* Premium stagger container */
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2
    }
  }
};

/* Premium fade-slide */
const item = {
  hidden: { opacity: 0, x: -50, filter: "blur(6px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function Footer() {
  return (
    <>
      {/* ABOUT SECTION */}

      <section
        id="about"
        className="py-28 px-6 bg-gradient-to-b from-white to-[#f8f6f1]"
      >
        <div className="max-w-7xl mx-auto">

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className="
              bg-white
              rounded-xl
              p-14
              border border-[#E6C97A]/20
              shadow-[0_8px_30px_rgba(0,0,0,0.04)]
              hover:shadow-[0_20px_50px_rgba(201,162,39,0.15)]
              hover:-translate-y-2
              transition-all duration-500
            "
          >

            {/* Section label */}
            <motion.p
              variants={item}
              className="
                font-logo text-M tracking-[0.4em] uppercase mb-4
                bg-gradient-to-r from-[#A8893E] via-[#C9A227] to-[#7A5C1E]
                bg-clip-text text-transparent
              "
            >
              Our Story
            </motion.p>

            {/* Heading */}
            <motion.h2
              variants={item}
              className="font-logo text-4xl md:text-5xl font-normal tracking-[0.2em] text-[#1a1a1a] leading-tight"
            >
              A Home Built
              <br />
              on Hospitality
            </motion.h2>

            {/* Divider */}
            <motion.div
              variants={item}
              className="
                w-16 h-[2px] mt-6 mb-8
                bg-gradient-to-r
                from-[#F5E6B3]
                via-[#C9A227]
                to-[#A8893E]
              "
            />

            {/* Description */}
            <motion.p
              variants={item}
              className="font-body text-[#6b6b6b] text-lg leading-relaxed max-w-2xl mb-6"
            >
              Holiday Inn was founded with one simple belief — every guest deserves
              the warmth of a home. Nestled in a peaceful neighborhood, we've been
              welcoming travelers from all walks of life since 2018.
            </motion.p>

            <motion.p
              variants={item}
              className="font-body text-[#6b6b6b] text-lg leading-relaxed max-w-2xl mb-12"
            >
              Our rooms blend modern comfort with traditional Indian hospitality,
              creating an experience that feels both luxurious and personal.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={container}
              className="flex flex-wrap gap-6"
            >

              {[
                { number: "6+", label: "Years Running" },
                { number: "500+", label: "Guests Hosted" },
                { number: "4.9", label: "Avg. Rating" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={item}
                  whileHover={{
                    y: -6,
                    scale: 1.04,
                    boxShadow: "0 20px 40px rgba(201,162,39,0.25)"
                  }}
                  className="
                    text-center
                    border border-[#E6C97A]/30
                    rounded-lg
                    px-8 py-5
                    bg-white
                    hover:border-[#C9A227]
                    transition-all duration-300
                  "
                >
                  <p className="
                    font-logo text-3xl font-normal tracking-[0.15em]
                    bg-gradient-to-r from-[#F5E6B3] via-[#C9A227] to-[#A8893E]
                    bg-clip-text text-transparent
                  ">
                    {stat.number}
                  </p>

                  <p className="font-body text-sm text-[#7a7a7a] mt-1">
                    {stat.label}
                  </p>

                </motion.div>
              ))}

            </motion.div>

          </motion.div>

        </div>
      </section>


      {/* CONTACT SECTION */}

  

<section
  id="contact"
  className="relative py-12 px-6 overflow-hidden bg-gradient-to-b from-[#f6f4ef] via-[#f2efe7] to-[#f6f4ef]"
>
  <div className="max-w-6xl mx-auto relative">

    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      className="relative z-10"
    >

      <div className="relative bg-[#0a0a0a]/95 backdrop-blur-xl rounded-2xl p-14 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.55)]">

        <motion.p
          variants={item}
          className="font-logo text-[#C6A75E] text-xs tracking-[0.5em] uppercase mb-4"
        >
          Contact
        </motion.p>

        <motion.h3
          variants={item}
          className="font-logo text-5xl font-normal tracking-[0.2em] text-white"
        >
          Get in Touch
        </motion.h3>

        <motion.div
          variants={container}
          className="space-y-8 mt-10"
        >

          <ContactItem
            icon={<MapPin size={18} />}
            text="Near Lake , Kodaikanal"
          />

          <ContactItem
            icon={<Phone size={18} />}
            text="+91 90000 00000"
          />

          <ContactItem
            icon={<Mail size={18} />}
            text="Holidayinn@gmail.com"
          />

          <ContactItem
            icon={<Clock size={18} />}
            text="Check-in: 11 PM · Check-out: 1 AM"
          />

        </motion.div>

      </div>

    </motion.div>

  </div>
</section>
 </>)
}


/* ContactItem */

function ContactItem({ icon, text }) {

  return (
    <motion.div

      variants={{
        hidden: { opacity: 0, x: -40, filter: "blur(6px)" },
        show: {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1]
          }
        }
      }}

      whileHover={{
        x: 10,
        transition: { duration: 0.3 }
      }}

      className="flex items-center gap-5 cursor-pointer group"
    >

      <motion.div
        whileHover={{
          scale: 1.15,
          rotate: 2
        }}
        transition={{
          type: "spring",
          stiffness: 300
        }}
        className="
          w-12 h-12
          rounded-lg
          border border-[#C6A75E]/30
          flex items-center justify-center
          text-[#C6A75E]
          transition-all duration-300
          group-hover:bg-[#C6A75E]
          group-hover:text-black
          group-hover:shadow-[0_0_20px_rgba(198,167,94,0.7)]
        "
      >
        {icon}
      </motion.div>

      <motion.p
  className="
    font-logo
    text-white/80
    text-sm sm:text-base md:text-lg   /* ✅ mobile smaller */
    tracking-[0.08em] sm:tracking-[0.1em]
    transition-all duration-300
    group-hover:text-[#C6A75E]

    break-words                       /* ✅ IMPORTANT */
    whitespace-normal                 /* ✅ allow wrapping */
    max-w-[220px] sm:max-w-full       /* ✅ control width only on mobile */
  "
>
  {text}
</motion.p>
    </motion.div>
  );
}