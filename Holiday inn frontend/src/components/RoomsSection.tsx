import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomStandard from "@/assets/room-standard.jpg";
import roomSuite from "@/assets/room-suite.jpg";
import roomFamily from "@/assets/room-family.jpg";
import { Wifi, Tv, Coffee, Wind, Users, Bath } from "lucide-react";
import { useState } from "react";
import BookingModal from "./BookingModal";
import { motion, Variants } from "framer-motion";

/* ---------------- ROOMS DATA ---------------- */

const rooms = [
  {
    id: 1,
    name: "Deluxe King Room",
    image: roomDeluxe,
    price: 3500,
    originalPrice: 4200,
    guests: 2,
    size: "28 m²",
    bed: "King Bed",
    description:
      "Spacious and elegantly furnished with premium amenities, wooden flooring, and a city view.",
    amenities: ["Free WiFi", "Smart TV", "AC", "En-suite Bath", "Coffee Maker"],
    badge: "Most Popular",
    badgeColor: "bg-gold",
  },
  {
    id: 2,
    name: "Standard Twin Room",
    image: roomStandard,
    price: 2200,
    originalPrice: null,
    guests: 2,
    size: "20 m²",
    bed: "Twin Beds",
    description:
      "Cozy and well-appointed with all essentials.",
    amenities: ["Free WiFi", "Smart TV", "AC"],
  },
  {
    id: 3,
    name: "Premium Suite",
    image: roomSuite,
    price: 6500,
    originalPrice: 8000,
    guests: 3,
    size: "52 m²",
    bed: "King Bed + Sofa",
    description:
      "Luxury suite with separate living area.",
    amenities: ["Free WiFi", "Smart TV", "AC"],
    badge: "Luxury",
    badgeColor: "bg-primary",
  },
  {
    id: 4,
    name: "Family Room",
    image: roomFamily,
    price: 4800,
    originalPrice: 5500,
    guests: 4,
    size: "38 m²",
    bed: "Double + Bunk Beds",
    description:
      "Perfect for families with warm interiors.",
    amenities: ["Free WiFi", "Smart TV", "AC"],
    badge: "Family Friendly",
    badgeColor: "bg-green-700",
  },
];

/* ---------------- APPLE SMOOTH ANIMATION ---------------- */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045, // smooth cascade
      delayChildren: 0.03,
    },
  },
};

const appleEase = [0.25, 1, 0.5, 1]; // 🍏 signature smooth easing

const textVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: appleEase,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: appleEase,
    },
  },
};

/* ---------------- COMPONENT ---------------- */

export default function RoomsSection() {
  const [selectedRoom, setSelectedRoom] =
    useState<(typeof rooms)[0] | null>(null);

  return (
    <motion.section
      id="rooms"
      className="relative bg-background will-change-transform"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }} // repeat + smooth trigger
    >
      <div className="h-[90px] md:h-[110px] lg:h-[120px]" />

      <div className="py-20 px-6 relative z-10">

        {/* Header */}
        <motion.div className="text-center mb-14" variants={containerVariants}>
          
          <motion.p variants={textVariants}
            className="text-gold font-logo text-lg tracking-[0.4em] uppercase mb-3">
            Our Accommodations
          </motion.p>

          <motion.h2 variants={textVariants}
            className="font-logo text-4xl md:text-5xl tracking-[0.2em] text-foreground mb-4">
            Choose Your Room
          </motion.h2>

          <motion.p variants={textVariants}
            className="text-muted-foreground font-body text-base max-w-xl mx-auto">
            Each room is thoughtfully designed to offer comfort and elegance.
          </motion.p>

          <motion.div variants={textVariants}
            className="w-16 h-0.5 bg-gold mx-auto mt-5" />
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          {rooms.map((room) => (
            <motion.div
              key={room.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              transition={{ duration: 0.25 }}
              className="group bg-card rounded-xl overflow-hidden border shadow-sm hover:shadow-2xl transition-all duration-300 will-change-transform"
            >

              {/* Image */}
              <div className="relative overflow-hidden h-60">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-110 will-change-transform"
                />

                {room.badge && (
                  <motion.span variants={textVariants}
                    className={`absolute top-4 left-4 ${room.badgeColor} text-white text-xs px-3 py-1 rounded-full`}>
                    {room.badge}
                  </motion.span>
                )}

                <motion.div variants={textVariants}
                  className="absolute top-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <Users size={11} />
                  <span>{room.guests}</span>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between mb-3">
                  <div>
                    <h3 className="text-2xl">{room.name}</h3>
                    <p className="text-muted-foreground">
                      {room.bed} · {room.size}
                    </p>
                  </div>

                  <div className="text-right">
                    {room.originalPrice && (
                      <p className="line-through text-sm text-muted-foreground">
                        ₹{room.originalPrice}
                      </p>
                    )}
                    <p className="text-gold text-3xl">
                      ₹{room.price}
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">
                  {room.description}
                </p>

                <motion.button
                  onClick={() => setSelectedRoom(room)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="w-full bg-primary text-white py-3 rounded-lg hover:bg-gold transition-all duration-300"
                >
                  Book This Room
                </motion.button>
              </div>

            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
        />
      )}
    </motion.section>
  );
}