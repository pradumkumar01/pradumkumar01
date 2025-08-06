import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 to-accent/10">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Professional beauty transformation at Lakme Salon"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Main Tagline */}
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Watch How We Transform
            <span className="block text-accent"> Looks Every Day</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90 font-light max-w-2xl mx-auto">
            Experience professional beauty services with 40+ years of expertise across 400+ salons
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="default"
              size="lg"
              className="w-full sm:w-auto px-8 py-4 text-lg font-semibold"
              onClick={() => navigate('/booking-system')}
            >
              Book Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-8 py-4 text-lg font-semibold bg-white/10 border-white/30 text-white hover:bg-white hover:text-foreground"
              onClick={() => navigate('/product-detail')}
            >
              Shop Products
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-accent">40+</span>
              <span className="text-sm">Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-accent">400+</span>
              <span className="text-sm">Salons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-accent">125</span>
              <span className="text-sm">Cities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;