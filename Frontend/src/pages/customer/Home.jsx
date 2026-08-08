import { useState, useEffect } from "react";
import api from "../../services/api";
import ProductCard from "../../components/customer/ProductCard";
import DealsOfTheDay from "../../components/customer/DealsOfTheDay";

const heroImages = [
  { url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop', alt: 'Smartphones', title: 'Latest Smartphones' },
  { url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=800&auto=format&fit=crop', alt: 'Gaming', title: 'Next-Gen Gaming' },
  { url: 'https://images.unsplash.com/photo-1505156868547-9b49f4df4e04?q=80&w=800&auto=format&fit=crop', alt: 'Smart Watches', title: 'Smart Accessories' }
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/product");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col">
      
      {/* Full-width Hero Banner Carousel */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-12">
        <div className="relative w-full aspect-[21/9] sm:aspect-[3.5/1] rounded-3xl overflow-hidden shadow-lg group">
          
          <div className="flex w-full h-full transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {heroImages.map((img, idx) => (
              <div key={idx} className="w-full h-full flex-shrink-0 relative">
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          
          {/* Carousel Navigation Arrows */}
          <button 
            onClick={() => setCurrentSlide(prev => (prev === 0 ? heroImages.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/70 text-white hover:text-primary-purple p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          
          <button 
            onClick={() => setCurrentSlide(prev => (prev === heroImages.length - 1 ? 0 : prev + 1))}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/70 text-white hover:text-primary-purple p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>

          {/* Carousel Indicators - Hollow circles and filled pill */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {heroImages.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full border-2 ${
                  currentSlide === idx 
                    ? 'w-6 h-2 bg-primary-purple border-primary-purple' 
                    : 'w-2 h-2 bg-transparent border-white/70 hover:border-white'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Deals Of The Day Section */}
      <DealsOfTheDay />

      {/* Featured Products Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col mb-8 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-extrabold text-text-dark uppercase tracking-tight">Trending Now</h2>
            <p className="text-gray-500 text-sm mt-1">
              Explore our most popular products handpicked by our tech experts.
            </p>
          </div>

          {/* Product Grid / Loading / Error states */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-white border border-gray-200 h-96 animate-pulse p-4 flex flex-col">
                  <div className="bg-gray-100 h-1/2 mb-4" />
                  <div className="bg-gray-100 h-4 w-3/4 mb-2" />
                  <div className="bg-gray-100 h-3 w-full mb-4" />
                  <div className="bg-gray-100 h-6 w-1/3 mt-auto" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-500 p-8 rounded-2xl text-center border border-red-100">
              <p className="text-lg font-medium">{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white text-gray-500 p-16 rounded-2xl text-center border border-gray-100 shadow-sm">
              <p className="text-xl">No products available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
