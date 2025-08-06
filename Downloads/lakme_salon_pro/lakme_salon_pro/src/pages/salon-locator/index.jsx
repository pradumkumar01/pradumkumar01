import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import Footer from '../homepage/components/Footer';

const SalonLocator = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [salons] = useState([
    {
      id: 1,
      name: 'Lakme Salon - Connaught Place',
      address: 'B-Block, Connaught Place, New Delhi, 110001',
      phone: '+91 98765 43210',
      rating: 4.8,
      reviews: 234,
      distance: '0.8 km',
      hours: '10:00 AM - 9:00 PM',
      services: ['Hair Cut', 'Facial', 'Manicure', 'Pedicure'],
      amenities: ['Parking', 'AC', 'WiFi'],
      image: '/assets/images/salon1.jpg',
      lat: 28.6315,
      lng: 77.2167
    },
    {
      id: 2,
      name: 'Lakme Salon - Khan Market',
      address: '45, Khan Market, New Delhi, 110003',
      phone: '+91 98765 43211',
      rating: 4.6,
      reviews: 189,
      distance: '2.1 km',
      hours: '9:30 AM - 8:30 PM',
      services: ['Hair Styling', 'Bridal Makeup', 'Spa'],
      amenities: ['Parking', 'AC'],
      image: '/assets/images/salon2.jpg',
      lat: 28.6304,
      lng: 77.2177
    },
    {
      id: 3,
      name: 'Lakme Salon - Saket',
      address: 'Select City Walk Mall, Saket, New Delhi, 110017',
      phone: '+91 98765 43212',
      rating: 4.9,
      reviews: 312,
      distance: '5.4 km',
      hours: '11:00 AM - 10:00 PM',
      services: ['Complete Makeover', 'Hair Treatment', 'Nail Art'],
      amenities: ['Parking', 'AC', 'WiFi', 'Wheelchair Access'],
      image: '/assets/images/salon3.jpg',
      lat: 28.5245,
      lng: 77.2066
    }
  ]);
  const [filteredSalons, setFilteredSalons] = useState(salons);

  useEffect(() => {
    // Filter salons based on search query
    if (searchQuery?.trim()) {
      const filtered = salons?.filter(salon =>
        salon?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        salon?.address?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        salon?.services?.some(service => 
          service?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        )
      );
      setFilteredSalons(filtered);
    } else {
      setFilteredSalons(salons);
    }
  }, [searchQuery, salons]);

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    if (navigator?.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude
          });
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoadingLocation(false);
        }
      );
    } else {
      setIsLoadingLocation(false);
    }
  };

  const SalonCard = ({ salon, onClick }) => (
    <div 
      className="bg-card rounded-lg shadow-card overflow-hidden cursor-pointer hover:shadow-modal transition-smooth"
      onClick={() => onClick?.(salon)}
    >
      <div className="aspect-video bg-muted relative">
        <img 
          src="/assets/images/no_image.png" 
          alt={salon?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={12} className="fill-warning text-warning" />
            <span className="text-xs font-medium">{salon?.rating}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
          {salon?.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">{salon?.address}</p>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name="MapPin" size={14} />
            <span>{salon?.distance}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>{salon?.hours}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {salon?.services?.slice(0, 3)?.map((service, idx) => (
            <span 
              key={idx}
              className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
            >
              {service}
            </span>
          ))}
          {salon?.services?.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{salon?.services?.length - 3} more
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Icon name="Phone" size={14} />
            Call
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Icon name="Navigation" size={14} />
            Directions
          </Button>
          <Button size="sm" className="flex-1">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );

  const MapView = () => (
    <div className="bg-muted rounded-lg h-96 md:h-full flex items-center justify-center relative">
      <div className="text-center">
        <Icon name="Map" size={48} className="text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Interactive map view</p>
        <p className="text-sm text-muted-foreground mt-2">
          {filteredSalons?.length} salons found
        </p>
      </div>
      
      {/* Mock salon markers */}
      <div className="absolute top-4 left-4 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
        1
      </div>
      <div className="absolute top-12 right-8 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
        2
      </div>
      <div className="absolute bottom-8 left-8 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
        3
      </div>
    </div>
  );

  const SalonDetail = ({ salon, onClose }) => (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-modal max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src="/assets/images/no_image.png" 
            alt={salon?.name}
            className="w-full h-48 object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm hover:bg-background"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>
        <div className="p-6">
          <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
            {salon?.name}
          </h2>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={16} className="fill-warning text-warning" />
              <span className="font-medium">{salon?.rating}</span>
              <span className="text-muted-foreground">({salon?.reviews} reviews)</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="MapPin" size={16} />
              <span>{salon?.distance}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Icon name="MapPin" size={16} className="text-muted-foreground mt-0.5" />
                  <span className="text-sm">{salon?.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} className="text-muted-foreground" />
                  <span className="text-sm">{salon?.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <span className="text-sm">{salon?.hours}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Services</h3>
              <div className="flex flex-wrap gap-2">
                {salon?.services?.map((service, idx) => (
                  <span 
                    key={idx}
                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {salon?.amenities?.map((amenity, idx) => (
                  <span 
                    key={idx}
                    className="bg-accent/20 text-accent-foreground px-3 py-1 rounded-full text-sm"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-6 pt-4 border-t border-border">
            <Button className="flex-1">
              <Icon name="Calendar" size={16} />
              Book Appointment
            </Button>
            <Button variant="outline">
              <Icon name="Phone" size={16} />
              Call Now
            </Button>
            <Button variant="outline">
              <Icon name="Navigation" size={16} />
              Get Directions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="font-heading font-bold text-4xl text-foreground mb-4">
            Find Your Nearest Lakme Salon
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover premium beauty services at Lakme Salons near you. 
            Book appointments, view services, and get directions instantly.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Search by city, area, or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full"
              />
            </div>
            <Button
              variant="outline"
              onClick={getCurrentLocation}
              loading={isLoadingLocation}
              className="shrink-0"
            >
              <Icon name="MapPin" size={16} />
              Near Me
            </Button>
          </div>

          {/* View Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {filteredSalons?.length} salons found
              </span>
            </div>
            <div className="flex bg-muted rounded-lg p-1">
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'map' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="Map" size={16} className="inline mr-2" />
                Map
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="List" size={16} className="inline mr-2" />
                List
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto">
          {viewMode === 'map' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
              <div className="lg:col-span-2">
                <MapView />
              </div>
              <div className="space-y-4 overflow-y-auto">
                {filteredSalons?.map((salon) => (
                  <SalonCard 
                    key={salon?.id} 
                    salon={salon} 
                    onClick={setSelectedSalon}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSalons?.map((salon) => (
                <SalonCard 
                  key={salon?.id} 
                  salon={salon} 
                  onClick={setSelectedSalon}
                />
              ))}
            </div>
          )}
        </div>

        {/* Empty State */}
        {filteredSalons?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="MapPin" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-foreground mb-2">No salons found</p>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or browse all locations
            </p>
            <Button onClick={() => setSearchQuery('')}>
              View All Salons
            </Button>
          </div>
        )}
      </main>
      <Footer />
      {/* Salon Detail Modal */}
      {selectedSalon && (
        <SalonDetail 
          salon={selectedSalon} 
          onClose={() => setSelectedSalon(null)} 
        />
      )}
    </div>
  );
};

export default SalonLocator;