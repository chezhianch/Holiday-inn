import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomStandard from "@/assets/room-standard.jpg";
import roomSuite from "@/assets/room-suite.jpg";
import roomFamily from "@/assets/room-family.jpg";
import { Users } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import BookingModal from "./BookingModal";
import { motion, useAnimation, useInView } from "framer-motion";

/* ---------------- DATA ---------------- */

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
    description: "Spacious and elegantly furnished with premium amenities.",
    badge: "Most Popular",
    badgeColor: "bg-gold",
  },
  {
    id: 2,
    name: "Standard Twin Room",
    image: roomStandard,
    price: 2200,
    guests: 2,
    size: "20 m²",
    bed: "Twin Beds",
    description: "Cozy and well-appointed with all essentials.",
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
    description: "Luxury suite with separate living area.",
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
    description: "Perfect for families with warm interiors.",
    badge: "Family Friendly",
    badgeColor: "bg-green-700",
  },
];

/* ---------------- VARIANTS ---------------- */

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

/* ---------------- COMPONENT ---------------- */

export default function RoomsSection() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });

  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("show");
    } else {
      controls.start("hidden"); // 🔥 re-trigger when scrolling back
    }
  }, [isInView]);

  return (
    <section id="rooms" className="relative bg-background">
      <div className="h-[90px] md:h-[110px] lg:h-[120px]" />

      <div className="py-20 px-6">

        {/* HEADER */}
        <div className="text-center mb-14">
          <p className="text-gold tracking-[0.4em] uppercase mb-3">
            Our Accommodations
          </p>

          <h2 className="text-4xl md:text-5xl mb-4">
            Choose Your Room
          </h2>

          <p className="text-muted-foreground max-w-xl mx-auto">
            Each room is thoughtfully designed to offer comfort and elegance.
          </p>

          <div className="w-16 h-0.5 bg-gold mx-auto mt-5" />
        </div>

        {/* CARDS */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {rooms.map((room, i) => (
            <motion.div
              key={room.id}
              variants={cardVariants}
              initial="hidden"
              animate={controls}

              transition={{
                delay: i * 0.08,
              }}

              whileHover={{ y: -6 }}

              className="
                group bg-card rounded-xl overflow-hidden border
                shadow-sm hover:shadow-xl
                transition-all duration-300
                transform-gpu
              "
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden h-60">
                <img
                  src={room.image}
                  alt={room.name}
                  loading="lazy"
                  className="
                    w-full h-full object-cover
                    transform-gpu
                    transition-transform duration-500
                    group-hover:scale-105
                  "
                />

                {room.badge && (
                  <span className={`absolute top-4 left-4 ${room.badgeColor} text-white text-xs px-3 py-1 rounded-full`}>
                    {room.badge}
                  </span>
                )}

                <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <Users size={11} />
                  <span>{room.guests}</span>
                </div>
              </div>

              {/* CONTENT */}
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

                <button
                  onClick={() => setSelectedRoom(room)}
                  className="w-full bg-primary text-white py-3 rounded-lg hover:bg-gold transition-all duration-300"
                >
                  Book This Room
                </button>
              </div>

            </motion.div>
          ))}
        </div>
      </div>

      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
        />
      )}
    </section>
  );
}