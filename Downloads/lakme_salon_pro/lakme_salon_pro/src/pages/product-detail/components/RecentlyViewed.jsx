import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const RecentlyViewed = ({ products }) => {
  if (!products || products?.length === 0) {
    return null;
  }

  return (
    <div className="bg-surface py-6">
      <div className="container mx-auto px-4">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
          Recently Viewed
        </h2>
        
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {products?.map((product) => (
            <div
              key={product?.id}
              className="flex-shrink-0 w-32 bg-card border border-border rounded-lg overflow-hidden shadow-card hover:shadow-modal transition-smooth"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-background">
                <Link to={`/product-detail?id=${product?.id}`}>
                  <Image
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              </div>

              {/* Product Info */}
              <div className="p-2">
                <Link to={`/product-detail?id=${product?.id}`}>
                  <h3 className="text-xs font-medium text-foreground hover:text-primary transition-smooth line-clamp-2 mb-1">
                    {product?.name}
                  </h3>
                </Link>
                
                <div className="flex items-center space-x-1 mb-1">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={10}
                      className={i < Math.floor(product?.rating) ? 'text-accent fill-current' : 'text-muted-foreground'}
                    />
                  ))}
                </div>

                <div className="flex items-center space-x-1">
                  <span className="text-xs font-semibold text-foreground">
                    ₹{product?.price?.toLocaleString('en-IN')}
                  </span>
                  {product?.originalPrice && product?.originalPrice > product?.price && (
                    <span className="text-xs text-muted-foreground line-through">
                      ₹{product?.originalPrice?.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewed;