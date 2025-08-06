import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SavedForLater = ({ items, onMoveToCart, onRemove }) => {
  if (!items || items?.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
        <Icon name="Heart" size={20} className="text-primary" />
        Saved for Later ({items?.length})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items?.map((item) => (
          <div key={item?.id} className="bg-card border border-border rounded-lg p-4 shadow-card">
            <div className="relative mb-3">
              <div className="w-full h-32 overflow-hidden rounded-md bg-muted">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => onRemove(item?.id)}
                className="absolute top-2 right-2 w-8 h-8 bg-background/80 rounded-full flex items-center justify-center hover:bg-background transition-smooth"
              >
                <Icon name="X" size={14} className="text-muted-foreground" />
              </button>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-foreground line-clamp-2 text-sm">
                {item?.name}
              </h3>
              
              <div className="flex items-center gap-2">
                <span className="text-primary font-semibold">
                  ₹{item?.price?.toLocaleString('en-IN')}
                </span>
                {item?.originalPrice && item?.originalPrice > item?.price && (
                  <span className="text-xs text-muted-foreground line-through">
                    ₹{item?.originalPrice?.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button
                  variant="default"
                  size="sm"
                  fullWidth
                  onClick={() => onMoveToCart(item?.id)}
                  iconName="ShoppingCart"
                  iconPosition="left"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedForLater;