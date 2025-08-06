import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SalonSelector = ({ selectedSalon, onSalonSelect }) => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [searchQuery, setSearchQuery] = useState('');

  const mockSalons = [
    {
      id: 1,
      name: "Lakme Salon - Connaught Place",
      address: "Shop No. 15, Inner Circle, Connaught Place, New Delhi - 110001",
      phone: "+91 11 4567 8900",
      rating: 4.5,
      reviewCount: 127,
      distance: "2.3 km",
      coordinates: { lat: 28.6315, lng: 77.2167 },
      timings: "10:00 AM - 9:00 PM",
      services: ["Hair", "Skin", "Makeup", "Nails"],
      isPopular: true
    },
    {
      id: 2,
      name: "Lakme Salon - Khan Market",
      address: "Shop No. 42, Khan Market, New Delhi - 110003",
      phone: "+91 11 2461 7890",
      rating: 4.3,
      reviewCount: 89,
      distance: "3.7 km",
      coordinates: { lat: 28.5984, lng: 77.2319 },
      timings: "9:30 AM - 8:30 PM",
      services: ["Hair", "Skin", "Makeup"]
    },
    {
      id: 3,
      name: "Lakme Salon - Saket",
      address: "A-4, District Centre, Saket, New Delhi - 110017",
      phone: "+91 11 4123 5678",
      rating: 4.7,
      reviewCount: 203,
      distance: "8.1 km",
      coordinates: { lat: 28.5245, lng: 77.2066 },
      timings: "10:00 AM - 9:30 PM",
      services: ["Hair", "Skin", "Makeup", "Nails", "Cosmetology"]
    }
  ];

  const filteredSalons = mockSalons?.filter(salon =>
    salon?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    salon?.address?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const handleSalonSelect = (salon) => {
    onSalonSelect(salon);
  };

  return (
    <div className="space-y-6">
      {/* Search and View Toggle */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search by location, area, or pin code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full"
          />
        </div>
        <div className="flex bg-muted rounded-lg p-1">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
              viewMode === 'list' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="List" size={16} />
            <span className="hidden sm:inline">List</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
              viewMode === 'map' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Map" size={16} />
            <span className="hidden sm:inline">Map</span>
          </button>
        </div>
      </div>
      {/* Map View */}
      {viewMode === 'map' && (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="h-64 sm:h-80">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Salon Locations"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=28.6315,77.2167&z=12&output=embed"
              className="border-0"
            />
          </div>
        </div>
      )}
      {/* Salon List */}
      <div className="space-y-4">
        {filteredSalons?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="MapPin" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
              No salons found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or location.
            </p>
          </div>
        ) : (
          filteredSalons?.map((salon) => (
            <div
              key={salon?.id}
              className={`bg-card border rounded-lg p-4 cursor-pointer transition-smooth hover:shadow-card ${
                selectedSalon?.id === salon?.id
                  ? 'border-primary bg-secondary/20' :'border-border hover:border-primary/50'
              }`}
              onClick={() => handleSalonSelect(salon)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading font-semibold text-foreground">
                      {salon?.name}
                    </h3>
                    {salon?.isPopular && (
                      <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {salon?.address}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    <Icon name="Star" size={14} className="text-accent fill-current" />
                    <span className="text-sm font-medium text-foreground">
                      {salon?.rating}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({salon?.reviewCount})
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="Navigation" size={12} />
                    <span>{salon?.distance}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Icon name="Phone" size={14} />
                  <span>{salon?.phone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Clock" size={14} />
                  <span>{salon?.timings}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {salon?.services?.map((service, index) => (
                    <span
                      key={index}
                      className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </div>
                <Button
                  variant={selectedSalon?.id === salon?.id ? "default" : "outline"}
                  size="sm"
                  onClick={(e) => {
                    e?.stopPropagation();
                    handleSalonSelect(salon);
                  }}
                >
                  {selectedSalon?.id === salon?.id ? 'Selected' : 'Select'}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SalonSelector;