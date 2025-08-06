import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PromotionalCarousel = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const promotions = [
    {
      id: 1,
      title: "20% Off on All Services",
      subtitle: "Limited Time Offer",
      description: "Book your favorite beauty treatments and save big with our exclusive discount",
      image: "https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
      cta: "Book Now",
      ctaAction: () => navigate('/booking-system'),
      bgGradient: "from-primary/90 to-accent/80"
    },
    {
      id: 2,
      title: "Cashback with Paytm",
      subtitle: "Up to ₹500 Cashback",
      description: "Pay with Paytm and get instant cashback on all salon services and products",
      image: "https://images.pexels.com/photos/3985327/pexels-photo-3985327.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
      cta: "Shop Now",
      ctaAction: () => navigate('/product-detail'),
      bgGradient: "from-success/90 to-primary/80"
    },
    {
      id: 3,
      title: "Mobikwik Wallet Offers",
      subtitle: "Extra 15% Off",
      description: "Use Mobikwik wallet for payments and enjoy additional savings on every purchase",
      image: "https://images.pexels.com/photos/3985322/pexels-photo-3985322.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
      cta: "Explore Deals",
      ctaAction: () => navigate('/product-detail'),
      bgGradient: "from-accent/90 to-warning/80"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions?.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [promotions?.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promotions?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promotions?.length) % promotions?.length);
  };

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Exclusive Offers
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't miss out on our limited-time promotions and cashback deals
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          <div className="relative h-80 md:h-96 lg:h-[28rem] overflow-hidden rounded-2xl shadow-modal">
            {promotions?.map((promo, index) => (
              <div
                key={promo?.id}
                className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                  index === currentSlide ? 'translate-x-0' : 
                  index < currentSlide ? '-translate-x-full' : 'translate-x-full'
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={promo?.image}
                    alt={promo?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${promo?.bgGradient}`}></div>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex items-center">
                  <div className="container mx-auto px-8">
                    <div className="max-w-2xl text-white">
                      <div className="mb-4">
                        <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                          {promo?.subtitle}
                        </span>
                      </div>
                      <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        {promo?.title}
                      </h3>
                      <p className="text-lg md:text-xl mb-8 text-white/90">
                        {promo?.description}
                      </p>
                      <Button
                        variant="default"
                        size="lg"
                        className="bg-white text-foreground hover:bg-white/90"
                        onClick={promo?.ctaAction}
                      >
                        {promo?.cta}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="Previous slide"
          >
            <Icon name="ChevronLeft" size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="Next slide"
          >
            <Icon name="ChevronRight" size={24} />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
            {promotions?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalCarousel;