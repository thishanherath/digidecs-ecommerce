import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/user/register", { 
        firstName, 
        lastName, 
        email, 
        password 
      });
      // Backend returns token and user upon successful registration
      login(response.data.user, response.data.token);
      navigate("/"); // Redirect to homepage or dashboard after registering
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };
  return (

    <div className="min-h-screen flex">

      <div className="hidden lg:flex w-1/2 bg-[#0D1B2A] items-center justify-center text-white p-16">

        <div>

          <h1 className="text-5xl font-bold">
            Digidecs
          </h1>

          <p className="mt-6 text-lg text-gray-300">
            Create your customer account
          </p>

        </div>

      </div>

      <div className="flex-1 flex items-center justify-center bg-gray-50">

        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">

          <h2 className="text-3xl font-bold text-center">
            Register
          </h2>

          <form className="mt-8 space-y-4" onSubmit={handleRegister}>

            {error && <div className="p-3 bg-red-100 text-red-600 rounded-lg text-sm">{error}</div>}

            <input
              type="text"
              placeholder="First Name"
              className="w-full border rounded-lg p-3"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Last Name"
              className="w-full border rounded-lg p-3"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />

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
              {loading ? "Registering..." : "Register"}
            </button>

          </form>

          <p className="text-center mt-6">

            Already have an account?

            <Link
              to="/login"
              className="text-blue-600 ml-2"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  );
}