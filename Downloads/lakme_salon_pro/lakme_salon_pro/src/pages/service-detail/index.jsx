import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';


// Import components
import ServiceHero from './components/ServiceHero';
import ServiceTabs from './components/ServiceTabs';
import BookingWidget from './components/BookingWidget';
import RelatedServices from './components/RelatedServices';
import ServiceFAQ from './components/ServiceFAQ';
import BeforeAfterGallery from './components/BeforeAfterGallery';
import SalonAvailability from './components/SalonAvailability';

const ServiceDetail = () => {
  const navigate = useNavigate();
  const [showStickyBooking, setShowStickyBooking] = useState(false);

  // Mock service data
  const service = {
    id: 1,
    name: "K-SSense Face Rituals",
    price: 3500,
    duration: "60 mins",
    rating: 4.5,
    reviewCount: 127,
    heroImage: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&h=600&fit=crop",
    shortDescription: "Luxurious facial treatment combining advanced skincare technology with traditional wellness practices for radiant, healthy skin.",
    fullDescription: `Experience the ultimate in facial rejuvenation with our signature K-SSense Face Rituals. This comprehensive treatment combines cutting-edge skincare technology with time-honored wellness practices to deliver exceptional results.\n\nOur expert aestheticians use premium products and advanced techniques to cleanse, exfoliate, nourish, and protect your skin. Each treatment is customized to your specific skin type and concerns, ensuring optimal results and a truly personalized experience.\n\nThe ritual includes deep cleansing, gentle exfoliation, targeted serums, relaxing massage, and a nourishing mask, leaving your skin visibly brighter, smoother, and more radiant.`,
    benefits: [
      "Deep cleansing and pore refinement",
      "Improved skin texture and tone",
      "Enhanced hydration and moisture retention",
      "Reduced appearance of fine lines",
      "Increased skin radiance and glow",
      "Stress relief and relaxation",
      "Customized treatment for your skin type",
      "Professional-grade products and techniques"
    ],
    recommendedFor: [
      "All Skin Types",
      "Dry Skin",
      "Oily Skin",
      "Combination Skin",
      "Sensitive Skin",
      "Mature Skin"
    ],
    frequency: "Recommended every 4-6 weeks for optimal skin health and maintenance. Monthly treatments help maintain results and address ongoing skin concerns.",
    processSteps: [
      {
        title: "Consultation & Skin Analysis",
        description: "Our expert aesthetician analyzes your skin type and discusses your specific concerns and goals.",
        duration: "10 mins"
      },
      {
        title: "Deep Cleansing",
        description: "Thorough cleansing to remove makeup, impurities, and prepare skin for treatment.",
        duration: "10 mins"
      },
      {
        title: "Exfoliation",
        description: "Gentle exfoliation to remove dead skin cells and reveal fresh, smooth skin underneath.",
        duration: "10 mins"
      },
      {
        title: "Steam & Extraction",
        description: "Steam treatment to open pores followed by professional extraction if needed.",
        duration: "15 mins"
      },
      {
        title: "Facial Massage",
        description: "Relaxing massage to improve circulation and promote lymphatic drainage.",
        duration: "10 mins"
      },
      {
        title: "Mask & Moisturizing",
        description: "Customized mask application followed by moisturizer and SPF protection.",
        duration: "15 mins"
      }
    ],
    reviews: [
      {
        id: 1,
        name: "Priya Sharma",
        rating: 5,
        comment: "Absolutely amazing experience! My skin feels so soft and looks radiant. The staff was professional and the ambiance was perfect.",
        date: "Dec 28, 2024",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg"
      },
      {
        id: 2,
        name: "Anita Desai",
        rating: 4,
        comment: "Great facial treatment. Noticed immediate improvement in my skin texture. Will definitely book again.",
        date: "Dec 25, 2024",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg"
      },
      {
        id: 3,
        name: "Meera Patel",
        rating: 5,
        comment: "The K-SSense ritual exceeded my expectations. My skin has never looked better. Highly recommend!",
        date: "Dec 22, 2024",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg"
      }
    ]
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/service-detail' },
    { label: service?.name, path: '/service-detail' }
  ];

  // Handle sticky booking button visibility
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('service-hero');
      if (heroSection) {
        const heroBottom = heroSection?.offsetTop + heroSection?.offsetHeight;
        setShowStickyBooking(window.scrollY > heroBottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookNow = () => {
    const bookingData = {
      service: service?.name,
      price: service?.price,
      duration: service?.duration
    };
    localStorage.setItem('preSelectedBooking', JSON.stringify(bookingData));
    navigate('/booking-system');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: service?.name,
          text: service?.shortDescription,
          url: window.location?.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard?.writeText(window.location?.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div id="service-hero">
              <ServiceHero service={service} onBookNow={handleBookNow} />
            </div>
            
            {/* Service Tabs */}
            <ServiceTabs service={service} />
            
            {/* Before/After Gallery */}
            <BeforeAfterGallery service={service} />
            
            {/* FAQ Section */}
            <ServiceFAQ service={service} />
            
            {/* Salon Availability - Mobile Only */}
            <div className="lg:hidden">
              <SalonAvailability service={service} />
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Booking Widget - Desktop Only */}
            <div className="hidden lg:block">
              <BookingWidget service={service} />
            </div>
            
            {/* Salon Availability - Desktop Only */}
            <div className="hidden lg:block">
              <SalonAvailability service={service} />
            </div>
            
            {/* Related Services */}
            <RelatedServices currentServiceId={service?.id} />
          </div>
        </div>
      </main>
      {/* Sticky Booking Button - Mobile */}
      {showStickyBooking && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-40">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-semibold">{service?.name}</p>
              <p className="text-sm text-muted-foreground">₹{service?.price} • {service?.duration}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="Share2"
              onClick={handleShare}
            />
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              iconName="Phone"
              iconPosition="left"
              className="flex-1"
              onClick={() => window.location.href = 'tel:18001231952'}
            >
              Call Now
            </Button>
            <Button
              variant="default"
              size="lg"
              iconName="Calendar"
              iconPosition="left"
              className="flex-1"
              onClick={handleBookNow}
            >
              Book Now
            </Button>
          </div>
        </div>
      )}
      {/* Footer Spacer for Mobile Sticky Button */}
      {showStickyBooking && <div className="lg:hidden h-32" />}
    </div>
  );
};

export default ServiceDetail;