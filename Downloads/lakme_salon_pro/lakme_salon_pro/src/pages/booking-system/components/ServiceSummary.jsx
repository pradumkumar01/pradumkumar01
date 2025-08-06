import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ServiceSummary = ({ selectedService, onModify }) => {
  const mockService = selectedService || {
    id: 1,
    name: "K-SSense Face Ritual",
    category: "Facial Treatment",
    duration: "90 minutes",
    price: 2499,
    originalPrice: 3199,
    discount: 22,
    image: "https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Advanced facial treatment with deep cleansing, exfoliation, and hydration for radiant skin.",
    benefits: ["Deep Cleansing", "Anti-Aging", "Hydration Boost", "Skin Brightening"]
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-lg font-semibold text-foreground">
          Selected Service
        </h3>
        <Button
          variant="outline"
          size="sm"
          iconName="Edit"
          iconPosition="left"
          onClick={onModify}
        >
          Modify
        </Button>
      </div>
      <div className="flex gap-4">
        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={mockService?.image}
            alt={mockService?.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h4 className="font-heading font-semibold text-foreground mb-1">
            {mockService?.name}
          </h4>
          <p className="text-sm text-muted-foreground mb-2">
            {mockService?.category}
          </p>

          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span>{mockService?.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-foreground">
                ₹{mockService?.price?.toLocaleString('en-IN')}
              </span>
              {mockService?.originalPrice && (
                <>
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{mockService?.originalPrice?.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs bg-success text-success-foreground px-2 py-1 rounded-full">
                    {mockService?.discount}% OFF
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {mockService?.benefits?.slice(0, 3)?.map((benefit, index) => (
              <span
                key={index}
                className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
              >
                {benefit}
              </span>
            ))}
            {mockService?.benefits?.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{mockService?.benefits?.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSummary;