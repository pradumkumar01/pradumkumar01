import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name="ShoppingCart" size={48} className="text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-semibold text-foreground mb-2">
        Your cart is empty
      </h2>
      <p className="text-muted-foreground text-center mb-8 max-w-md">
        Looks like you haven't added any items to your cart yet. 
        Start shopping to discover our amazing beauty products and services.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/product-detail">
          <Button variant="default" size="lg" iconName="ShoppingBag" iconPosition="left">
            Shop Products
          </Button>
        </Link>
        
        <Link to="/service-detail">
          <Button variant="outline" size="lg" iconName="Scissors" iconPosition="left">
            Book Services
          </Button>
        </Link>
      </div>
      {/* Popular Categories */}
      <div className="mt-12 w-full max-w-2xl">
        <h3 className="text-lg font-medium text-foreground mb-4 text-center">
          Popular Categories
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Hair Care', icon: 'Scissors', color: 'text-primary' },
            { name: 'Skin Care', icon: 'Sparkles', color: 'text-accent' },
            { name: 'Makeup', icon: 'Palette', color: 'text-success' },
            { name: 'Nail Care', icon: 'Hand', color: 'text-warning' }
          ]?.map((category) => (
            <Link
              key={category?.name}
              to="/product-detail"
              className="flex flex-col items-center p-4 bg-card border border-border rounded-lg hover:shadow-card transition-smooth"
            >
              <Icon 
                name={category?.icon} 
                size={24} 
                className={`${category?.color} mb-2`} 
              />
              <span className="text-sm font-medium text-foreground">
                {category?.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;