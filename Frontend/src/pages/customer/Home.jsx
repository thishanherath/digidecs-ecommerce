import { useState, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import api from "../../services/api";
import ProductCard from "../../components/customer/ProductCard";
import DealsOfTheDay from "../../components/customer/DealsOfTheDay";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      
      {/* Hero Section */}
      <section className="relative bg-[#0D1B2A] text-white overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-purple-600/20 to-transparent blur-3xl rounded-full transform -translate-x-1/3 translate-y-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6">
              <Sparkles size={16} className="text-yellow-400" />
              <span>Next-Gen Commerce</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Elevate Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Digital Lifestyle</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
              Discover our curated collection of premium tech gadgets and smart devices designed to transform the way you live and work.
            </p>
            <div className="flex items-center gap-4">
              <button className="bg-white text-[#0D1B2A] px-8 py-4 rounded-full font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                Shop Now
              </button>
              <button className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white border border-white/20 hover:bg-white/10 transition-all duration-300">
                View Offers <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Deals Of The Day Section */}
      <DealsOfTheDay />

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Trending Now</h2>
              <p className="text-gray-500 max-w-2xl text-lg">
                Explore our most popular products handpicked by our tech experts.
              </p>
            </div>
          </div>

          {/* Product Grid / Loading / Error states */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-white rounded-2xl h-96 animate-pulse p-4 flex flex-col border border-gray-100">
                  <div className="bg-gray-200 h-1/2 rounded-xl mb-4" />
                  <div className="bg-gray-200 h-6 w-3/4 rounded mb-2" />
                  <div className="bg-gray-200 h-4 w-full rounded mb-4" />
                  <div className="bg-gray-200 h-8 w-1/3 rounded mt-auto" />
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
