import heroBg from "@/assets/hero-bg.jpg";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function HeroSection() {

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4
  });

  return (
    <section
    id="home"
    className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-mt-24 md:scroll-mt-28"
  >

      {/* Cinematic slow zoom background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
        initial={{ scale: 1 }}
        animate={{ scale: 1.12 }}
        transition={{ duration: 20, ease: "easeOut" }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Luxury gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />


      {/* Hero Content */}
      <div className="relative z-10 text-center px-6">

        {/* Welcome text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#E6C97A] tracking-[0.45em] uppercase text-xs mb-6 font-body"
        >
          Welcome To
        </motion.p>


        {/* Heading */}

<h1 className="font-display leading-tight text-center">

  <motion.span
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.4 }}
    className="
      block
      text-3xl sm:text-4xl md:text-5xl lg:text-6xl
      text-white
      font-logo font-light
      tracking-[0.15em] sm:tracking-[0.2em]
    "
  >
    VACATION
  </motion.span>

  <motion.span
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.7 }}
    className="
      block
      text-4xl sm:text-5xl md:text-6xl lg:text-7xl
      font-logo font-normal
      tracking-[0.15em] sm:tracking-[0.2em]
      bg-gradient-to-r
      from-[#E6C97A]
      via-[#C6A75E]
      to-[#A8893E]
      bg-clip-text
      text-transparent
      mt-1 sm:mt-2
    "
  >
    INN
  </motion.span>

</h1>


        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="
            text-white/80
            text-lg md:text-xl
            max-w-2xl
            mx-auto
            leading-relaxed
            mt-6
            font-body
          "
        >
          Experience warmth, comfort, and heartfelt hospitality —
          just like home, only better.
        </motion.p>



        {/* Animated Stats */}
        <div
          ref={ref}
          className="flex flex-wrap justify-center gap-5 mt-14"
        >

          <StatBox inView={inView} value={4.9} suffix=" Rating" prefix="★ " />
          <StatBox inView={inView} value={500} suffix="+ Guests" />
          <StatBox inView={inView} value={2018} suffix="" prefix="Since " />

        </div>

      </div>

    </section>
  );
}



function StatBox({
  value,
  suffix = "",
  prefix = "",
  inView
}: any) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="
        px-7 py-2.5
        border border-[#E6C97A]/40
        rounded-full
        text-sm
        text-[#E6C97A]
        backdrop-blur-md
        bg-white/5
        hover:bg-white/10
        transition-all duration-300
      "
    >
      {prefix}

      {inView && (
        <CountUp
          end={value}
          duration={5}
          decimals={value % 1 !== 0 ? 1 : 0}
        />
      )}

      {suffix}

    </motion.div>
  );
}