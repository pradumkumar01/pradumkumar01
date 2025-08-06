import React from 'react';
import Icon from '../../../components/AppIcon';

const PopularServices = ({ services, onServiceClick }) => {
  return (
    <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-success/5 rounded-xl p-6 mb-8 border border-primary/10">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="TrendingUp" size={20} className="text-primary" />
        <h3 className="font-heading text-lg font-semibold text-foreground">
          Popular Services
        </h3>
        <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
          Trending
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services?.map((service) => (
          <div
            key={service?.id}
            onClick={() => onServiceClick(service)}
            className="group bg-background rounded-lg p-4 cursor-pointer hover:shadow-card transition-all duration-300 border border-border/50"
          >
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon
                  name={
                    service?.category === 'Hair' ? 'Scissors' :
                    service?.category === 'Skin' ? 'Sparkles' :
                    service?.category === 'Makeup' ? 'Palette' :
                    service?.category === 'Nails'? 'Hand' : 'Zap'
                  }
                  size={20}
                  color="white"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                  {service?.name}
                </h4>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <span>₹{service?.startingPrice}</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-accent fill-current" />
                    <span>{service?.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularServices;