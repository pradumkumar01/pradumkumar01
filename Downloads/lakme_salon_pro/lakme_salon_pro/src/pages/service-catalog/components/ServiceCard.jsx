import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceCard = ({ service, onViewDetails, onBookNow }) => {
  return (
    <div className="group bg-card rounded-xl shadow-card hover:shadow-modal transition-all duration-300 overflow-hidden border border-border">
      {/* Service Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={service?.image}
          alt={service?.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {service?.popular && (
          <div className="absolute top-3 left-3 bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
            Popular
          </div>
        )}
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-lg">
          <Icon name="Star" size={14} className="text-accent fill-current" />
          <span className="text-sm font-medium text-foreground">{service?.rating}</span>
        </div>
      </div>

      {/* Service Info */}
      <div className="p-4">
        {/* Header */}
        <div className="mb-3">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
            {service?.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {service?.description}
          </p>
        </div>

        {/* Service Details */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{service?.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span>{service?.location}</span>
            </div>
          </div>
        </div>

        {/* Price and Rating */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-lg font-semibold text-foreground">
              ₹{service?.startingPrice?.toLocaleString('en-IN')}
            </span>
            <span className="text-sm text-muted-foreground ml-1">onwards</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">
              {service?.reviewCount} reviews
            </div>
          </div>
        </div>

        {/* Benefits */}
        {service?.benefits && service?.benefits?.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {service?.benefits?.slice(0, 2)?.map((benefit, index) => (
                <span
                  key={index}
                  className="bg-muted text-muted-foreground px-2 py-1 rounded-lg text-xs"
                >
                  {benefit}
                </span>
              ))}
              {service?.benefits?.length > 2 && (
                <span className="text-xs text-muted-foreground px-2 py-1">
                  +{service?.benefits?.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(service)}
            className="flex-1"
          >
            View Details
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onBookNow(service)}
            className="flex-1"
            iconName="Calendar"
            iconPosition="left"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;