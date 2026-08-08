import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";
import api from "../../services/api";

export default function DealsOfTheDay() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await api.get("/product/deals");
        setDeals(response.data);
      } catch (err) {
        console.error("Error fetching deals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-dark">Deals Of The Day</h2>
          </div>
          <div className="flex overflow-x-auto gap-6 pb-6">
             {[1, 2, 3, 4].map((n) => (
               <div key={n} className="w-[280px] h-[350px] bg-gray-100 rounded-lg animate-pulse shrink-0"></div>
             ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-dark">Deals Of The Day</h2>
          <Link to="/shop" className="flex items-center gap-2 font-bold text-sm text-text-dark hover:text-primary-purple transition-colors">
            More Products <ArrowRight size={16} />
          </Link>
        </div>

        {/* Carousel Container */}
        {deals.length === 0 ? (
          <div className="bg-white text-gray-500 p-16 rounded-2xl text-center border border-gray-100 shadow-sm w-full">
            <p className="text-xl">No deals available at the moment.</p>
          </div>
        ) : (
          <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory hide-scrollbar">
            {deals.map((deal) => (
            <Link key={deal._id} to={`/product/${deal.slug}`} className="group flex-none w-[280px] sm:w-[320px] snap-start flex flex-col">
              {/* Image Box */}
              <div className="relative bg-gray-100 rounded-lg aspect-[4/5] p-6 flex items-center justify-center mb-4 overflow-hidden">
                <img 
                  src={deal.images?.[0] || 'https://via.placeholder.com/300?text=No+Image'} 
                  alt={deal.name}
                  className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
                {/* Deal Badge (Hexagon/Zap) */}
                <div className="absolute bottom-4 left-4 bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center text-primary-purple border border-gray-100">
                  <Zap size={14} fill="currentColor" />
                </div>
              </div>
              
              {/* Product Info */}
              <div className="flex flex-col items-center text-center px-2">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                  {deal.brand || 'BRAND'}
                </span>
                <h3 className="text-primary-purple font-semibold text-sm md:text-base leading-snug mb-2 line-clamp-2">
                  {deal.name}
                </h3>
                <div className="flex flex-col items-center gap-1">
                  {deal.labeledPrice > deal.price && (
                    <span className="text-gray-400 text-xs line-through font-medium">Rs. {deal.labeledPrice.toLocaleString()}</span>
                  )}
                  <span className="text-text-dark font-extrabold text-lg">Rs. {deal.price.toLocaleString()}</span>
                </div>
              </div>
            </Link>
          ))}
          </div>
        )}

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="w-6 h-2 bg-primary-purple rounded-full"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-gray-200 border border-gray-300 rounded-full cursor-pointer hover:bg-primary-purple/50 transition-colors"></div>
          ))}
        </div>
      </div>
    </section>
  );
}
