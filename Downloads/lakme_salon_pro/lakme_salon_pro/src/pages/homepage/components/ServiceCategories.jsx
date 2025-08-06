import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const ServiceCategories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Hair",
      description: "Cuts, colors, treatments & styling",
      icon: "Scissors",
      color: "bg-primary",
      services: ["Hair Cut & Styling", "Hair Coloring", "Hair Treatments", "Keratin & Smoothening"]
    },
    {
      id: 2,
      name: "Skin",
      description: "Facials, treatments & skincare",
      icon: "Sparkles",
      color: "bg-accent",
      services: ["Facial Treatments", "Anti-Aging", "Acne Treatment", "Skin Brightening"]
    },
    {
      id: 3,
      name: "Makeup",
      description: "Professional makeup services",
      icon: "Palette",
      color: "bg-success",
      services: ["Bridal Makeup", "Party Makeup", "Corporate Look", "Special Occasions"]
    },
    {
      id: 4,
      name: "Nails",
      description: "Manicure, pedicure & nail art",
      icon: "Hand",
      color: "bg-warning",
      services: ["Manicure", "Pedicure", "Nail Art", "Gel Extensions"]
    },
    {
      id: 5,
      name: "Cosmetology",
      description: "Advanced beauty treatments",
      icon: "Zap",
      color: "bg-error",
      services: ["Laser Treatments", "Body Contouring", "Hair Removal", "Skin Rejuvenation"]
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Service Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive range of beauty services designed to enhance your natural beauty
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {categories?.map((category) => (
            <div
              key={category?.id}
              className="group bg-card rounded-xl shadow-card hover:shadow-modal transition-all duration-300 overflow-hidden border border-border cursor-pointer"
              onClick={() => navigate('/service-detail')}
            >
              {/* Category Header */}
              <div className="p-6 text-center">
                {/* Icon */}
                <div className={`w-16 h-16 ${category?.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon 
                    name={category?.icon} 
                    size={28} 
                    color="white"
                  />
                </div>

                {/* Category Name */}
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  {category?.name}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4">
                  {category?.description}
                </p>

                {/* Services List */}
                <div className="space-y-2">
                  {category?.services?.map((service, index) => (
                    <div
                      key={index}
                      className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full"
                    >
                      {service}
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover Effect */}
              <div className="h-1 bg-gradient-to-r from-primary via-accent to-success transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-muted rounded-2xl p-8 md:p-12">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            Not sure which service is right for you?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our beauty experts are here to help you choose the perfect treatments based on your skin type, hair texture, and personal preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/booking-system')}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="Calendar" size={20} />
              Book Free Consultation
            </button>
            <button
              onClick={() => navigate('/service-detail')}
              className="bg-background border border-border text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="Search" size={20} />
              Browse All Services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;