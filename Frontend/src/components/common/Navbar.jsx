import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ShoppingCart, User, Search, LogOut, PackageOpen } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-[#0D1B2A] text-white p-2 rounded-xl group-hover:scale-105 transition-transform duration-300">
              <PackageOpen size={24} />
            </div>
            <span className="font-bold text-2xl tracking-tight text-[#0D1B2A]">
              Digidecs
            </span>
          </Link>

          {/* Search Bar (Hidden on Mobile) */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative group">
            <input 
              type="text" 
              placeholder="Search AI-powered tech..." 
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-full py-2.5 px-5 pl-12 outline-none focus:ring-2 focus:ring-[#0D1B2A]/20 focus:border-[#0D1B2A] transition-all duration-300"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0D1B2A] transition-colors duration-300" size={18} />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            
            <Link to="/cart" className="relative text-gray-600 hover:text-[#0D1B2A] transition-colors duration-300">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-pulse">
                3
              </span>
            </Link>

            {user ? (
              <div className="flex items-center gap-4 border-l border-gray-200 pl-6">
                <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-300">
                  <div className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {user.firstName?.charAt(0) || 'U'}
                  </div>
                  <div className="hidden sm:block text-sm font-medium text-gray-700">
                    {user.firstName}
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300 p-2 rounded-lg hover:bg-red-50"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
                <Link to="/login" className="text-gray-600 hover:text-[#0D1B2A] font-medium transition-colors duration-300 px-2 py-2">
                  Login
                </Link>
                <Link to="/register" className="bg-[#0D1B2A] hover:bg-[#13293D] text-white px-5 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md shadow-[#0D1B2A]/20 hover:shadow-lg hover:-translate-y-0.5">
                  Sign Up
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}
