import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AppointmentCard = ({ appointment }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`)?.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'primary';
    }
  };

  return (
    <div className="bg-card rounded-lg p-4 border border-border shadow-card">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-foreground mb-1">
            {appointment?.service}
          </h4>
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Icon name="MapPin" size={14} className="mr-1" />
            <span>{appointment?.salon}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Icon name="Calendar" size={14} className="mr-1" />
            <span>{formatDate(appointment?.date)} at {formatTime(appointment?.time)}</span>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium bg-${getStatusColor(appointment?.status)}/10 text-${getStatusColor(appointment?.status)}`}>
          {appointment?.status}
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="text-sm">
          <span className="text-muted-foreground">Price: </span>
          <span className="font-semibold text-foreground">₹{appointment?.price}</span>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="xs" iconName="Calendar">
            Reschedule
          </Button>
          <Button variant="ghost" size="xs" iconName="X">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;