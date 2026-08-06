import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";

export default function ProductCard({ product }) {
  // Use first image if available, otherwise a placeholder
  const imageUrl = product.images?.length > 0 
    ? product.images[0] 
    : "https://via.placeholder.com/400x300?text=No+Image+Available";

  const discount = product.labeledPrice > product.price 
    ? Math.round(((product.labeledPrice - product.price) / product.labeledPrice) * 100) 
    : 0;

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
      
      {/* Image Container */}
      <Link to={`/product/${product._id}`} className="relative aspect-square overflow-hidden bg-gray-100 block">
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            -{discount}%
          </div>
        )}
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1 text-yellow-400 mb-2">
          <Star size={14} className="fill-current" />
          <span className="text-xs font-medium text-gray-600">{product.ratingsAverage} ({product.ratingsCount})</span>
        </div>
        
        <Link to={`/product/${product._id}`}>
          <h3 className="font-bold text-gray-900 text-lg line-clamp-2 hover:text-[#0D1B2A] transition-colors duration-200">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-1 flex-1">
          <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
        </div>

        {/* Pricing & Action */}
        <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <div className="font-extrabold text-xl text-[#0D1B2A]">
              ${product.price.toFixed(2)}
            </div>
            {discount > 0 && (
              <div className="text-sm text-gray-400 line-through">
                ${product.labeledPrice.toFixed(2)}
              </div>
            )}
          </div>
          
          <button 
            className="bg-[#0D1B2A] text-white p-3 rounded-xl hover:bg-[#13293D] hover:scale-105 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
            title="Add to Cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
      
    </div>
  );
}
