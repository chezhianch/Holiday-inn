import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

export default function AdminManagement() {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="relative pt-6 pb-12 text-center">

        <div
          onClick={() => navigate("/admin/dashboard")}
          className="absolute left-16 top-12 cursor-pointer text-[#E6C97A]"
        >
          <Home size={40}/>
        </div>

        <h1 className="font-logo font-normal tracking-[0.2em] text-4xl text-[#E6C97A]">
          Management Panel
        </h1>

        <span className="font-logo text-[#E6C97A] text-sm tracking-[0.3em]">
          HOTEL ADMIN CONTROLS
        </span>

      </div>


      {/* OPTIONS */}
      <div className="px-16 grid grid-cols-3 gap-6">

        {/* ROOMS */}
        <button
          onClick={() => navigate("/admin/rooms")}
          className="bg-[#111] border border-[#E6C97A]/30 p-6 rounded-lg hover:border-[#E6C97A]"
        >
          <h2 className="font-logo font-normal tracking-[0.15em] text-xl text-[#E6C97A]">
            Manage Rooms
          </h2>

          <p className="font-logo text-gray-400 text-sm mt-2 tracking-[0.1em]">
            Add, Edit, Delete rooms
          </p>
        </button>


        {/* CUSTOMERS */}
        <button
          onClick={() => navigate("/admin/customers")}
          className="bg-[#111] border border-[#E6C97A]/30 p-6 rounded-lg hover:border-[#E6C97A]"
        >
          <h2 className="font-logo font-normal tracking-[0.15em] text-xl text-[#E6C97A]">
            View Customers
          </h2>

          <p className="font-logo text-gray-400 text-sm mt-2 tracking-[0.1em]">
            See all customer details
          </p>
        </button>


        {/* ANALYTICS */}
        <button
          onClick={() => navigate("/admin/analytics")}
          className="bg-[#111] border border-[#E6C97A]/30 p-6 rounded-lg hover:border-[#E6C97A]"
        >
          <h2 className="font-logo font-normal tracking-[0.15em] text-xl text-[#E6C97A]">
            Analytics
          </h2>

          <p className="font-logo text-gray-400 text-sm mt-2 tracking-[0.1em]">
            Revenue and occupancy stats
          </p>
        </button>

      </div>

    </div>

  );

}