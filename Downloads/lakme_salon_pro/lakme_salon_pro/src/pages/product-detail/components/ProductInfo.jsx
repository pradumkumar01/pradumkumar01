import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductInfo = ({ product, onAddToCart, onAddToWishlist }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const increaseQuantity = () => {
    if (quantity < product?.maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      quantity,
      selectedVariant,
      totalPrice: (selectedVariant?.price || product?.price) * quantity
    });
  };

  const handleAddToWishlist = () => {
    onAddToWishlist(product);
  };

  const currentPrice = selectedVariant?.price || product?.price;
  const originalPrice = selectedVariant?.originalPrice || product?.originalPrice;
  const discount = originalPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Product Title and Rating */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-2">
          {product?.name}
        </h1>
        <div className="flex items-center space-x-4 mb-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={16}
                className={i < Math.floor(product?.rating) ? 'text-accent fill-current' : 'text-muted-foreground'}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">
              {product?.rating} ({product?.reviewCount} reviews)
            </span>
          </div>
        </div>
        
        {/* Brand */}
        <p className="text-sm text-muted-foreground">
          by <span className="font-medium text-primary">{product?.brand}</span>
        </p>
      </div>
      {/* Price Section */}
      <div className="flex items-center space-x-3">
        <span className="text-2xl font-semibold text-foreground">
          ₹{currentPrice?.toLocaleString('en-IN')}
        </span>
        {originalPrice && originalPrice > currentPrice && (
          <>
            <span className="text-lg text-muted-foreground line-through">
              ₹{originalPrice?.toLocaleString('en-IN')}
            </span>
            <span className="bg-success text-success-foreground px-2 py-1 rounded text-sm font-medium">
              {discount}% OFF
            </span>
          </>
        )}
      </div>
      {/* Skin Type Recommendations */}
      {product?.skinTypes && (
        <div>
          <h3 className="text-sm font-medium text-foreground mb-2">Suitable for:</h3>
          <div className="flex flex-wrap gap-2">
            {product?.skinTypes?.map((type) => (
              <span
                key={type}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  type === 'Oily' ? 'bg-blue-100 text-blue-800' :
                  type === 'Dry' ? 'bg-orange-100 text-orange-800' :
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
      {/* Variants Selection */}
      {product?.variants && product?.variants?.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-foreground mb-2">
            {product?.variantType || 'Options'}:
          </h3>
          <div className="flex flex-wrap gap-2">
            {product?.variants?.map((variant) => (
              <button
                key={variant?.id}
                onClick={() => setSelectedVariant(variant)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-smooth ${
                  selectedVariant?.id === variant?.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary'
                }`}
              >
                {variant?.name}
                {variant?.price !== product?.price && (
                  <span className="ml-1">₹{variant?.price}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
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
            Only {product?.stockCount} left!
          </span>
        )}
      </div>
      {/* Quantity Selector */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-2">Quantity:</h3>
        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              className="p-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
            >
              <Icon name="Minus" size={16} />
            </button>
            <span className="px-4 py-2 font-medium text-foreground min-w-[3rem] text-center">
              {quantity}
            </span>
            <button
              onClick={increaseQuantity}
              disabled={quantity >= product?.maxQuantity}
              className="p-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
            >
              <Icon name="Plus" size={16} />
            </button>
          </div>
          <span className="text-sm text-muted-foreground">
            Max {product?.maxQuantity} per order
          </span>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          fullWidth
          onClick={handleAddToCart}
          disabled={!product?.inStock}
          iconName="ShoppingCart"
          iconPosition="left"
        >
          Add to Cart - ₹{(currentPrice * quantity)?.toLocaleString('en-IN')}
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          onClick={handleAddToWishlist}
          iconName="Heart"
          iconPosition="left"
        >
          Add to Wishlist
        </Button>
      </div>
      {/* Product Description */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
          Product Description
        </h3>
        <div className="text-muted-foreground">
          <p className={`${!showFullDescription ? 'line-clamp-3' : ''}`}>
            {product?.description}
          </p>
          {product?.description?.length > 200 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-primary hover:text-primary/80 text-sm font-medium mt-2 transition-smooth"
            >
              {showFullDescription ? 'Read Less' : 'Read More'}
            </button>
          )}
        </div>
      </div>
      {/* Social Sharing */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-2">Share:</h3>
        <div className="flex space-x-2">
          <button className="p-2 bg-muted rounded-lg hover:bg-muted/80 transition-smooth">
            <Icon name="Facebook" size={16} className="text-muted-foreground" />
          </button>
          <button className="p-2 bg-muted rounded-lg hover:bg-muted/80 transition-smooth">
            <Icon name="Twitter" size={16} className="text-muted-foreground" />
          </button>
          <button className="p-2 bg-muted rounded-lg hover:bg-muted/80 transition-smooth">
            <Icon name="Share2" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;