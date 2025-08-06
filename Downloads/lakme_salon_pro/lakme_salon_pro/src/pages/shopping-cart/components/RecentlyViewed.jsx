import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentlyViewed = ({ items, onAddToCart }) => {
  if (!items || items?.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Icon name="Clock" size={20} className="text-primary" />
            Recently Viewed
          </h2>
          
          <Link to="/product-detail">
            <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
              View All
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {items?.slice(0, 6)?.map((item) => (
            <div key={item?.id} className="bg-card border border-border rounded-lg p-3 shadow-card hover:shadow-modal transition-smooth">
              <Link to="/product-detail" className="block mb-3">
                <div className="w-full h-24 overflow-hidden rounded-md bg-muted">
                  <Image
                    src={item?.image}
                    alt={item?.name}
                    className="w-full h-full object-cover hover:scale-105 transition-smooth"
                  />
                </div>
              </Link>
              
              <div className="space-y-2">
                <Link to="/product-detail">
                  <h3 className="font-medium text-foreground line-clamp-2 text-xs hover:text-primary transition-smooth">
                    {item?.name}
                  </h3>
                </Link>
                
                <div className="flex items-center gap-1">
                  <span className="text-primary font-semibold text-sm">
                    ₹{item?.price?.toLocaleString('en-IN')}
                  </span>
                  {item?.originalPrice && item?.originalPrice > item?.price && (
                    <span className="text-xs text-muted-foreground line-through">
                      ₹{item?.originalPrice?.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                
                <Button
                  variant="outline"
                  size="xs"
                  fullWidth
                  onClick={() => onAddToCart(item?.id)}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Add
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewed;