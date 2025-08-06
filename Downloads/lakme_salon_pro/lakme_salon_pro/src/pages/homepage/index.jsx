import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import ServiceShowcase from './components/ServiceShowcase';
import PromotionalCarousel from './components/PromotionalCarousel';
import TrendCollections from './components/TrendCollections';
import CustomerTestimonials from './components/CustomerTestimonials';
import ServiceCategories from './components/ServiceCategories';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Service Showcase */}
        <ServiceShowcase />

        {/* Promotional Carousel */}
        <PromotionalCarousel />

        {/* Trend Collections */}
        <TrendCollections />

        {/* Customer Testimonials */}
        <CustomerTestimonials />

        {/* Service Categories */}
        <ServiceCategories />

        {/* Newsletter Section */}
        <NewsletterSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;