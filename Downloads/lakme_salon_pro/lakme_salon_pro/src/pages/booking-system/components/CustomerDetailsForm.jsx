import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const CustomerDetailsForm = ({ customerDetails, onDetailsChange, isGuestCheckout, onGuestToggle }) => {
  const [formData, setFormData] = useState({
    firstName: customerDetails?.firstName || '',
    lastName: customerDetails?.lastName || '',
    email: customerDetails?.email || '',
    phone: customerDetails?.phone || '',
    specialRequests: customerDetails?.specialRequests || '',
    isNewCustomer: customerDetails?.isNewCustomer || false,
    marketingConsent: customerDetails?.marketingConsent || false,
    whatsappUpdates: customerDetails?.whatsappUpdates || true,
    emailUpdates: customerDetails?.emailUpdates || true
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onDetailsChange(updatedData);

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  return (
    <div className="space-y-6">
      {/* Guest Checkout Toggle */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-lg font-semibold text-foreground">
            Booking Details
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Guest Checkout</span>
            <button
              onClick={onGuestToggle}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-smooth
                ${isGuestCheckout ? 'bg-primary' : 'bg-muted'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-background transition-smooth
                  ${isGuestCheckout ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>
        </div>

        {!isGuestCheckout && (
          <div className="bg-secondary/20 border border-secondary rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <Icon name="Gift" size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground mb-1">
                  Create Account & Save
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Get exclusive offers, track your bookings, and earn loyalty points with every visit.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Faster future bookings</li>
                  <li>• Exclusive member discounts</li>
                  <li>• Loyalty points & rewards</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Customer Information Form */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-heading font-semibold text-foreground mb-4">
          Contact Information
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Input
            label="First Name"
            type="text"
            placeholder="Enter first name"
            value={formData?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            error={errors?.firstName}
            required
          />

          <Input
            label="Last Name"
            type="text"
            placeholder="Enter last name"
            value={formData?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            error={errors?.lastName}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter email address"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="+91 98765 43210"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            error={errors?.phone}
            required
          />
        </div>

        <Input
          label="Special Requests (Optional)"
          type="text"
          placeholder="Any specific requirements or preferences..."
          value={formData?.specialRequests}
          onChange={(e) => handleInputChange('specialRequests', e?.target?.value)}
          description="Let us know if you have any allergies, preferences, or special requirements"
        />
      </div>
      {/* Preferences */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-heading font-semibold text-foreground mb-4">
          Preferences & Notifications
        </h4>

        <div className="space-y-3">
          <Checkbox
            label="I'm a new customer to Lakme Salon"
            checked={formData?.isNewCustomer}
            onChange={(e) => handleInputChange('isNewCustomer', e?.target?.checked)}
            description="Help us provide you with the best first-time experience"
          />

          <Checkbox
            label="Send booking updates via WhatsApp"
            checked={formData?.whatsappUpdates}
            onChange={(e) => handleInputChange('whatsappUpdates', e?.target?.checked)}
            description="Get instant notifications about your appointment"
          />

          <Checkbox
            label="Send booking confirmation via Email"
            checked={formData?.emailUpdates}
            onChange={(e) => handleInputChange('emailUpdates', e?.target?.checked)}
            description="Receive detailed booking information and reminders"
          />

          <Checkbox
            label="I agree to receive marketing communications"
            checked={formData?.marketingConsent}
            onChange={(e) => handleInputChange('marketingConsent', e?.target?.checked)}
            description="Get exclusive offers, beauty tips, and new service updates"
          />
        </div>
      </div>
      {/* Auto-fill for returning customers */}
      {!isGuestCheckout && (
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Icon name="Zap" size={20} className="text-accent" />
            <h4 className="font-medium text-foreground">
              Returning Customer?
            </h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Sign in to auto-fill your details and access your booking history.
          </p>
          <Button variant="outline" size="sm" iconName="LogIn" iconPosition="left">
            Sign In to Auto-fill
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerDetailsForm;