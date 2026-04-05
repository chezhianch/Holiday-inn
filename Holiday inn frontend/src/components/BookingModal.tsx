import { motion, AnimatePresence, Variants } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { getRoomAvailability } from "@/api/bookingApi";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Room {
  _id: string;
  name: string;
}

interface Props {
  room: Room;
  onClose: () => void;
}

export default function BookingModal({ room, onClose }: Props) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState<number | "">("");

  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  const [bookedDates, setBookedDates] = useState<Date[]>([]);

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // refs for Enter navigation
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const guestsRef = useRef<HTMLInputElement>(null);
  const checkInRef = useRef<DatePicker>(null);
  const checkOutRef = useRef<DatePicker>(null);

  // validation
  const validateName = (value: string) =>
    /^[A-Za-z ]+$/.test(value);

  const validateEmail = (value: string) =>
    /^[A-Za-z0-9._%+-]+@gmail\.com$/i.test(value);

  const validatePhone = (value: string) =>
    /^[0-9]{10}$/.test(value);

  const backdrop: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modal: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.35 }
    }
  };

  useEffect(() => {

    const fetchAvailability = async () => {

      const result = await getRoomAvailability(room.name);

      if (result.success) {

        const disabled: Date[] = [];

        result.bookings.forEach((b: any) => {

          const start = new Date(b.checkIn);
          const end = new Date(b.checkOut);

          const current = new Date(start);

          while (current < end) {

            disabled.push(
              new Date(
                current.getFullYear(),
                current.getMonth(),
                current.getDate()
              )
            );

            current.setDate(current.getDate() + 1);

          }

        });

        setBookedDates(disabled);

      }

    };

    fetchAvailability();

  }, [room.name]);

  const loadRazorpay = () => {

    return new Promise<boolean>((resolve) => {

      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);

      script.onerror = () => resolve(false);

      document.body.appendChild(script);

    });

  };

  const handleBooking = async () => {

    if (!name || !email || !phone || !checkIn || !checkOut) {
      setError(true);
      setMessage("Please fill all required fields");
      return;
    }

    if (!validateName(name)) {
      setError(true);
      setMessage("Name must contain letters only");
      return;
    }

    if (!validateEmail(email)) {
      setError(true);
      setMessage("Enter valid Gmail address");
      return;
    }

    if (!validatePhone(phone)) {
      setError(true);
      setMessage("Phone must be exactly 10 digits");
      return;
    }

    if (checkOut <= checkIn) {
      setError(true);
      setMessage("Check-out must be after check-in");
      return;
    }

    try {

      setLoading(true);

      const razorpayLoaded = await loadRazorpay();

      if (!razorpayLoaded) {
        setError(true);
        setMessage("Payment system failed to load");
        setLoading(false);
        return;
      }

      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        {
          roomName: room.name,
          name,
          email,
          phone,
          guests: guests || 1,
          checkIn,
          checkOut
        }
      );

      if (!data.success) {
        setError(true);
        setMessage(data.message);
        setLoading(false);
        return;
      }

      const options = {

        key: data.key,
        order_id: data.order.id,
        name: "Holiday inn",
        description: room.name,
        theme: { color: "#000000" },

        handler: async function (response: any) {

          await axios.post(
            "http://localhost:5000/api/payment/verify-payment",
            {
              ...response,
              bookingId: data.bookingId
            }
          );

          setError(false);
          setMessage("Booking Confirmed Successfully ✅");

          setTimeout(() => {
            window.location.reload();
          }, 1500);

        },

        modal: {
          ondismiss: () => setLoading(false)
        }

      };

      const rzp = new window.Razorpay(options);

      rzp.open();

      setLoading(false);

    }
    catch (err: any) {

      setError(true);
      setMessage(err.response?.data?.message || "Payment failed");
      setLoading(false);

    }

  };

  return (

    <AnimatePresence>

      <motion.div
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      >

        <motion.div
          variants={modal}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl border border-neutral-200 p-7"
        >

          <h2 className="text-2xl font-logo tracking-[0.15em] mb-6 text-center">
            Book {room.name}
          </h2>

          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-neutral-500 hover:text-black"
          >
            <X size={22} />
          </button>

          <div className="space-y-4">

            <input
              ref={nameRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  emailRef.current?.focus();
                }
              }}
              placeholder="Full Name"
              className="w-full border px-3 py-2 rounded tracking-[0.05em] font-sans"
            />

            <input
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  phoneRef.current?.focus();
                }
              }}
              placeholder="Email"
              className="w-full border px-3 py-2 rounded tracking-[0.05em] font-sans"
            />

            <input
              ref={phoneRef}
              value={phone}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/\D/g, "");
                if (onlyNums.length <= 10) setPhone(onlyNums);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  guestsRef.current?.focus();
                }
              }}
              placeholder="Phone"
              className="w-full border px-3 py-2 rounded tracking-[0.05em] font-sans"
            />

            <input
              ref={guestsRef}
              type="number"
              value={guests}
              onChange={(e) =>
                setGuests(e.target.value === "" ? "" : Number(e.target.value))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  checkInRef.current?.setFocus?.();
                }
              }}
              placeholder="Guests"
              className="w-full border px-3 py-2 rounded tracking-[0.05em] font-sans"
            />

            <DatePicker
              ref={checkInRef}
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              excludeDates={bookedDates}
              minDate={new Date()}
              placeholderText="Check-In"
              className="w-full border px-3 py-2 rounded font-sans"
            />

            <DatePicker
              ref={checkOutRef}
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              excludeDates={bookedDates}
              minDate={checkIn || new Date()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleBooking();
                }
              }}
              placeholderText="Check-Out"
              className="w-full border px-3 py-2 rounded font-sans"
            />

            {message && (
              <p className={error ? "text-red-500" : "text-green-600"}>
                {message}
              </p>
            )}

            <button
              onClick={handleBooking}
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded font-logo tracking-[0.15em]"
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </button>

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>

  );

}