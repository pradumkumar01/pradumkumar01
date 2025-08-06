import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedProducts = ({ products, onAddToCart }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = {
    mobile: 2,
    tablet: 3,
    desktop: 4
  };

  const nextSlide = () => {
    const maxIndex = products?.length - itemsPerView?.desktop;
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const canGoNext = currentIndex < products?.length - itemsPerView?.desktop;
  const canGoPrev = currentIndex > 0;

  return (
    <div className="bg-background py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl lg:text-2xl font-heading font-semibold text-foreground">
          Related Products
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={prevSlide}
            disabled={!canGoPrev}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          <button
            onClick={nextSlide}
            disabled={!canGoNext}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView?.desktop)}%)` }}
        >
          {products?.map((product) => (
            <div
              key={product?.id}
              className="w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-2"
            >
              <div className="bg-card border border-border rounded-lg overflow-hidden shadow-card hover:shadow-modal transition-smooth">
                {/* Product Image */}
                <div className="relative aspect-square bg-surface">
                  <Link to={`/product-detail?id=${product?.id}`}>
                    <Image
                      src={product?.image}
                      alt={product?.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  
                  {/* Wishlist Button */}
                  <button className="absolute top-2 right-2 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-smooth">
                    <Icon name="Heart" size={16} className="text-muted-foreground hover:text-primary" />
                  </button>

                  {/* Discount Badge */}
                  {product?.discount && (
                    <div className="absolute top-2 left-2 bg-success text-success-foreground px-2 py-1 rounded text-xs font-medium">
                      {product?.discount}% OFF
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <Link to={`/product-detail?id=${product?.id}`}>
                      <h3 className="font-medium text-foreground hover:text-primary transition-smooth line-clamp-2 mb-1">
                        {product?.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      by {product?.brand}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={12}
                        className={i < Math.floor(product?.rating) ? 'text-accent fill-current' : 'text-muted-foreground'}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">
                      ({product?.reviewCount})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="font-semibold text-foreground">
                      ₹{product?.price?.toLocaleString('en-IN')}
                    </span>
                    {product?.originalPrice && product?.originalPrice > product?.price && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{product?.originalPrice?.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  {/* Skin Types */}
                  {product?.skinTypes && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product?.skinTypes?.slice(0, 2)?.map((type) => (
                        <span
                          key={type}
                          className="px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                        >
                          {type}
                        </span>
                      ))}
                      {product?.skinTypes?.length > 2 && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                          +{product?.skinTypes?.length - 2}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Add to Cart Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => onAddToCart(product)}
                    disabled={!product?.inStock}
                    iconName="ShoppingCart"
                    iconPosition="left"
                  >
                    {product?.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Mobile Scroll Indicators */}
      <div className="flex justify-center mt-4 space-x-2 md:hidden">
        {Array.from({ length: Math.ceil(products?.length / itemsPerView?.mobile) })?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * itemsPerView?.mobile)}
            className={`w-2 h-2 rounded-full transition-smooth ${
              Math.floor(currentIndex / itemsPerView?.mobile) === index
                ? 'bg-primary' :'bg-muted-foreground'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;