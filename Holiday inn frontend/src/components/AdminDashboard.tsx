import { useEffect, useState, useMemo } from "react";
import { getBookings } from "@/api/adminApi";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

interface Booking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: string;
  paymentId?: string;
}

export default function AdminDashboard() {

  const navigate = useNavigate();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("adminToken");


  const fetchBookings = async () => {

    try {

      const result = await getBookings();

      if (result.success) {
        setBookings(result.bookings);
      }

    }
    catch (err) {
      console.error(err);
    }
    finally {
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


  useEffect(() => {

    const interval = setInterval(() => {
      fetchBookings();
    }, 10000);

    return () => clearInterval(interval);

  }, []);


  const deleteBooking = async (id: string) => {

    try {

      await fetch(
        `http://localhost:5000/api/admin/bookings/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchBookings();

    }
    catch (err) {
      console.error(err);
    }

  };


  const handleLogout = () => {

    localStorage.removeItem("adminToken");

    navigate("/admin");

  };


  const openManagementPanel = () => {

    navigate("/admin/management");

  };


  const filteredBookings = useMemo(() => {

    return bookings.filter(b =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search) ||
      b.roomName.toLowerCase().includes(search.toLowerCase())
    );

  }, [bookings, search]);


  if (loading) {

    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-[#E6C97A] text-lg font-logo tracking-[0.1em]">
        Loading Dashboard...
      </div>
    );

  }


  return (

    <div className="min-h-screen bg-black text-white">


      {/* HEADER */}

      <div className="relative pt-6 pb-12 text-center">

        <div
          onClick={() => navigate("/")}
          className="absolute left-16 top-12 cursor-pointer text-[#E6C97A] hover:text-white transition"
        >
          <Home size={40} />
        </div>


        <h1 className="font-logo font-normal tracking-[0.2em] text-4xl text-[#E6C97A]">
          Admin Dashboard
        </h1>


        <div className="absolute right-8 top-6 flex gap-3">

          <button
            onClick={openManagementPanel}
            className="font-logo tracking-[0.15em] border border-[#E6C97A] text-[#E6C97A] px-5 py-2 rounded hover:bg-[#E6C97A] hover:text-black transition"
          >
            Management Panel
          </button>


          <button
            onClick={handleLogout}
            className="font-logo tracking-[0.15em] border border-red-500 text-red-500 px-5 py-2 rounded hover:bg-red-500 hover:text-white transition"
          >
            Logout
          </button>

        </div>

      </div>



      {/* SEARCH */}

      <div className="px-16 mb-6">

        <input
          type="text"
          placeholder="Search guest, email, phone, room..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="font-logo tracking-[0.1em] bg-[#111] border border-[#E6C97A]/30 px-4 py-2 rounded w-96 text-white focus:outline-none focus:border-[#E6C97A]"
        />

      </div>



      <div className="px-16 pb-16">

        <div className="border border-[#E6C97A]/20 rounded-2xl overflow-hidden shadow-lg">

          <table className="w-full">

            <thead className="bg-[#111] text-[#E6C97A] uppercase text-sm font-logo tracking-[0.2em]">
              <tr>

                <th className="py-4 px-6 text-center">No</th>

                <th className="py-4 px-6 text-left">Name</th>

                <th className="py-4 px-6 text-left">Email</th>

                <th className="py-4 px-6 text-left">Phone</th>

                <th className="py-4 px-6 text-left">Room</th>

                <th className="py-4 px-6 text-center">Guests</th>

                <th className="py-4 px-6 text-center">Status</th>

                <th className="py-4 px-6 text-center">Payment ID</th>

                <th className="py-4 px-6 text-center">Action</th>

              </tr>
            </thead>


            <tbody>

              {filteredBookings.map((b, index) => {

                let statusStyle = "bg-gray-500/20 text-gray-400";

                if (b.status === "Paid")
                  statusStyle = "bg-green-500/20 text-green-400";

                if (b.status === "Pending")
                  statusStyle = "bg-yellow-500/20 text-yellow-400";

                if (b.status === "Rejected")
                  statusStyle = "bg-red-500/20 text-red-400";


                return (

                  <tr
                    key={b._id}
                    className="border-t border-[#E6C97A]/10 hover:bg-[#E6C97A]/5 transition font-logo tracking-[0.05em]"
                  >

                    <td className="py-4 px-6 text-center text-[#E6C97A]">
                      {index + 1}
                    </td>


                    <td className="py-4 px-6">
                      {b.name}
                    </td>


                    <td className="py-4 px-6 text-gray-300">
                      {b.email}
                    </td>


                    <td className="py-4 px-6">
                      {b.phone}
                    </td>


                    <td className="py-4 px-6">

                      <span className="border border-[#E6C97A]/30 px-2 py-1 rounded text-xs text-[#E6C97A] font-logo tracking-[0.1em]">
                        {b.roomName}
                      </span>

                    </td>


                    <td className="py-4 px-6 text-center">
                      {b.guests}
                    </td>


                    <td className="py-4 px-6 text-center">

                      <span className={`px-3 py-1 rounded text-xs ${statusStyle} font-logo tracking-[0.1em]`}>
                        {b.status}
                      </span>

                    </td>


                    <td className="py-4 px-6 text-center font-logo text-xs text-[#E6C97A] tracking-[0.1em]">
                      {b.paymentId || "-"}
                    </td>


                    <td className="py-4 px-6 text-center">

                      <button
                        onClick={() => deleteBooking(b._id)}
                        className="font-logo tracking-[0.15em] bg-red-500/10 border border-red-500/30 px-3 py-1 rounded text-red-400 hover:bg-red-500 hover:text-white transition"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                );

              })}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}