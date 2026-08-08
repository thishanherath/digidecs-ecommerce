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
    <div className="group bg-white border border-gray-200 overflow-hidden hover:border-gray-400 transition-all duration-300 flex flex-col h-full">
      
      {/* Image Container */}
      <Link to={`/product/${product._id}`} className="relative aspect-square overflow-hidden bg-white block p-4">
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-text-dark text-white text-[10px] uppercase font-bold px-2 py-1 z-10">
            -{discount}%
          </div>
        )}
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
        />
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 border-t border-gray-100">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-text-dark text-sm line-clamp-2 hover:text-gray-500 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-1 flex-1">
          <p className="text-gray-500 text-xs line-clamp-1">{product.category?.name || "Premium Device"}</p>
        </div>

        {/* Pricing */}
        <div className="mt-3 flex flex-col pt-3 border-t border-gray-100">
          <div className="font-extrabold text-lg text-text-dark tracking-tight">
            Rs. {product.price.toLocaleString()}
          </div>
          {discount > 0 ? (
            <div className="text-xs text-gray-400 line-through">
              Rs. {product.labeledPrice.toLocaleString()}
            </div>
          ) : (
            <div className="text-xs text-transparent select-none">No Discount</div>
          )}
        </div>
      </div>
      
      {/* Action Button - Always visible, clean black border style */}
      <div className="px-4 pb-4">
        <button className="w-full py-2 border border-text-dark text-text-dark text-xs font-bold uppercase tracking-wider hover:bg-text-dark hover:text-white transition-colors duration-300">
          Add To Cart
        </button>
      </div>
    </div>
  );
}
