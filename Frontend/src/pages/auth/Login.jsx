import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ModalContext } from "../../context/ModalContext";
import api from "../../services/api";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const { openRegisterModal, closeAuthModal } = useContext(ModalContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/user/login", { email, password });
      login(response.data.user, response.data.token);
      closeAuthModal(); // Close modal on success
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-text-dark tracking-tight">
          Welcome Back
        </h2>
        <p className="text-gray-500 mt-2 text-sm font-medium">
          Enter your credentials to access your account
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleLogin}>
        {error && (
          <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-purple transition-colors">
              <Mail size={18} strokeWidth={2} />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-text-dark font-medium placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-purple/20 focus:border-primary-purple transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-purple transition-colors">
              <Lock size={18} strokeWidth={2} />
            </div>
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-text-dark font-medium placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-purple/20 focus:border-primary-purple transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button type="button" className="text-xs font-semibold text-primary-purple hover:text-dark-purple transition-colors">
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full group relative flex items-center justify-center gap-2 bg-primary-purple text-white py-3 rounded-xl font-bold tracking-wide hover:bg-dark-purple transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden shadow-lg shadow-primary-purple/30 hover:shadow-xl hover:shadow-primary-purple/40 active:scale-[0.98]"
        >
          <span className="relative z-10">{loading ? "Authenticating..." : "Sign In"}</span>
          {!loading && <ArrowRight size={16} strokeWidth={2.5} className="relative z-10 group-hover:translate-x-1 transition-transform" />}
          
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-sm font-medium text-gray-500">
          New to Digidecs?
          <button 
            type="button" 
            onClick={openRegisterModal} 
            className="text-primary-purple font-bold ml-1.5 hover:underline decoration-2 underline-offset-4 transition-all"
          >
            Create an account
          </button>
        </p>
      </div>
    </>
  );
}