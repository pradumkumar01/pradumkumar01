import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TrendCollections = () => {
  const navigate = useNavigate();

  const trendCollection = {
    title: "Timeless Brides Reinvented",
    subtitle: "Bridal Beauty Collection 2025",
    description: "Discover our exclusive bridal makeup and styling services that blend traditional elegance with contemporary trends. From pre-wedding glow treatments to the perfect wedding day look.",
    image: "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    features: [
      "Pre-bridal skincare treatments",
      "Traditional & contemporary makeup",
      "Hair styling & accessories",
      "Complete bridal packages"
    ]
  };

  const additionalCollections = [
    {
      id: 1,
      title: "Party Perfect",
      description: "Glamorous looks for special occasions",
      image: "https://images.pexels.com/photos/3985327/pexels-photo-3985327.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Corporate Chic",
      description: "Professional styling for the modern woman",
      image: "https://images.pexels.com/photos/3985322/pexels-photo-3985322.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trend Collections
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated beauty collections designed for every special moment
          </p>
        </div>

        {/* Main Featured Collection */}
        <div className="mb-16">
          <div className="relative h-96 md:h-[32rem] lg:h-[40rem] rounded-2xl overflow-hidden shadow-modal">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={trendCollection?.image}
                alt={trendCollection?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-8">
                <div className="max-w-2xl text-white">
                  <div className="mb-4">
                    <span className="inline-block bg-accent/90 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium">
                      {trendCollection?.subtitle}
                    </span>
                  </div>
                  
                  <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                    {trendCollection?.title}
                  </h3>
                  
                  <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
                    {trendCollection?.description}
                  </p>

                  {/* Features List */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {trendCollection?.features?.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="text-white/90">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="default"
                      size="lg"
                      className="bg-accent text-accent-foreground hover:bg-accent/90"
                      onClick={() => navigate('/service-detail')}
                    >
                      Explore Bridal Services
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-foreground"
                      onClick={() => navigate('/booking-system')}
                    >
                      Book Consultation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {additionalCollections?.map((collection) => (
            <div
              key={collection?.id}
              className="group relative h-64 md:h-80 rounded-xl overflow-hidden shadow-card hover:shadow-modal transition-all duration-300 cursor-pointer"
              onClick={() => navigate('/service-detail')}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={collection?.image}
                  alt={collection?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-end p-6">
                <div className="text-white">
                  <h4 className="font-heading text-2xl font-bold mb-2">
                    {collection?.title}
                  </h4>
                  <p className="text-white/90">
                    {collection?.description}
                  </p>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button
                  variant="default"
                  className="bg-white text-foreground hover:bg-white/90"
                >
                  Explore Collection
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendCollections;