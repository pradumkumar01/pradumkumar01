import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActions = () => {
  const quickActions = [
    {
      id: 1,
      title: "Book Appointment",
      description: "Schedule your next beauty session",
      icon: "Calendar",
      color: "primary",
      action: () => window.location.href = '/booking-system'
    },
    {
      id: 2,
      title: "Shop Products",
      description: "Browse our beauty collection",
      icon: "ShoppingBag",
      color: "accent",
      action: () => window.location.href = '/product-detail'
    },
    {
      id: 3,
      title: "Find Salon",
      description: "Locate nearest salon",
      icon: "MapPin",
      color: "success",
      action: () => console.log('Find salon')
    },
    {
      id: 4,
      title: "Support",
      description: "Get help & assistance",
      icon: "Headphones",
      color: "warning",
      action: () => console.log('Contact support')
    }
  ];

  return (
    <div className="bg-card rounded-lg p-6 shadow-card border border-border">
      <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={action?.action}
            className="flex flex-col items-center p-4 rounded-lg border border-border hover:bg-muted transition-smooth text-center"
          >
            <div className={`p-3 rounded-lg bg-${action?.color}/10 mb-2`}>
              <Icon 
                name={action?.icon} 
                size={20} 
                color={`var(--color-${action?.color})`} 
              />
            </div>
            <h4 className="font-medium text-sm text-foreground mb-1">
              {action?.title}
            </h4>
            <p className="text-xs text-muted-foreground">
              {action?.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;