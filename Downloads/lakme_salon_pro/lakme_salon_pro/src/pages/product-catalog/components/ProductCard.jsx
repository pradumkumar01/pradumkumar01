import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onProductClick, onAddToCart, onToggleWishlist, onQuickView, isInWishlist }) => {
  const discount = product?.originalPrice ? 
    Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100) : 0;

  return (
    <div className="group bg-card rounded-xl shadow-card hover:shadow-modal transition-all duration-300 overflow-hidden border border-border">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product?.images?.[0] || "/assets/images/no_image.png"}
          alt={product?.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => onProductClick(product)}
        />
        
        {/* Sale Badge */}
        {product?.isOnSale && discount > 0 && (
          <div className="absolute top-2 left-2 bg-success text-success-foreground px-2 py-1 rounded-lg text-xs font-medium">
            {discount}% OFF
          </div>
        )}

        {/* Stock Status */}
        {!product?.inStock && (
          <div className="absolute top-2 right-2 bg-error text-error-foreground px-2 py-1 rounded-lg text-xs font-medium">
            Out of Stock
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist(product)}
          className={`absolute top-2 right-2 p-2 rounded-full transition-smooth ${
            product?.inStock ? 'bg-background/80 backdrop-blur-sm hover:bg-background' : 'hidden'
          } ${isInWishlist ? 'text-error' : 'text-muted-foreground hover:text-error'}`}
        >
          <Icon 
            name="Heart" 
            size={16} 
            className={isInWishlist ? 'fill-current' : ''}
          />
        </button>

        {/* Quick Actions - Show on Hover */}
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onQuickView(product)}
              className="flex-1 text-xs py-1.5"
              iconName="Eye"
              iconPosition="left"
            >
              Quick View
            </Button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 md:p-4">
        {/* Brand */}
        <p className="text-xs text-muted-foreground mb-1">{product?.brand}</p>

        {/* Product Name */}
        <h3 
          className="font-medium text-foreground text-sm md:text-base mb-2 line-clamp-2 cursor-pointer hover:text-primary transition-colors"
          onClick={() => onProductClick(product)}
        >
          {product?.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={12}
                className={i < Math.floor(product?.rating) ? 'text-accent fill-current' : 'text-muted-foreground/30'}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product?.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-base md:text-lg font-semibold text-foreground">
            ₹{product?.price?.toLocaleString('en-IN')}
          </span>
          {product?.originalPrice && product?.originalPrice > product?.price && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product?.originalPrice?.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Skin Type Tags */}
        {product?.skinTypes && product?.skinTypes?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product?.skinTypes?.slice(0, 2)?.map((type, index) => (
              <span
                key={index}
                className={`text-xs px-2 py-0.5 rounded-full ${
                  type === 'Oily' ? 'bg-blue-100 text-blue-800' :
                  type === 'Dry' ? 'bg-orange-100 text-orange-800' :
                  type === 'Normal' ? 'bg-green-100 text-green-800' :
                  type === 'Combination' ? 'bg-purple-100 text-purple-800' :
                  type === 'Sensitive'? 'bg-pink-100 text-pink-800' : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {type}
              </span>
            ))}
            {product?.skinTypes?.length > 2 && (
              <span className="text-xs text-muted-foreground px-2 py-0.5">
                +{product?.skinTypes?.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Stock Info */}
        {product?.inStock && product?.stockCount && product?.stockCount < 10 && (
          <p className="text-xs text-warning mb-2">
            Only {product?.stockCount} left!
          </p>
        )}

        {/* Add to Cart Button */}
        <Button
          variant={product?.inStock ? "default" : "secondary"}
          size="sm"
          fullWidth
          onClick={() => onAddToCart(product)}
          disabled={!product?.inStock}
          iconName={product?.inStock ? "ShoppingCart" : "AlertCircle"}
          iconPosition="left"
          className="text-xs md:text-sm"
        >
          {product?.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;