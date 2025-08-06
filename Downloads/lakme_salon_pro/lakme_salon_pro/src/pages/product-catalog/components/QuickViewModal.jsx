import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickViewModal = ({ 
  product, 
  onClose, 
  onAddToCart, 
  onToggleWishlist, 
  onViewFullDetails, 
  isInWishlist 
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const discount = product?.originalPrice ? 
    Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity });
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-background rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-modal">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Quick View
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border border-border">
              <img
                src={product?.images?.[selectedImageIndex] || "/assets/images/no_image.png"}
                alt={product?.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image Thumbnails */}
            {product?.images && product?.images?.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product?.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden ${
                      selectedImageIndex === index ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product?.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            {/* Brand */}
            <p className="text-sm text-muted-foreground">{product?.brand}</p>

            {/* Name */}
            <h3 className="font-heading text-2xl font-semibold text-foreground">
              {product?.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={16}
                    className={i < Math.floor(product?.rating) ? 'text-accent fill-current' : 'text-muted-foreground/30'}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product?.rating} ({product?.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-semibold text-foreground">
                ₹{product?.price?.toLocaleString('en-IN')}
              </span>
              {product?.originalPrice && product?.originalPrice > product?.price && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{product?.originalPrice?.toLocaleString('en-IN')}
                  </span>
                  <span className="bg-success text-success-foreground px-2 py-1 rounded text-sm font-medium">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <Icon 
                name={product?.inStock ? "CheckCircle" : "XCircle"} 
                size={16} 
                className={product?.inStock ? 'text-success' : 'text-error'} 
              />
              <span className={`text-sm font-medium ${
                product?.inStock ? 'text-success' : 'text-error'
              }`}>
                {product?.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
              {product?.inStock && product?.stockCount && product?.stockCount < 10 && (
                <span className="text-sm text-warning">
                  (Only {product?.stockCount} left!)
                </span>
              )}
            </div>

            {/* Skin Types */}
            {product?.skinTypes && product?.skinTypes?.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Suitable for:</h4>
                <div className="flex flex-wrap gap-2">
                  {product?.skinTypes?.map((type, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
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
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Description:</h4>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {product?.description}
              </p>
            </div>

            {/* Benefits */}
            {product?.benefits && product?.benefits?.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Key Benefits:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {product?.benefits?.slice(0, 3)?.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={12} className="text-success" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity Selector */}
            {product?.inStock && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Quantity:</h4>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-muted transition-smooth"
                    >
                      <Icon name="Minus" size={16} />
                    </button>
                    <span className="px-4 py-2 font-medium text-foreground min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-muted transition-smooth"
                    >
                      <Icon name="Plus" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex space-x-3">
                <Button
                  variant="default"
                  onClick={handleAddToCart}
                  disabled={!product?.inStock}
                  className="flex-1"
                  iconName="ShoppingCart"
                  iconPosition="left"
                >
                  Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => onToggleWishlist(product)}
                  iconName="Heart"
                  className={isInWishlist ? 'text-error border-error hover:bg-error/10' : ''}
                >
                  {isInWishlist ? <Icon name="Heart" size={16} className="fill-current" /> : <Icon name="Heart" size={16} />}
                </Button>
              </div>

              <Button
                variant="ghost"
                fullWidth
                onClick={() => {
                  onViewFullDetails();
                  onClose();
                }}
                iconName="ExternalLink"
                iconPosition="right"
              >
                View Full Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;