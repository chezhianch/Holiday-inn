import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Show/Hide password state
  const [showPassword, setShowPassword] = useState(false);

  // UI states
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      const res = await fetch("http://localhost:5000/api/admin/login", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          // Email case-insensitive
          email: email.trim().toLowerCase(),

          // Password case-sensitive
          password: password

        })

      });

      const data = await res.json();

      if (data.success) {

        localStorage.setItem("adminToken", data.token);

        navigate("/admin/dashboard");

      } else {

        setError(data.message || "Invalid email or password");

      }

    } catch (err) {

      setError("Server error. Please try again.");

    }

    setLoading(false);

  };


  return (

    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-[#111] border border-[#E6C97A]/20 rounded-xl p-8 shadow-xl">


        {/* LOGO */}
        <div className="text-center mb-8">

          <span className="font-logo font-normal text-4xl tracking-[0.25em] bg-gradient-to-r from-[#E6C97A] via-[#C6A75E] to-[#A8893E] bg-clip-text text-transparent block">
            AMMA
          </span>

          <span className="font-logo text-[#E6C97A] text-xs tracking-[0.4em] uppercase">
            HOMESTAY
          </span>

        </div>


        {/* TITLE */}
        <div className="text-center mb-6">

          <h2 className="font-logo text-2xl tracking-[0.15em] text-white">
            Admin Login
          </h2>

          <p className="font-logo text-gray-400 text-sm mt-1">
            Dashboard Access
          </p>

        </div>


        {/* ERROR MESSAGE */}
        {error && (

          <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>

        )}


        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">


          {/* EMAIL INPUT */}
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              w-full
              bg-black
              border border-[#E6C97A]/30
              text-white
              px-4 py-3
              rounded
              focus:outline-none
              focus:border-[#E6C97A]
            "
          />


          {/* PASSWORD INPUT WITH SHOW/HIDE */}
          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="
                w-full
                bg-black
                border border-[#E6C97A]/30
                text-white
                px-4 py-3
                rounded
                focus:outline-none
                focus:border-[#E6C97A]
                pr-16
              "
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
                absolute
                right-3
                top-1/2
                transform
                -translate-y-1/2
                text-[#E6C97A]
                text-sm
                hover:text-white
              "
            >
              {showPassword ? "Hide" : "Show"}
            </button>

          </div>


          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-3
              rounded
              font-semibold
              text-black
              bg-gradient-to-r
              from-[#E6C97A]
              via-[#C6A75E]
              to-[#A8893E]
              hover:opacity-90
              transition
            "
          >
            {loading ? "LOGGING IN..." : "LOGIN"}
          </button>


        </form>


        {/* BACK BUTTON */}
        <div className="text-center mt-6">

          <button
            onClick={() => navigate("/")}
            className="text-[#E6C97A] hover:underline text-sm"
          >
            ← Back to Website
          </button>

        </div>


      </div>

    </div>

  );

}