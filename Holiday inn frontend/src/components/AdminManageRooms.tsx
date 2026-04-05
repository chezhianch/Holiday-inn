import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

interface Room {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  guests: number;
}

export default function AdminManageRooms() {

  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    guests: ""
  });

  useEffect(() => {
    if (!token) {
      navigate("/admin");
      return;
    }

    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/rooms", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (data.success) {
        setRooms(data.rooms);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createRoom = async () => {

    if (!form.name || !form.price || !form.image || !form.description || !form.guests) {
      alert("Fill all fields");
      return;
    }

    await fetch("http://localhost:5000/api/admin/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        guests: Number(form.guests),
        amenities: []
      })
    });

    setForm({
      name: "",
      price: "",
      image: "",
      description: "",
      guests: ""
    });

    fetchRooms();
  };

  const deleteRoom = async (id: string) => {

    await fetch(`http://localhost:5000/api/admin/rooms/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    fetchRooms();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-[#E6C97A] flex items-center justify-center">
        Loading Rooms...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-16 py-10">

      {/* Header */}
      <div className="relative text-center mb-10">

        <div
          onClick={() => navigate("/admin/management")}
          className="absolute left-0 top-0 cursor-pointer text-[#E6C97A]"
        >
          <Home size={36}/>
        </div>

        <h1 className="text-4xl font-bold text-[#E6C97A]">
          Manage Rooms
        </h1>

      </div>

      {/* Create Room Form */}
      <div className="bg-[#111] p-6 rounded-lg mb-10 border border-[#E6C97A]/30">

        <h2 className="text-xl text-[#E6C97A] mb-4">Add New Room</h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            placeholder="Room Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-black border p-2 rounded"
          />

          <input
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="bg-black border p-2 rounded"
          />

          <input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="bg-black border p-2 rounded"
          />

          <input
            placeholder="Guests"
            value={form.guests}
            onChange={(e) => setForm({ ...form, guests: e.target.value })}
            className="bg-black border p-2 rounded"
          />

        </div>

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="bg-black border p-2 rounded w-full mt-4"
        />

        <button
          onClick={createRoom}
          className="mt-4 bg-[#E6C97A] text-black px-6 py-2 rounded"
        >
          Create Room
        </button>

      </div>

      {/* Room List */}
      <div className="grid grid-cols-3 gap-6">

        {rooms.map(room => (

          <div key={room._id} className="bg-[#111] rounded-lg overflow-hidden border border-[#E6C97A]/20">

            <img
              src={room.image}
              alt={room.name}
              className="h-40 w-full object-cover"
            />

            <div className="p-4">

              <h3 className="text-lg text-[#E6C97A]">{room.name}</h3>

              <p className="text-sm text-gray-400">
                ₹{room.price} / night
              </p>

              <p className="text-sm mt-2">
                {room.description}
              </p>

              <p className="text-sm mt-2 text-gray-400">
                Guests: {room.guests}
              </p>

              <button
                onClick={() => deleteRoom(room._id)}
                className="mt-4 bg-red-500 px-4 py-1 rounded text-sm"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}