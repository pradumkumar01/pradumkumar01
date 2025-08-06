import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const BookingSummary = ({ 
  service, 
  salon, 
  selectedDate, 
  selectedTime, 
  customerDetails,
  onConfirmBooking,
  isProcessing 
}) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(null);
  const [addToCalendar, setAddToCalendar] = useState(true);
  const [sendWhatsApp, setSendWhatsApp] = useState(true);
  const [sendEmail, setSendEmail] = useState(true);

  // Mock pricing calculations
  const servicePrice = service?.price || 2499;
  const taxRate = 0.18; // 18% GST
  const promoDiscount = promoApplied ? 200 : 0;
  const subtotal = servicePrice;
  const discount = promoDiscount;
  const taxAmount = Math.round((subtotal - discount) * taxRate);
  const total = subtotal - discount + taxAmount;

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'CreditCard' },
    { id: 'upi', name: 'UPI Payment', icon: 'Smartphone' },
    { id: 'wallet', name: 'Digital Wallet', icon: 'Wallet' },
    { id: 'netbanking', name: 'Net Banking', icon: 'Building' }
  ];

  const handlePromoApply = () => {
    // Mock promo code validation
    const validPromoCodes = {
      'FIRST20': { discount: 200, description: 'First-time customer discount' },
      'SAVE10': { discount: 150, description: '10% off on services' }
    };

    if (validPromoCodes?.[promoCode?.toUpperCase()]) {
      setPromoApplied(validPromoCodes?.[promoCode?.toUpperCase()]);
    } else {
      setPromoApplied({ error: 'Invalid promo code' });
    }
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time?.split(':');
    const date = new Date(2024, 0, 1, parseInt(hours), parseInt(minutes));
    return date?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="space-y-6">
      {/* Booking Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
          Booking Summary
        </h3>

        <div className="space-y-4">
          {/* Service Details */}
          <div className="flex items-start gap-4 pb-4 border-b border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Scissors" size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground">{service?.name}</h4>
              <p className="text-sm text-muted-foreground">{service?.category}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <Icon name="Clock" size={14} />
                <span>{service?.duration}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-semibold text-foreground">
                ₹{servicePrice?.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Salon Details */}
          <div className="flex items-start gap-4 pb-4 border-b border-border">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="MapPin" size={20} className="text-accent" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground">{salon?.name}</h4>
              <p className="text-sm text-muted-foreground">{salon?.address}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <Icon name="Phone" size={14} />
                <span>{salon?.phone}</span>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-start gap-4 pb-4 border-b border-border">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={20} className="text-success" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground">
                {formatDate(selectedDate)}
              </h4>
              <p className="text-sm text-muted-foreground">
                {formatTime(selectedTime)}
              </p>
            </div>
          </div>

          {/* Customer Details */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
              <Icon name="User" size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground">
                {customerDetails?.firstName} {customerDetails?.lastName}
              </h4>
              <p className="text-sm text-muted-foreground">{customerDetails?.email}</p>
              <p className="text-sm text-muted-foreground">{customerDetails?.phone}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Promo Code */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">Promo Code</h4>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e?.target?.value)}
            className="flex-1 px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handlePromoApply}
            disabled={!promoCode?.trim()}
          >
            Apply
          </Button>
        </div>
        {promoApplied && (
          <div className={`mt-2 text-sm ${promoApplied?.error ? 'text-error' : 'text-success'}`}>
            {promoApplied?.error || `✓ ${promoApplied?.description} applied`}
          </div>
        )}
      </div>
      {/* Payment Method */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Payment Method</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {paymentMethods?.map((method) => (
            <button
              key={method?.id}
              onClick={() => setPaymentMethod(method?.id)}
              className={`
                flex items-center gap-3 p-3 rounded-lg border transition-smooth
                ${paymentMethod === method?.id
                  ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-foreground'
                }
              `}
            >
              <Icon name={method?.icon} size={20} />
              <span className="text-sm font-medium">{method?.name}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Price Breakdown */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Price Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service charge</span>
            <span className="text-foreground">₹{subtotal?.toLocaleString('en-IN')}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-success">
              <span>Discount</span>
              <span>-₹{discount?.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">GST (18%)</span>
            <span className="text-foreground">₹{taxAmount?.toLocaleString('en-IN')}</span>
          </div>
          <div className="border-t border-border pt-2 flex justify-between font-semibold">
            <span className="text-foreground">Total Amount</span>
            <span className="text-foreground">₹{total?.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
      {/* Confirmation Options */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Confirmation Preferences</h4>
        <div className="space-y-3">
          <Checkbox
            label="Add to calendar"
            checked={addToCalendar}
            onChange={(e) => setAddToCalendar(e?.target?.checked)}
            description="Automatically add this appointment to your calendar"
          />
          <Checkbox
            label="Send WhatsApp confirmation"
            checked={sendWhatsApp}
            onChange={(e) => setSendWhatsApp(e?.target?.checked)}
            description="Get instant booking confirmation on WhatsApp"
          />
          <Checkbox
            label="Send email confirmation"
            checked={sendEmail}
            onChange={(e) => setSendEmail(e?.target?.checked)}
            description="Receive detailed booking information via email"
          />
        </div>
      </div>
      {/* Confirm Booking Button */}
      <Button
        variant="default"
        size="lg"
        fullWidth
        loading={isProcessing}
        onClick={() => onConfirmBooking({
          paymentMethod,
          promoCode: promoApplied && !promoApplied?.error ? promoCode : null,
          total,
          preferences: { addToCalendar, sendWhatsApp, sendEmail }
        })}
        iconName="Calendar"
        iconPosition="left"
      >
        {isProcessing ? 'Processing...' : `Confirm Booking - ₹${total?.toLocaleString('en-IN')}`}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        By confirming this booking, you agree to our Terms of Service and Privacy Policy.
        You can cancel or reschedule up to 2 hours before your appointment.
      </p>
    </div>
  );
};

export default BookingSummary;