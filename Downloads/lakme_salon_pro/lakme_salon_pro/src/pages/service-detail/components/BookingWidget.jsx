import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import { useNavigate } from 'react-router-dom';

const BookingWidget = ({ service }) => {
  const navigate = useNavigate();
  const [selectedSalon, setSelectedSalon] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const salonOptions = [
    { value: 'mumbai-bandra', label: 'Lakme Salon - Bandra West' },
    { value: 'mumbai-andheri', label: 'Lakme Salon - Andheri East' },
    { value: 'delhi-cp', label: 'Lakme Salon - Connaught Place' },
    { value: 'bangalore-koramangala', label: 'Lakme Salon - Koramangala' }
  ];

  const dateOptions = [
    { value: '2025-01-08', label: 'Today - Jan 8' },
    { value: '2025-01-09', label: 'Tomorrow - Jan 9' },
    { value: '2025-01-10', label: 'Jan 10, 2025' },
    { value: '2025-01-11', label: 'Jan 11, 2025' },
    { value: '2025-01-12', label: 'Jan 12, 2025' }
  ];

  const timeOptions = [
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' },
    { value: '17:00', label: '5:00 PM' }
  ];

  const handleBookNow = () => {
    const bookingData = {
      service: service?.name,
      salon: selectedSalon,
      date: selectedDate,
      time: selectedTime,
      price: service?.price
    };
    
    // Store booking data in localStorage for the booking system
    localStorage.setItem('preSelectedBooking', JSON.stringify(bookingData));
    navigate('/booking-system');
  };

  const isBookingComplete = selectedSalon && selectedDate && selectedTime;

  return (
    <div className="bg-card rounded-lg shadow-card p-6 sticky top-24">
      <div className="mb-6">
        <h3 className="text-xl font-heading font-semibold mb-2">Book This Service</h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">₹{service?.price}</span>
          <span className="text-sm text-muted-foreground">{service?.duration}</span>
        </div>
      </div>
      <div className="space-y-4 mb-6">
        <Select
          label="Select Salon"
          placeholder="Choose a salon location"
          options={salonOptions}
          value={selectedSalon}
          onChange={setSelectedSalon}
          searchable
        />

        <Select
          label="Select Date"
          placeholder="Choose appointment date"
          options={dateOptions}
          value={selectedDate}
          onChange={setSelectedDate}
        />

        <Select
          label="Select Time"
          placeholder="Choose appointment time"
          options={timeOptions}
          value={selectedTime}
          onChange={setSelectedTime}
          disabled={!selectedDate}
        />
      </div>
      <Button
        variant="default"
        size="lg"
        fullWidth
        onClick={handleBookNow}
        disabled={!isBookingComplete}
        iconName="Calendar"
        iconPosition="left"
      >
        Book Appointment
      </Button>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
          <Icon name="Shield" size={14} />
          <span>100% Safe & Hygienic</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
          <Icon name="Clock" size={14} />
          <span>Free Cancellation up to 2 hours before</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Award" size={14} />
          <span>Certified Professional Stylists</span>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;