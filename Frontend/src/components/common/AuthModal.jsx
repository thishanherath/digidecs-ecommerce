import { useContext, useEffect } from "react";
import { ModalContext } from "../../context/ModalContext";
import { X } from "lucide-react";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";

export default function AuthModal() {
  const { isAuthModalOpen, authModalType, closeAuthModal } = useContext(ModalContext);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      
      {/* Click outside to close (Optional, but good UX) */}
      <div className="absolute inset-0 z-0" onClick={closeAuthModal}></div>

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-5xl bg-bg-light rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={closeAuthModal}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-10 h-10 bg-white/10 hover:bg-white/20 text-gray-500 hover:text-text-dark lg:text-white/70 lg:hover:text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        {/* Decorative Background Elements for Mobile */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-purple/20 rounded-full blur-3xl lg:hidden pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-light-lilac/50 rounded-full blur-3xl lg:hidden pointer-events-none"></div>

        {/* Left Side - Brand & Graphics (Desktop Only) */}
        <div className="hidden lg:flex w-1/2 bg-dark-purple relative flex-col justify-center items-center overflow-hidden">
          {/* Abstract shapes */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary-purple/30 blur-[100px]"></div>
            <div className="absolute bottom-[10%] -right-[20%] w-[60%] h-[60%] rounded-full bg-primary-purple/20 blur-[120px]"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 p-12 text-center">
            <div className="inline-flex items-center gap-3 group mb-10">
              <div className="flex items-center gap-1.5 -skew-x-[35deg]">
                <div className="w-4 h-10 bg-gradient-to-t from-[#6D28D9] to-[#A855F7] rounded-sm translate-y-2 shadow-sm"></div>
                <div className="w-4 h-10 bg-gradient-to-t from-[#A855F7] to-[#E9D5FF] rounded-sm -translate-y-2 shadow-sm"></div>
              </div>
              <div className="flex items-baseline">
                <span className="text-white text-4xl font-extrabold tracking-tighter" style={{ fontFamily: 'Sora, sans-serif' }}>Digidecs.</span>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white leading-tight mb-4">
              Smart AI Powered<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-purple to-light-lilac">
                Ecommerce Platform
              </span>
            </h2>
            <p className="text-gray-400 text-sm max-w-sm mx-auto mb-10">
              Experience the future of shopping with our intelligent product recommendations.
            </p>
            
            {/* Glassmorphism Feature Cards */}
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-left">
              <div className="bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-2xl">
                <div className="w-8 h-8 rounded-full bg-primary-purple/20 flex items-center justify-center mb-2">
                  <span className="text-primary-purple text-sm">🤖</span>
                </div>
                <h3 className="text-white font-semibold text-sm">AI Insights</h3>
              </div>
              <div className="bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-2xl">
                <div className="w-8 h-8 rounded-full bg-primary-purple/20 flex items-center justify-center mb-2">
                  <span className="text-primary-purple text-sm">⚡</span>
                </div>
                <h3 className="text-white font-semibold text-sm">Fast Checkout</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Container */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative z-10 bg-white/80 backdrop-blur-xl lg:bg-white min-h-[500px]">
          
          {/* Mobile Logo */}
          <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2 group">
            <div className="flex items-center gap-1 -skew-x-[35deg]">
              <div className="w-2 h-5 bg-gradient-to-t from-[#6D28D9] to-[#A855F7] rounded-sm translate-y-1"></div>
              <div className="w-2 h-5 bg-gradient-to-t from-[#A855F7] to-[#E9D5FF] rounded-sm -translate-y-1"></div>
            </div>
            <span className="text-text-dark text-xl font-extrabold tracking-tighter">Digidecs.</span>
          </div>

          <div className="w-full max-w-md pt-8 lg:pt-0">
            {authModalType === "login" ? <Login /> : <Register />}
          </div>
        </div>
      </div>
    </div>
  );
}
