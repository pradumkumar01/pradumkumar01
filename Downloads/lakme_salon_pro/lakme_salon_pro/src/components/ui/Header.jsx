import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { path } from 'd3';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount] = useState(3); // Mock cart count
  const [isAuthenticated] = useState(false); // Mock auth state
  const location = useLocation();

  const navigationItems = [
    {label: 'Home', path : '/', icon: 'Home'},
    { label: 'Services', path: '/service-catalog', icon: 'Scissors' },
    { label: 'Products', path: '/product-catalog', icon: 'ShoppingBag' },
    { label: 'Dashboard', path: '/user-dashboard', icon: 'User', authRequired: true },
  ];

  const isActivePath = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="Sparkles" size={24} color="var(--color-primary-foreground)" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-semibold text-lg text-foreground">
                Lakme
              </span>
              <span className="font-caption text-xs text-muted-foreground -mt-1">
                Salon Pro
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems?.map((item) => {
              if (item?.authRequired && !isAuthenticated) return null;
              
              return (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                    isActivePath(item?.path)
                      ? 'text-primary bg-secondary/50' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Book Now CTA */}
            <Button
              variant="default"
              size="sm"
              className="hidden sm:flex"
              onClick={() => window.location.href = '/booking-system'}
            >
              Book Now
            </Button>

            {/* Shopping Cart */}
            <Link
              to="/shopping-cart"
              className="relative p-2 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name="ShoppingCart" size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Account Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button className="flex items-center space-x-2 p-2 text-muted-foreground hover:text-foreground transition-smooth">
                  <Icon name="User" size={20} />
                </button>
              </div>
            ) : (
              <Link
              to="/login-register"
              >
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex"
                
              >
                Login/Register
              </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="py-4 space-y-2">
              {navigationItems?.map((item) => {
                if (item?.authRequired && !isAuthenticated) return null;
                
                return (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-smooth ${
                      isActivePath(item?.path)
                        ? 'text-primary bg-secondary/50 border-r-2 border-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.label}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Book Now */}
              <div className="px-4 pt-4 border-t border-border">
                <Button
                  variant="default"
                  fullWidth
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.location.href = '/booking-system';
                  }}
                >
                  Book Now
                </Button>
              </div>

              {/* Mobile Auth */}
              {!isAuthenticated && (
                <div className="px-4 pt-2">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login/Register
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;