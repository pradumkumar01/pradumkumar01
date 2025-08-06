import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: "Services",
      links: [
        { label: "Hair Services", path: "/service-detail" },
        { label: "Skin Treatments", path: "/service-detail" },
        { label: "Makeup Services", path: "/service-detail" },
        { label: "Nail Care", path: "/service-detail" },
        { label: "Cosmetology", path: "/service-detail" }
      ]
    },
    {
      title: "Products",
      links: [
        { label: "Hair Care", path: "/product-detail" },
        { label: "Skin Care", path: "/product-detail" },
        { label: "Makeup", path: "/product-detail" },
        { label: "Nail Products", path: "/product-detail" },
        { label: "Gift Sets", path: "/product-detail" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Lakme", path: "/" },
        { label: "Lakme Academy", path: "/" },
        { label: "Franchise", path: "/" },
        { label: "Careers", path: "/" },
        { label: "Press", path: "/" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Contact Us", path: "/" },
        { label: "Find Salon", path: "/" },
        { label: "Book Appointment", path: "/booking-system" },
        { label: "Customer Care", path: "/" },
        { label: "FAQ", path: "/" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", url: "https://facebook.com/lakmesalon" },
    { name: "Instagram", icon: "Instagram", url: "https://instagram.com/lakmesalon" },
    { name: "YouTube", icon: "Youtube", url: "https://youtube.com/lakmesalon" },
    { name: "Twitter", icon: "Twitter", url: "https://twitter.com/lakmesalon" }
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                  <Icon name="Sparkles" size={24} color="var(--color-primary-foreground)" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-semibold text-lg text-background">
                    Lakme
                  </span>
                  <span className="font-caption text-xs text-background/70 -mt-1">
                    Salon Pro
                  </span>
                </div>
              </Link>
              
              <p className="text-background/80 mb-6 leading-relaxed">
                India's leading beauty salon chain with 40+ years of expertise in professional beauty services. Transform your look with our expert stylists and premium products.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Icon name="Phone" size={16} className="text-primary" />
                  <span className="text-background/80">1800 123 1952</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Mail" size={16} className="text-primary" />
                  <span className="text-background/80">support@lakmesalon.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  <span className="text-background/80">400+ Locations across 125 Cities</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections?.map((section) => (
              <div key={section?.title}>
                <h3 className="font-heading font-semibold text-background mb-4">
                  {section?.title}
                </h3>
                <ul className="space-y-3">
                  {section?.links?.map((link) => (
                    <li key={link?.label}>
                      <Link
                        to={link?.path}
                        className="text-background/70 hover:text-background transition-colors text-sm"
                      >
                        {link?.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media & Bottom Section */}
        <div className="border-t border-background/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-background/80 text-sm">Follow us:</span>
              <div className="flex gap-3">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-background/10 hover:bg-primary rounded-full flex items-center justify-center text-background/70 hover:text-primary-foreground transition-all duration-300"
                    aria-label={`Follow us on ${social?.name}`}
                  >
                    <Icon name={social?.icon} size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 text-sm text-background/60">
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Award" size={16} className="text-accent" />
                <span>Certified Professionals</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="border-t border-background/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/60">
            <div>
              © {currentYear} Lakme Salon Pro. All rights reserved.
            </div>
            
            <div className="flex gap-6">
              <Link to="/" className="hover:text-background transition-colors">
                Privacy Policy
              </Link>
              <Link to="/" className="hover:text-background transition-colors">
                Terms of Service
              </Link>
              <Link to="/" className="hover:text-background transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Fraud Warning */}
          <div className="mt-4 p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
              <div className="text-xs text-background/80">
                <strong>Fraud Awareness:</strong> Lakme Salon will never ask for payments through unofficial channels. 
                Report suspicious activities to Chaksu Portal or contact our official customer care at 1800 123 1952.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;