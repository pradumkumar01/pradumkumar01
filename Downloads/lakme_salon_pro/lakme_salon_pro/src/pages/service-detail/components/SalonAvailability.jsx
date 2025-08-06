import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SalonAvailability = ({ service }) => {
  const [selectedCity, setSelectedCity] = useState('mumbai');

  const salonLocations = {
    mumbai: [
      {
        id: 1,
        name: "Lakme Salon - Bandra West",
        address: "Shop 12, Hill Road, Bandra West, Mumbai - 400050",
        phone: "+91 98765 43210",
        rating: 4.6,
        available: true,
        nextSlot: "Today 2:00 PM",
        distance: "2.3 km"
      },
      {
        id: 2,
        name: "Lakme Salon - Andheri East",
        address: "Phoenix MarketCity, Andheri East, Mumbai - 400069",
        phone: "+91 98765 43211",
        rating: 4.4,
        available: true,
        nextSlot: "Tomorrow 10:00 AM",
        distance: "5.1 km"
      },
      {
        id: 3,
        name: "Lakme Salon - Powai",
        address: "R City Mall, Powai, Mumbai - 400076",
        phone: "+91 98765 43212",
        rating: 4.5,
        available: false,
        nextSlot: "Jan 10, 11:00 AM",
        distance: "8.7 km"
      }
    ],
    delhi: [
      {
        id: 4,
        name: "Lakme Salon - Connaught Place",
        address: "Block A, Connaught Place, New Delhi - 110001",
        phone: "+91 98765 43213",
        rating: 4.7,
        available: true,
        nextSlot: "Today 3:30 PM",
        distance: "1.2 km"
      },
      {
        id: 5,
        name: "Lakme Salon - Khan Market",
        address: "Khan Market, New Delhi - 110003",
        phone: "+91 98765 43214",
        rating: 4.3,
        available: true,
        nextSlot: "Tomorrow 9:00 AM",
        distance: "3.8 km"
      }
    ],
    bangalore: [
      {
        id: 6,
        name: "Lakme Salon - Koramangala",
        address: "Forum Mall, Koramangala, Bangalore - 560095",
        phone: "+91 98765 43215",
        rating: 4.8,
        available: true,
        nextSlot: "Today 4:00 PM",
        distance: "1.8 km"
      },
      {
        id: 7,
        name: "Lakme Salon - Indiranagar",
        address: "100 Feet Road, Indiranagar, Bangalore - 560038",
        phone: "+91 98765 43216",
        rating: 4.5,
        available: false,
        nextSlot: "Jan 9, 2:00 PM",
        distance: "4.2 km"
      }
    ]
  };

  const cities = [
    { id: 'mumbai', name: 'Mumbai', count: 3 },
    { id: 'delhi', name: 'Delhi', count: 2 },
    { id: 'bangalore', name: 'Bangalore', count: 2 }
  ];

  const handleBookAtSalon = (salon) => {
    // Store salon selection and navigate to booking
    const bookingData = {
      service: service?.name,
      salon: salon?.name,
      salonId: salon?.id,
      price: service?.price
    };
    localStorage.setItem('preSelectedBooking', JSON.stringify(bookingData));
    window.location.href = '/booking-system';
  };

  return (
    <div className="bg-card rounded-lg shadow-card p-6">
      <h3 className="text-xl font-heading font-semibold mb-6">Available at These Salons</h3>
      {/* City Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {cities?.map((city) => (
          <button
            key={city?.id}
            onClick={() => setSelectedCity(city?.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth ${
              selectedCity === city?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {city?.name} ({city?.count})
          </button>
        ))}
      </div>
      {/* Salon List */}
      <div className="space-y-4">
        {salonLocations?.[selectedCity]?.map((salon) => (
          <div key={salon?.id} className="border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{salon?.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{salon?.address}</p>
                
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span className="text-muted-foreground">{salon?.rating}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} className="text-muted-foreground" />
                    <span className="text-muted-foreground">{salon?.distance}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Icon name="Phone" size={14} className="text-muted-foreground" />
                    <a
                      href={`tel:${salon?.phone}`}
                      className="text-primary hover:text-primary/80 transition-smooth"
                    >
                      Call
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  salon?.available
                    ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
                }`}>
                  {salon?.available ? 'Available Today' : 'Busy Today'}
                </div>
                
                <span className="text-sm text-muted-foreground">
                  Next: {salon?.nextSlot}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                iconName="MapPin"
                iconPosition="left"
                onClick={() => window.open(`https://www.google.com/maps?q=${encodeURIComponent(salon?.address)}`, '_blank')}
              >
                View on Map
              </Button>
              
              <Button
                variant="default"
                size="sm"
                iconName="Calendar"
                iconPosition="left"
                onClick={() => handleBookAtSalon(salon)}
              >
                Book Here
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Find More Salons */}
      <div className="mt-6 pt-4 border-t border-border text-center">
        <p className="text-sm text-muted-foreground mb-3">
          Can't find a convenient location?
        </p>
        <Button
          variant="ghost"
          size="sm"
          iconName="Search"
          iconPosition="left"
          onClick={() => window.location.href = '/salon-locator'}
        >
          Find More Salons
        </Button>
      </div>
    </div>
  );
};

export default SalonAvailability;