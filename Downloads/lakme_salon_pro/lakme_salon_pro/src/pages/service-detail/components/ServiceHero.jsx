import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ServiceHero = ({ service, onBookNow }) => {
  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-lg mb-8">
      <Image
        src={service?.heroImage}
        alt={service?.name}
        className="w-full h-full object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            {service?.name}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Icon name="Clock" size={16} />
              <span className="text-sm font-medium">{service?.duration}</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Icon name="IndianRupee" size={16} />
              <span className="text-sm font-medium">₹{service?.price}</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Icon name="Star" size={16} className="fill-current" />
              <span className="text-sm font-medium">{service?.rating}/5</span>
            </div>
          </div>
          
          <p className="text-lg mb-6 max-w-2xl opacity-90">
            {service?.shortDescription}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="default"
              size="lg"
              onClick={onBookNow}
              iconName="Calendar"
              iconPosition="left"
              className="bg-primary hover:bg-primary/90"
            >
              Book Now
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              iconName="Share2"
              iconPosition="left"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Share Service
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceHero;