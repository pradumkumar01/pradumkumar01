import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'booking': return 'Calendar';
      case 'order': return 'ShoppingBag';
      case 'points': return 'Star';
      case 'reward': return 'Gift';
      default: return 'Bell';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'booking': return 'primary';
      case 'order': return 'accent';
      case 'points': return 'success';
      case 'reward': return 'warning';
      default: return 'muted';
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date?.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-card border border-border">
      <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg bg-${getActivityColor(activity?.type)}/10 flex-shrink-0`}>
              <Icon 
                name={getActivityIcon(activity?.type)} 
                size={16} 
                color={`var(--color-${getActivityColor(activity?.type)})`} 
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                {activity?.message}
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-muted-foreground">
                  {formatTimeAgo(activity?.timestamp)}
                </span>
                {activity?.amount && (
                  <span className="text-xs font-medium text-success">
                    +₹{activity?.amount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-sm text-primary hover:text-primary/80 transition-smooth">
        View All Activities
      </button>
    </div>
  );
};

export default ActivityFeed;