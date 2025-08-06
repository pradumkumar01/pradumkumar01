import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e?.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: "Facebook",
      url: "https://facebook.com/lakmesalon",
      color: "hover:text-blue-600"
    },
    {
      name: "Instagram",
      icon: "Instagram",
      url: "https://instagram.com/lakmesalon",
      color: "hover:text-pink-600"
    },
    {
      name: "YouTube",
      icon: "Youtube",
      url: "https://youtube.com/lakmesalon",
      color: "hover:text-red-600"
    },
    {
      name: "Twitter",
      icon: "Twitter",
      url: "https://twitter.com/lakmesalon",
      color: "hover:text-blue-400"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-accent/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Stay Beautiful, Stay Updated
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest beauty trends, exclusive offers, and expert tips from Lakme professionals
            </p>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-card rounded-2xl shadow-card p-8 md:p-12 border border-border mb-12">
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e?.target?.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    loading={isLoading}
                    disabled={!email || isLoading}
                    className="sm:w-auto"
                  >
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  By subscribing, you agree to receive marketing communications from Lakme Salon. 
                  You can unsubscribe at any time.
                </p>
              </form>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Check" size={32} color="white" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                  Welcome to the Lakme Family!
                </h3>
                <p className="text-muted-foreground">
                  Thank you for subscribing. You'll receive our latest updates and exclusive offers soon.
                </p>
              </div>
            )}
          </div>

          {/* Social Media Links */}
          <div className="mb-12">
            <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
              Follow Us for Daily Beauty Inspiration
            </h3>
            <div className="flex justify-center gap-6">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 bg-muted hover:bg-primary rounded-full flex items-center justify-center text-muted-foreground hover:text-primary-foreground transition-all duration-300 ${social?.color}`}
                  aria-label={`Follow us on ${social?.name}`}
                >
                  <Icon name={social?.icon} size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Gift" size={24} className="text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Exclusive Offers</h4>
              <p className="text-sm text-muted-foreground">
                Get first access to special promotions and member-only discounts
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Lightbulb" size={24} className="text-accent" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Beauty Tips</h4>
              <p className="text-sm text-muted-foreground">
                Expert advice and tutorials from our professional stylists
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Sparkles" size={24} className="text-success" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Trend Updates</h4>
              <p className="text-sm text-muted-foreground">
                Stay ahead with the latest beauty trends and seasonal looks
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;