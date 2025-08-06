import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemove, onMoveToWishlist }) => {
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(item?.id, newQuantity);
  };

  const handleRemove = () => {
    onRemove(item?.id);
    setShowRemoveDialog(false);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card border border-border rounded-lg shadow-card">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-full sm:w-24 h-32 sm:h-24 overflow-hidden rounded-md bg-muted">
            <Image
              src={item?.image}
              alt={item?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-medium text-foreground line-clamp-2">
                {item?.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {item?.category}
              </p>
              {item?.variant && (
                <p className="text-sm text-muted-foreground">
                  Variant: {item?.variant}
                </p>
              )}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-lg font-semibold text-primary">
                  ₹{item?.price?.toLocaleString('en-IN')}
                </span>
                {item?.originalPrice && item?.originalPrice > item?.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{item?.originalPrice?.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex sm:hidden items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(item?.quantity - 1)}
                  disabled={item?.quantity <= 1}
                >
                  <Icon name="Minus" size={16} />
                </Button>
                <span className="w-12 text-center font-medium">
                  {item?.quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(item?.quantity + 1)}
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMoveToWishlist(item?.id)}
                >
                  <Icon name="Heart" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRemoveDialog(true)}
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Quantity Controls */}
        <div className="hidden sm:flex flex-col items-end gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(item?.quantity - 1)}
              disabled={item?.quantity <= 1}
            >
              <Icon name="Minus" size={16} />
            </Button>
            <span className="w-12 text-center font-medium">
              {item?.quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(item?.quantity + 1)}
            >
              <Icon name="Plus" size={16} />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMoveToWishlist(item?.id)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="Heart" size={16} />
              <span className="ml-1">Save</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowRemoveDialog(true)}
              className="text-muted-foreground hover:text-error"
            >
              <Icon name="Trash2" size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Remove Confirmation Dialog */}
      {showRemoveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 max-w-sm w-full shadow-modal">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Remove Item</h3>
                <p className="text-sm text-muted-foreground">
                  Are you sure you want to remove this item?
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowRemoveDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                fullWidth
                onClick={handleRemove}
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItem;