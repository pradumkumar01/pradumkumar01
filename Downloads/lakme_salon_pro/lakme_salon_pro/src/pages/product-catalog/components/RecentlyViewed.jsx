import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentlyViewed = ({ products, onProductClick }) => {
  if (!products || products?.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Clock" size={20} className="text-muted-foreground" />
        <h3 className="font-heading text-lg font-semibold text-foreground">
          Recently Viewed
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products?.map((product) => (
          <div
            key={product?.id}
            onClick={() => onProductClick(product)}
            className="group bg-card rounded-lg p-4 cursor-pointer hover:shadow-card transition-all duration-300 border border-border"
          >
            <div className="aspect-square mb-3 overflow-hidden rounded-lg">
              <img
                src={product?.images?.[0] || "/assets/images/no_image.png"}
                alt={product?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <h4 className="font-medium text-foreground text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
              {product?.name}
            </h4>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-foreground">
                ₹{product?.price?.toLocaleString('en-IN')}
              </span>
              {product?.originalPrice && product?.originalPrice > product?.price && (
                <span className="text-xs text-muted-foreground line-through">
                  ₹{product?.originalPrice?.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;