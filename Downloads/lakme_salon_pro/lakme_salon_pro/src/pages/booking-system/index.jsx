import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import BookingProgress from './components/BookingProgress';
import ServiceSummary from './components/ServiceSummary';
import SalonSelector from './components/SalonSelector';
import DateTimeSelector from './components/DateTimeSelector';
import CustomerDetailsForm from './components/CustomerDetailsForm';
import BookingSummary from './components/BookingSummary';
import BookingConfirmation from './components/BookingConfirmation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const BookingSystem = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGuestCheckout, setIsGuestCheckout] = useState(true);
  
  // Booking state
  const [bookingData, setBookingData] = useState({
    service: null,
    salon: null,
    selectedDate: null,
    selectedTime: null,
    customerDetails: {},
    paymentData: null
  });

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/service-detail' },
    { label: 'Book Appointment', path: '/booking-system' }
  ];

  const handleServiceModify = () => {
    navigate('/service-detail');
  };

  const handleSalonSelect = (salon) => {
    setBookingData(prev => ({ ...prev, salon }));
  };

  const handleDateSelect = (date) => {
    setBookingData(prev => ({ ...prev, selectedDate: date }));
  };

  const handleTimeSelect = (time) => {
    setBookingData(prev => ({ ...prev, selectedTime: time }));
  };

  const handleDetailsChange = (details) => {
    setBookingData(prev => ({ ...prev, customerDetails: details }));
  };

  const handleGuestToggle = () => {
    setIsGuestCheckout(!isGuestCheckout);
  };

  const handleConfirmBooking = async (paymentData) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setBookingData(prev => ({ ...prev, paymentData }));
      setCurrentStep(6); // Move to confirmation step
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNewBooking = () => {
    setCurrentStep(1);
    setBookingData({
      service: null,
      salon: null,
      selectedDate: null,
      selectedTime: null,
      customerDetails: {},
      paymentData: null
    });
  };

  const handleViewBookings = () => {
    navigate('/user-dashboard');
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return bookingData?.service !== null;
      case 2:
        return bookingData?.salon !== null;
      case 3:
        return bookingData?.selectedDate && bookingData?.selectedTime;
      case 4:
        return bookingData?.customerDetails?.firstName && 
               bookingData?.customerDetails?.lastName && 
               bookingData?.customerDetails?.email && 
               bookingData?.customerDetails?.phone;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (canProceedToNext()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceSummary
            selectedService={bookingData?.service}
            onModify={handleServiceModify}
          />
        );
      case 2:
        return (
          <SalonSelector
            selectedSalon={bookingData?.salon}
            onSalonSelect={handleSalonSelect}
          />
        );
      case 3:
        return (
          <DateTimeSelector
            selectedDate={bookingData?.selectedDate}
            selectedTime={bookingData?.selectedTime}
            onDateSelect={handleDateSelect}
            onTimeSelect={handleTimeSelect}
          />
        );
      case 4:
        return (
          <CustomerDetailsForm
            customerDetails={bookingData?.customerDetails}
            onDetailsChange={handleDetailsChange}
            isGuestCheckout={isGuestCheckout}
            onGuestToggle={handleGuestToggle}
          />
        );
      case 5:
        return (
          <BookingSummary
            service={bookingData?.service}
            salon={bookingData?.salon}
            selectedDate={bookingData?.selectedDate}
            selectedTime={bookingData?.selectedTime}
            customerDetails={bookingData?.customerDetails}
            onConfirmBooking={handleConfirmBooking}
            isProcessing={isProcessing}
          />
        );
      case 6:
        return (
          <BookingConfirmation
            bookingData={bookingData}
            onNewBooking={handleNewBooking}
            onViewBookings={handleViewBookings}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    const titles = {
      1: 'Service Selection',
      2: 'Choose Salon',
      3: 'Select Date & Time',
      4: 'Customer Details',
      5: 'Payment & Confirmation',
      6: 'Booking Confirmed'
    };
    return titles?.[currentStep] || 'Booking System';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
              {getStepTitle()}
            </h1>
            <p className="text-muted-foreground">
              {currentStep === 6 
                ? 'Your appointment has been successfully booked' :'Complete your booking in a few simple steps'
              }
            </p>
          </div>

          {/* Progress Indicator */}
          {currentStep < 6 && (
            <BookingProgress currentStep={currentStep} totalSteps={5} />
          )}

          {/* Desktop Layout */}
          <div className="hidden lg:flex gap-8">
            {/* Sidebar - Booking Progress */}
            {currentStep < 6 && (
              <div className="w-80 flex-shrink-0">
                <div className="sticky top-6 space-y-6">
                  {/* Current Step Info */}
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Step {currentStep} of 5
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {getStepTitle()}
                    </p>
                  </div>

                  {/* Booking Summary Sidebar */}
                  {bookingData?.service && (
                    <div className="bg-card border border-border rounded-lg p-4">
                      <h4 className="font-medium text-foreground mb-3">Booking Summary</h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Service:</span>
                          <p className="font-medium text-foreground">{bookingData?.service?.name}</p>
                        </div>
                        {bookingData?.salon && (
                          <div>
                            <span className="text-muted-foreground">Salon:</span>
                            <p className="font-medium text-foreground">{bookingData?.salon?.name}</p>
                          </div>
                        )}
                        {bookingData?.selectedDate && (
                          <div>
                            <span className="text-muted-foreground">Date:</span>
                            <p className="font-medium text-foreground">
                              {bookingData?.selectedDate?.toLocaleDateString('en-IN')}
                            </p>
                          </div>
                        )}
                        {bookingData?.selectedTime && (
                          <div>
                            <span className="text-muted-foreground">Time:</span>
                            <p className="font-medium text-foreground">{bookingData?.selectedTime}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Help Section */}
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="HelpCircle" size={16} className="text-accent" />
                      <h4 className="font-medium text-foreground">Need Help?</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Our customer support team is here to assist you.
                    </p>
                    <Button variant="outline" size="sm" fullWidth>
                      Contact Support
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1">
              {renderStepContent()}
              
              {/* Navigation Buttons */}
              {currentStep < 6 && (
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    iconName="ChevronLeft"
                    iconPosition="left"
                  >
                    Previous
                  </Button>
                  
                  {currentStep < 5 && (
                    <Button
                      variant="default"
                      onClick={handleNext}
                      disabled={!canProceedToNext()}
                      iconName="ChevronRight"
                      iconPosition="right"
                    >
                      Next
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            {renderStepContent()}
            
            {/* Mobile Navigation */}
            {currentStep < 6 && (
              <div className="flex justify-between mt-6 gap-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  iconName="ChevronLeft"
                  iconPosition="left"
                  className="flex-1"
                >
                  Previous
                </Button>
                
                {currentStep < 5 && (
                  <Button
                    variant="default"
                    onClick={handleNext}
                    disabled={!canProceedToNext()}
                    iconName="ChevronRight"
                    iconPosition="right"
                    className="flex-1"
                  >
                    Next
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingSystem;