import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

export default function CustomerLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      
      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Simple Footer */}
      <footer className="bg-[#0D1B2A] text-gray-300 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">Digidecs</h3>
              <p className="text-sm">Your premium destination for AI-powered technology and cutting-edge digital experiences.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Shop</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Categories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Returns</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-sm text-center">
            &copy; {new Date().getFullYear()} Digidecs. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
