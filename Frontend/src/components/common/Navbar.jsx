import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Search, User, Phone, ShoppingBag, Menu, ChevronDown, Tag } from "lucide-react";
import api from "../../services/api";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchNavbarData = async () => {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
          api.get("/categories"),
          api.get("/products/brands")
        ]);
        setCategories(categoriesRes.data);
        setBrands(brandsRes.data);
      } catch (error) {
        console.error("Error fetching navbar data:", error);
      }
    };
    fetchNavbarData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex flex-col font-sans">
      {/* Tier 1: Top Bar */}
      <div className="bg-bg-light text-xs py-2 text-text-dark/70 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="font-medium tracking-wider">THE REVOLUTIONARY MOBILE STORE</div>
          <div className="flex items-center gap-6 font-medium">
            <Link to="/store-locator" className="hover:text-primary-purple transition-colors">Store Locator</Link>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-text-dark">Welcome, {user.firstName}</span>
                <button onClick={handleLogout} className="hover:text-red-500 transition-colors">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-1.5 hover:text-primary-purple transition-colors">
                <User size={14} /> Sign In / Register
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Tier 2: Middle Bar */}
      <div className="bg-white w-full text-text-dark border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-24 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex items-center gap-1.5 -skew-x-[35deg]">
              <div className="w-3.5 h-7 bg-gradient-to-t from-[#6D28D9] to-[#A855F7] rounded-sm translate-y-1.5 shadow-sm group-hover:scale-105 transition-transform duration-300"></div>
              <div className="w-3.5 h-7 bg-gradient-to-t from-[#A855F7] to-[#E9D5FF] rounded-sm -translate-y-1.5 shadow-sm group-hover:scale-105 transition-transform duration-300 delay-75"></div>
            </div>
            <div className="flex items-baseline">
              <span className="text-text-dark text-[32px] font-bold tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>Degidecs</span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-8 font-bold text-text-dark text-sm">
            <Link to="/" className="text-primary-purple">Home</Link>
            <Link to="/shop" className="hover:text-primary-purple transition-colors">Shop</Link>
            <Link to="/about" className="hover:text-primary-purple transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-primary-purple transition-colors">Contact Us</Link>
            <Link to="/pre-orders" className="hover:text-primary-purple transition-colors">Pre Orders</Link>
          </div>

          {/* Right Section (Hotline & Cart) */}
          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-3">
              <Phone className="text-text-dark/70" size={32} strokeWidth={1.5} />
              <div className="flex flex-col">
                <span className="text-text-dark/60 text-xs font-medium">Hotline :</span>
                <span className="font-extrabold text-text-dark text-lg tracking-tight">+94 777 19 19 19</span>
              </div>
            </div>
            
            <div className="h-10 w-px bg-gray-200 hidden lg:block"></div>
            
            <Link to="/cart" className="relative flex flex-col items-center justify-center group text-text-dark hover:text-primary-purple transition-colors">
              <div className="relative">
                <ShoppingBag size={28} strokeWidth={1.5} />
                <span className="absolute -top-1 -right-2 bg-primary-purple text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  0
                </span>
              </div>
              <span className="text-xs font-semibold mt-1">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Tier 3: Bottom Bar */}
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-14 items-center gap-6">
          
          {/* Browse By Brand Dropdown */}
          <div className="flex items-center h-full border-x border-gray-200 px-6 min-w-[240px] cursor-pointer group relative">
            <Menu size={20} className="text-text-dark mr-3" />
            <span className="font-bold text-text-dark text-sm">Browse By Brand</span>
            <ChevronDown size={16} className="text-gray-400 ml-auto" />
            
            {/* Simple dropdown menu for brands on hover */}
            <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              {brands.length > 0 ? (
                brands.map(brand => (
                  <div key={brand} className="px-4 py-2 text-sm text-text-dark hover:bg-bg-light hover:text-primary-purple">
                    {brand}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-500">No brands found</div>
              )}
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-3xl flex items-center h-10 border border-primary-purple rounded-sm overflow-hidden bg-white">
            <select className="bg-white h-full px-4 text-sm text-text-dark/70 border-r border-gray-200 outline-none w-48 cursor-pointer">
              <option value="">All Categories</option>
              {categories.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
            <input 
              type="text" 
              placeholder="Looking for Something Intersting..." 
              className="flex-1 h-full px-4 outline-none text-sm text-text-dark" 
            />
            <button className="h-full px-4 bg-white text-text-dark/70 hover:text-primary-purple transition-colors flex items-center justify-center">
              <Search size={20} strokeWidth={2} />
            </button>
          </div>

          {/* Special Offers */}
          <div className="flex items-center pr-2">
            <Link to="/special-offers" className="flex items-center gap-2 font-bold text-text-dark hover:text-primary-purple text-sm transition-colors">
              <Tag size={20} className="text-text-dark/70" style={{ transform: 'scaleX(-1)' }} />
              Special Offers
            </Link>
          </div>
          
        </div>
      </div>
    </nav>
  );
}
