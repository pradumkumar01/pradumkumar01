import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceShowcase = () => {
  const navigate = useNavigate();

  const featuredServices = [
    {
      id: 1,
      name: "K-SSense Face Rituals",
      description: "Advanced facial treatments using cutting-edge technology for radiant, youthful skin",
      image: "https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: "₹2,500",
      duration: "60 mins",
      category: "Skin"
    },
    {
      id: 2,
      name: "K-SSense Head Rituals",
      description: "Luxurious scalp and hair treatments for healthy, lustrous hair growth",
      image: "https://images.pexels.com/photos/3993456/pexels-photo-3993456.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: "₹1,800",
      duration: "45 mins",
      category: "Hair"
    },
    {
      id: 3,
      name: "Hydra Radiance Facial",
      description: "Deep hydrating facial treatment for instant glow and moisture restoration",
      image: "https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: "₹2,200",
      duration: "75 mins",
      category: "Skin"
    },
    {
      id: 4,
      name: "Glass Shine Wax",
      description: "Premium waxing service for silky smooth, hair-free skin with lasting results",
      image: "https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: "₹1,200",
      duration: "30 mins",
      category: "Skin"
    },
    {
      id: 5,
      name: "Glass Shine Hair",
      description: "Revolutionary hair treatment for mirror-like shine and smoothness",
      image: "https://images.pexels.com/photos/3993440/pexels-photo-3993440.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: "₹3,500",
      duration: "90 mins",
      category: "Hair"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Signature Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular treatments designed to enhance your natural beauty
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredServices?.map((service) => (
            <div
              key={service?.id}
              className="group bg-card rounded-lg shadow-card hover:shadow-modal transition-all duration-300 overflow-hidden border border-border"
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service?.image}
                  alt={service?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {service?.category}
                  </span>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  {service?.name}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {service?.description}
                </p>

                {/* Service Details */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Icon name="Clock" size={16} />
                      <span>{service?.duration}</span>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-primary">
                    {service?.price}
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  variant="outline"
                  fullWidth
                  className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  onClick={() => navigate('/service-detail')}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services CTA */}
        <div className="text-center">
          <Button
            variant="default"
            size="lg"
            onClick={() => navigate('/service-detail')}
            iconName="ArrowRight"
            iconPosition="right"
          >
            Explore All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceShowcase;