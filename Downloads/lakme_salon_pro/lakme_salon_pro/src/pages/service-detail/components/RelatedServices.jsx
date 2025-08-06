import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { useNavigate } from 'react-router-dom';

const RelatedServices = ({ currentServiceId }) => {
  const navigate = useNavigate();

  const relatedServices = [
    {
      id: 2,
      name: "K-SSense Head Rituals",
      price: 2500,
      duration: "90 mins",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
      shortDescription: "Luxurious scalp treatment with aromatherapy"
    },
    {
      id: 3,
      name: "Hydra Radiance Facial",
      price: 3200,
      duration: "75 mins",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=300&fit=crop",
      shortDescription: "Deep hydrating facial for glowing skin"
    },
    {
      id: 4,
      name: "Glass Shine Wax",
      price: 1800,
      duration: "45 mins",
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop",
      shortDescription: "Premium waxing service for smooth skin"
    },
    {
      id: 5,
      name: "Glass Shine Hair",
      price: 4500,
      duration: "120 mins",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
      shortDescription: "Hair treatment for ultimate shine and smoothness"
    }
  ]?.filter(service => service?.id !== currentServiceId);

  const handleServiceClick = (serviceId) => {
    // In a real app, this would navigate to the specific service detail page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-card rounded-lg shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-heading font-semibold">Related Services</h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="ArrowRight"
          iconPosition="right"
          onClick={() => navigate('/service-detail')}
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        {relatedServices?.slice(0, 4)?.map((service) => (
          <div
            key={service?.id}
            className="border border-border rounded-lg p-4 hover:shadow-md transition-smooth cursor-pointer"
            onClick={() => handleServiceClick(service?.id)}
          >
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <Image
                  src={service?.image}
                  alt={service?.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm mb-1 truncate">
                  {service?.name}
                </h4>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {service?.shortDescription}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-primary">
                      ₹{service?.price}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {service?.duration}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-warning fill-current" />
                    <span className="text-xs text-muted-foreground">
                      {service?.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedServices;