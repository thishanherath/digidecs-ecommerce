import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/user/login", { email, password });
      login(response.data.user, response.data.token);
      navigate("/"); // Redirect to homepage or dashboard after login
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex">

      {/* Left */}
      <div className="hidden lg:flex w-1/2 bg-[#0D1B2A] items-center justify-center text-white p-16">
        <div>
          <h1 className="text-5xl font-bold">Digidecs</h1>

          <p className="mt-6 text-lg text-gray-300">
            Smart AI Powered Ecommerce Platform
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center bg-gray-50">

        <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">

          <h2 className="text-3xl font-bold text-center">
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 mt-2">
            Login to your account
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleLogin}>

            {error && <div className="p-3 bg-red-100 text-red-600 rounded-lg text-sm">{error}</div>}

            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg p-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-lg p-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0D1B2A] text-white py-3 rounded-lg hover:bg-[#13293D] disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="mt-6 text-center">

            Don't have an account?

            <Link
              to="/register"
              className="text-blue-600 ml-2"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}