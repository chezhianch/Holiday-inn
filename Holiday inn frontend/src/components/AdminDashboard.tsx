import { useEffect, useState, useMemo } from "react";
import { getBookings } from "@/api/adminApi";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const API_BASE = "https://holiday-inn-x7v0.onrender.com";

export default function AdminDashboard() {

  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("adminToken");

  const fetchBookings = async () => {
    try {
      const result = await getBookings();
      if (result.success) setBookings(result.bookings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/admin");
      return;
    }
    fetchBookings();
  }, []);

  const deleteBooking = async (id: string) => {
    try {
      const res = await fetch(
        `${API_BASE}/api/admin/bookings/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setBookings(prev => prev.filter(b => b._id !== id));
      }

    } catch (err) {
      console.error(err);
    }
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search) ||
      b.roomName.toLowerCase().includes(search.toLowerCase())
    );
  }, [bookings, search]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-[#E6C97A]">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-3 sm:px-6 md:px-10">

      {/* HEADER */}
      <div className="pt-6 pb-10 text-center relative">

        <div className="flex items-center justify-between">

          <div
            onClick={() => navigate("/")}
            className="cursor-pointer text-[#E6C97A]"
          >
            <Home size={24} />
          </div>

          <div className="flex flex-wrap gap-2 justify-end">

            <button
              onClick={() => navigate("/admin/management")}
              className="font-logo text-xs sm:text-sm border border-[#E6C97A] text-[#E6C97A] px-3 py-1 rounded hover:bg-[#E6C97A] hover:text-black"
            >
              Management Panel
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("adminToken");
                navigate("/admin");
              }}
              className="font-logo text-xs sm:text-sm border border-red-500 text-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white"
            >
              Logout
            </button>

          </div>
        </div>

        <h1 className="mt-4 font-logo tracking-[0.2em] text-lg sm:text-2xl md:text-4xl text-[#E6C97A]">
          Admin Dashboard
        </h1>

      </div>

      {/* SEARCH */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search guest, email, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 md:w-96 bg-[#111] border border-[#E6C97A]/30 px-4 py-2 rounded text-white"
        />
      </div>

      {/* TABLE */}
      <div className="pb-16">

        <div className="border border-[#E6C97A]/20 rounded-2xl shadow-lg">

          {/* 🔥 SCROLL WITHOUT WHITE BAR */}
          <div className="w-full overflow-x-auto no-scrollbar">

            <table className="min-w-[1000px] w-full">

              <thead className="bg-[#111] text-[#E6C97A] text-xs md:text-sm">
                <tr>
                  <th className="py-4 px-4">No</th>
                  <th className="py-4 px-4 text-left">Name</th>
                  <th className="py-4 px-4 text-left">Email</th>
                  <th className="py-4 px-4 text-left">Phone</th>
                  <th className="py-4 px-4 text-left">Room</th>
                  <th className="py-4 px-4 text-center">Guests</th>
                  <th className="py-4 px-4 text-center">Status</th>
                  <th className="py-4 px-4 text-center">Payment</th>
                  <th className="py-4 px-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((b, i) => (
                  <tr key={b._id} className="border-t border-[#E6C97A]/10">

                    <td className="py-4 px-4 text-center">{i + 1}</td>
                    <td className="py-4 px-4">{b.name}</td>
                    <td className="py-4 px-4 text-gray-300">{b.email}</td>
                    <td className="py-4 px-4">{b.phone}</td>

                    <td className="py-4 px-4">
                      <span className="border px-2 py-1 rounded text-xs text-[#E6C97A]">
                        {b.roomName}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-center">{b.guests}</td>

                    <td className="py-4 px-4 text-center">{b.status}</td>

                    <td className="py-4 px-4 text-center text-xs">
                      {b.paymentId || "-"}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => deleteBooking(b._id)}
                        className="text-red-400 border border-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </div>

      </div>

    </div>
  );
}