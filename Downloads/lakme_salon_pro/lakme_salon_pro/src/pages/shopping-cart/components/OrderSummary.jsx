import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderSummary = ({ 
  subtotal, 
  tax, 
  discount, 
  total, 
  onApplyPromoCode, 
  onProceedToCheckout,
  isLoading = false 
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const handleApplyPromo = () => {
    if (!promoCode?.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }

    // Mock promo code validation
    const validCodes = ['SAVE20', 'WELCOME10', 'BEAUTY15'];
    if (validCodes?.includes(promoCode?.toUpperCase())) {
      setPromoSuccess('Promo code applied successfully!');
      setPromoError('');
      onApplyPromoCode(promoCode);
    } else {
      setPromoError('Invalid promo code');
      setPromoSuccess('');
    }
  };

  const deliveryDate = new Date();
  deliveryDate?.setDate(deliveryDate?.getDate() + 3);

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card sticky top-24">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Order Summary
      </h2>
      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">₹{subtotal?.toLocaleString('en-IN')}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Discount</span>
            <span className="text-success">-₹{discount?.toLocaleString('en-IN')}</span>
          </div>
        )}
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax (GST)</span>
          <span className="text-foreground">₹{tax?.toLocaleString('en-IN')}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Delivery</span>
          <span className="text-success">FREE</span>
        </div>
        
        <div className="border-t border-border pt-3">
          <div className="flex justify-between font-semibold">
            <span className="text-foreground">Total</span>
            <span className="text-primary text-lg">₹{total?.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
      {/* Promo Code Section */}
      <div className="mb-6">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e?.target?.value);
              setPromoError('');
              setPromoSuccess('');
            }}
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={handleApplyPromo}
            disabled={!promoCode?.trim()}
          >
            Apply
          </Button>
        </div>
        
        {promoError && (
          <p className="text-error text-sm mt-2 flex items-center gap-1">
            <Icon name="AlertCircle" size={14} />
            {promoError}
          </p>
        )}
        
        {promoSuccess && (
          <p className="text-success text-sm mt-2 flex items-center gap-1">
            <Icon name="CheckCircle" size={14} />
            {promoSuccess}
          </p>
        )}
      </div>
      {/* Delivery Information */}
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="Truck" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">
            Estimated Delivery
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {deliveryDate?.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Free delivery on orders above ₹999
        </p>
      </div>
      {/* Checkout Button */}
      <Button
        variant="default"
        fullWidth
        size="lg"
        onClick={onProceedToCheckout}
        loading={isLoading}
        iconName="ArrowRight"
        iconPosition="right"
      >
        Proceed to Checkout
      </Button>
      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
        <Icon name="Shield" size={14} />
        <span>Secure checkout with 256-bit SSL encryption</span>
      </div>
      {/* Available Offers */}
      <div className="mt-6 p-4 bg-accent/10 rounded-lg">
        <h3 className="text-sm font-medium text-foreground mb-2">
          Available Offers
        </h3>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Icon name="Tag" size={14} className="text-accent mt-0.5" />
            <div>
              <p className="text-xs text-foreground font-medium">SAVE20</p>
              <p className="text-xs text-muted-foreground">Get 20% off on orders above ₹2000</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Icon name="Gift" size={14} className="text-accent mt-0.5" />
            <div>
              <p className="text-xs text-foreground font-medium">WELCOME10</p>
              <p className="text-xs text-muted-foreground">First-time users get 10% off</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;