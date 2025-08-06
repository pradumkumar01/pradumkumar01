import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingProgress = ({ currentStep, totalSteps = 5 }) => {
  const steps = [
    { number: 1, label: 'Service', icon: 'Scissors' },
    { number: 2, label: 'Salon', icon: 'MapPin' },
    { number: 3, label: 'Date & Time', icon: 'Calendar' },
    { number: 4, label: 'Details', icon: 'User' },
    { number: 5, label: 'Payment', icon: 'CreditCard' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.number}>
            <div className="flex flex-col items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-smooth
                ${currentStep >= step?.number 
                  ? 'bg-primary text-primary-foreground' 
                  : currentStep === step?.number - 1
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-muted text-muted-foreground'
                }
              `}>
                {currentStep > step?.number ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step?.icon} size={16} />
                )}
              </div>
              <span className={`
                text-xs mt-2 font-caption text-center
                ${currentStep >= step?.number ? 'text-primary' : 'text-muted-foreground'}
              `}>
                {step?.label}
              </span>
            </div>
            {index < steps?.length - 1 && (
              <div className={`
                flex-1 h-0.5 mx-2 transition-smooth
                ${currentStep > step?.number ? 'bg-primary' : 'bg-muted'}
              `} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BookingProgress;