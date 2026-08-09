import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import AuthModal from "../components/common/AuthModal";

export default function CustomerLayout() {
  return (
    <div className="min-h-screen bg-bg-light text-text-dark flex flex-col font-sans">
      <Navbar />
      <AuthModal />
      
      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Simple Footer */}
      <footer className="bg-dark-purple text-white/80 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4 group cursor-pointer">
                <div className="flex items-center gap-1 -skew-x-[35deg]">
                  <div className="w-2.5 h-5 bg-gradient-to-t from-[#6D28D9] to-[#A855F7] rounded-[2px] translate-y-1 shadow-sm group-hover:scale-105 transition-transform duration-300"></div>
                  <div className="w-2.5 h-5 bg-gradient-to-t from-[#A855F7] to-[#E9D5FF] rounded-[2px] -translate-y-1 shadow-sm group-hover:scale-105 transition-transform duration-300 delay-75"></div>
                </div>
                <div className="flex items-baseline">
                  <h3 className="text-white text-2xl font-bold tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>Degidecs</h3>
                </div>
              </div>
              <p className="text-sm leading-relaxed">Smarter Tools For Limitless Growth.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-light-lilac transition-colors">Shop</a></li>
                <li><a href="#" className="hover:text-light-lilac transition-colors">Categories</a></li>
                <li><a href="#" className="hover:text-light-lilac transition-colors">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-light-lilac transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-light-lilac transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-light-lilac transition-colors">Shipping Returns</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-sm text-center">
            &copy; {new Date().getFullYear()} Degidecs. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
