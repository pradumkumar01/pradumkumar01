import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardCard = ({ title, value, subtitle, icon, color = "primary", onClick, children }) => {
  return (
    <div 
      className={`bg-card rounded-lg p-6 shadow-card border border-border transition-smooth ${
        onClick ? 'cursor-pointer hover:shadow-modal' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
            {title}
          </h3>
          {value && (
            <div className="text-2xl font-bold text-foreground mb-1">
              {value}
            </div>
          )}
          {subtitle && (
            <p className="text-sm text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
        {icon && (
          <div className={`p-3 rounded-lg bg-${color}/10`}>
            <Icon 
              name={icon} 
              size={24} 
              color={`var(--color-${color})`} 
            />
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default DashboardCard;