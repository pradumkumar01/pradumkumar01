import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const CustomerTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      review: "Absolutely amazing experience at Lakme Salon! The K-SSense facial treatment gave me the most radiant skin I\'ve ever had. The staff is professional and the ambiance is so relaxing.",
      service: "K-SSense Face Ritual",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Anita Desai",
      location: "Delhi",
      rating: 4,
      review: "Great service and quality products. The hair treatment was excellent and my stylist understood exactly what I wanted. Will definitely come back for my next appointment.",
      service: "Glass Shine Hair Treatment",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Kavya Reddy",
      location: "Bangalore",
      rating: 5,
      review: "Perfect bridal makeup for my wedding! The team at Lakme made me feel like a princess. Every detail was taken care of and I looked absolutely stunning in all my photos.",
      service: "Bridal Makeup Package",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      date: "3 weeks ago"
    },
    {
      id: 4,
      name: "Meera Patel",
      location: "Ahmedabad",
      rating: 4,
      review: "Love the hydra radiance facial! My skin feels so soft and glowing. The salon is clean, modern and the staff is very knowledgeable about skincare.",
      service: "Hydra Radiance Facial",
      image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      date: "1 week ago"
    },
    {
      id: 5,
      name: "Sneha Gupta",
      location: "Pune",
      rating: 3,
      review: "Good experience overall. The waxing service was professional and almost painless. The salon could improve on appointment scheduling but the service quality is good.",
      service: "Glass Shine Wax",
      image: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      date: "2 days ago"
    }
  ];

  // Calculate overall rating
  const totalRating = testimonials?.reduce((sum, testimonial) => sum + testimonial?.rating, 0);
  const averageRating = (totalRating / testimonials?.length)?.toFixed(1);
  const totalReviews = testimonials?.length;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={`${
          index < rating ? 'text-warning fill-current' : 'text-muted-foreground/30'
        }`}
      />
    ));
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Real experiences from our valued customers
          </p>

          {/* Overall Rating Display */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {renderStars(Math.round(parseFloat(averageRating)))}
              </div>
              <span className="text-2xl font-bold text-foreground">{averageRating}</span>
            </div>
            <div className="text-muted-foreground">
              Based on {totalReviews} reviews
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main Testimonial Card */}
            <div className="bg-card rounded-2xl shadow-card p-8 md:p-12 border border-border">
              <div className="flex flex-col md:flex-row items-start gap-6">
                {/* Customer Image */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden">
                    <Image
                      src={testimonials?.[currentTestimonial]?.image}
                      alt={testimonials?.[currentTestimonial]?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="flex-1">
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {renderStars(testimonials?.[currentTestimonial]?.rating)}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {testimonials?.[currentTestimonial]?.date}
                    </span>
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-lg md:text-xl text-foreground mb-6 leading-relaxed">
                    "{testimonials?.[currentTestimonial]?.review}"
                  </blockquote>

                  {/* Customer Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonials?.[currentTestimonial]?.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonials?.[currentTestimonial]?.location}
                      </div>
                    </div>
                    <div className="text-sm text-primary font-medium">
                      Service: {testimonials?.[currentTestimonial]?.service}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background border border-border hover:bg-muted rounded-full flex items-center justify-center shadow-card transition-colors"
              aria-label="Previous testimonial"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background border border-border hover:bg-muted rounded-full flex items-center justify-center shadow-card transition-colors"
              aria-label="Next testimonial"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">3.25L+</div>
            <div className="text-sm text-muted-foreground">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">400+</div>
            <div className="text-sm text-muted-foreground">Salon Locations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">40+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">125</div>
            <div className="text-sm text-muted-foreground">Cities Served</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;