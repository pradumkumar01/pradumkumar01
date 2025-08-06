import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingConfirmation = ({ bookingData, onNewBooking, onViewBookings }) => {
  const mockBookingReference = `LKM${Date.now()?.toString()?.slice(-6)}`;
  
  const formatDate = (date) => {
    return date?.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time?.split(':');
    const date = new Date(2024, 0, 1, parseInt(hours), parseInt(minutes));
    return date?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleAddToCalendar = () => {
    const startDate = new Date(bookingData.selectedDate);
    const [hours, minutes] = bookingData?.selectedTime?.split(':');
    startDate?.setHours(parseInt(hours), parseInt(minutes));
    
    const endDate = new Date(startDate);
    endDate?.setHours(startDate?.getHours() + 1, startDate?.getMinutes() + 30); // Assuming 90 min duration

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(bookingData?.service?.name)}&dates=${startDate?.toISOString()?.replace(/[-:]/g, '')?.split('.')?.[0]}Z/${endDate?.toISOString()?.replace(/[-:]/g, '')?.split('.')?.[0]}Z&details=${encodeURIComponent(`Appointment at ${bookingData?.salon?.name}`)}&location=${encodeURIComponent(bookingData?.salon?.address)}`;
    
    window.open(calendarUrl, '_blank');
  };

  const handleShareWhatsApp = () => {
    const message = `🎉 Booking Confirmed!\n\nService: ${bookingData?.service?.name}\nSalon: ${bookingData?.salon?.name}\nDate: ${formatDate(bookingData?.selectedDate)}\nTime: ${formatTime(bookingData?.selectedTime)}\nReference: ${mockBookingReference}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={40} className="text-success" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-muted-foreground">
          Your appointment has been successfully booked. We're excited to see you!
        </p>
      </div>
      {/* Booking Reference */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
        <div className="text-center">
          <h3 className="font-medium text-foreground mb-2">Booking Reference</h3>
          <div className="font-mono text-2xl font-bold text-primary mb-2">
            {mockBookingReference}
          </div>
          <p className="text-sm text-muted-foreground">
            Please save this reference number for your records
          </p>
        </div>
      </div>
      {/* Booking Details */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
          Appointment Details
        </h3>

        <div className="space-y-4">
          {/* Service */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Scissors" size={20} className="text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">{bookingData?.service?.name}</h4>
              <p className="text-sm text-muted-foreground">{bookingData?.service?.category}</p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={20} className="text-success" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">
                {formatDate(bookingData?.selectedDate)}
              </h4>
              <p className="text-sm text-muted-foreground">
                {formatTime(bookingData?.selectedTime)}
              </p>
            </div>
          </div>

          {/* Salon */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="MapPin" size={20} className="text-accent" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">{bookingData?.salon?.name}</h4>
              <p className="text-sm text-muted-foreground">{bookingData?.salon?.address}</p>
              <p className="text-sm text-muted-foreground">{bookingData?.salon?.phone}</p>
            </div>
          </div>

          {/* Customer */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
              <Icon name="User" size={20} className="text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">
                {bookingData?.customerDetails?.firstName} {bookingData?.customerDetails?.lastName}
              </h4>
              <p className="text-sm text-muted-foreground">{bookingData?.customerDetails?.email}</p>
              <p className="text-sm text-muted-foreground">{bookingData?.customerDetails?.phone}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Payment Summary */}
      <div className="bg-card border border-border rounded-lg p-4 mb-6">
        <h4 className="font-medium text-foreground mb-3">Payment Summary</h4>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Total Paid</span>
          <span className="font-semibold text-foreground text-lg">
            ₹{bookingData?.paymentData?.total?.toLocaleString('en-IN')}
          </span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm text-muted-foreground">Payment Method</span>
          <span className="text-sm text-foreground capitalize">
            {bookingData?.paymentData?.paymentMethod?.replace(/([A-Z])/g, ' $1')?.trim()}
          </span>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Button
          variant="outline"
          iconName="Calendar"
          iconPosition="left"
          onClick={handleAddToCalendar}
        >
          Add to Calendar
        </Button>
        <Button
          variant="outline"
          iconName="MessageCircle"
          iconPosition="left"
          onClick={handleShareWhatsApp}
        >
          Share on WhatsApp
        </Button>
      </div>
      {/* Important Information */}
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} className="text-warning flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-2">Important Information</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Please arrive 10 minutes before your appointment time</li>
              <li>• Cancellation or rescheduling allowed up to 2 hours before appointment</li>
              <li>• Bring a valid ID for verification</li>
              <li>• Contact the salon directly for any urgent changes</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Contact Information */}
      <div className="bg-card border border-border rounded-lg p-4 mb-6">
        <h4 className="font-medium text-foreground mb-3">Need Help?</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Icon name="Phone" size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">Customer Care:</span>
            <a href="tel:1800-123-1952" className="text-primary hover:underline">
              1800 123 1952
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="MapPin" size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">Salon Direct:</span>
            <a href={`tel:${bookingData?.salon?.phone}`} className="text-primary hover:underline">
              {bookingData?.salon?.phone}
            </a>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="default"
          fullWidth
          iconName="Plus"
          iconPosition="left"
          onClick={onNewBooking}
        >
          Book Another Appointment
        </Button>
        <Button
          variant="outline"
          fullWidth
          iconName="History"
          iconPosition="left"
          onClick={onViewBookings}
        >
          View My Bookings
        </Button>
      </div>
      {/* Footer Note */}
      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          Thank you for choosing Lakme Salon Pro. We look forward to serving you!
        </p>
      </div>
    </div>
  );
};

export default BookingConfirmation;