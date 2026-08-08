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
          <div className="bg-white text-gray-500 p-16 border border-gray-200 text-center w-full">
            <p className="text-sm font-semibold uppercase tracking-wider">No deals available at the moment.</p>
          </div>
        ) : (
          <div className="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory hide-scrollbar">
            {deals.map((deal) => (
            <Link key={deal._id} to={`/product/${deal.slug}`} className="group flex-none w-[280px] sm:w-[320px] snap-start flex flex-col border border-gray-200 hover:border-text-dark transition-colors duration-300">
              {/* Image Box */}
              <div className="relative bg-white aspect-[4/5] p-6 flex items-center justify-center border-b border-gray-100 overflow-hidden">
                <img 
                  src={deal.images?.[0] || 'https://via.placeholder.com/300?text=No+Image'} 
                  alt={deal.name}
                  className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
                {/* Deal Badge (Hexagon/Zap) */}
                <div className="absolute top-4 left-4 bg-text-dark text-white text-[10px] uppercase font-bold px-2 py-1 flex items-center gap-1">
                  <Zap size={10} fill="currentColor" />
                  SALE
                </div>
              </div>
              
              {/* Product Info */}
              <div className="flex flex-col items-center text-center p-4 bg-white">
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                  {deal.brand || 'PREMIUM'}
                </span>
                <h3 className="text-text-dark font-semibold text-sm leading-snug mb-2 line-clamp-2">
                  {deal.name}
                </h3>
                <div className="flex flex-col items-center gap-1 mt-auto">
                  {deal.labeledPrice > deal.price && (
                    <span className="text-gray-400 text-xs line-through font-medium">Rs. {deal.labeledPrice.toLocaleString()}</span>
                  )}
                  <span className="text-text-dark font-extrabold text-lg tracking-tight">Rs. {deal.price.toLocaleString()}</span>
                </div>
              </div>
            </Link>
          ))}
          </div>
        )}

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="w-6 h-1.5 bg-text-dark"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-gray-200 cursor-pointer hover:bg-gray-400 transition-colors"></div>
          ))}
        </div>
      </div>
    </section>
  );
}
