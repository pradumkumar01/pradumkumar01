import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OrderCard = ({ order }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'success';
      case 'shipped': return 'primary';
      case 'processing': return 'warning';
      case 'cancelled': return 'error';
      default: return 'muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'CheckCircle';
      case 'shipped': return 'Truck';
      case 'processing': return 'Clock';
      case 'cancelled': return 'XCircle';
      default: return 'Package';
    }
  };

  return (
    <div className="bg-card rounded-lg p-4 border border-border shadow-card">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-foreground">
              Order #{order?.id}
            </h4>
            <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${getStatusColor(order?.status)}/10 text-${getStatusColor(order?.status)}`}>
              <Icon name={getStatusIcon(order?.status)} size={12} className="mr-1" />
              {order?.status}
            </div>
          </div>
          <div className="text-sm text-muted-foreground mb-3">
            Ordered on {formatDate(order?.date)}
          </div>
        </div>
      </div>
      <div className="space-y-3 mb-4">
        {order?.items?.slice(0, 2)?.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
              <Image
                src={item?.image}
                alt={item?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h5 className="text-sm font-medium text-foreground">
                {item?.name}
              </h5>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Qty: {item?.quantity}
                </span>
                <span className="text-sm font-semibold text-foreground">
                  ₹{item?.price}
                </span>
              </div>
            </div>
          </div>
        ))}
        {order?.items?.length > 2 && (
          <div className="text-xs text-muted-foreground text-center py-2">
            +{order?.items?.length - 2} more items
          </div>
        )}
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="text-sm">
          <span className="text-muted-foreground">Total: </span>
          <span className="font-semibold text-foreground">₹{order?.total}</span>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="xs" iconName="Eye">
            View Details
          </Button>
          {order?.status?.toLowerCase() === 'delivered' && (
            <Button variant="ghost" size="xs" iconName="RotateCcw">
              Reorder
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;