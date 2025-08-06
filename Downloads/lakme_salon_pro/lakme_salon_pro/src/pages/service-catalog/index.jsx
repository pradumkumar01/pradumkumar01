import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import FilterSidebar from './components/FilterSidebar';
import ServiceCard from './components/ServiceCard';
import PopularServices from './components/PopularServices';
import LoadMoreButton from './components/LoadMoreButton';

const ServiceCatalog = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleServices, setVisibleServices] = useState(12);
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    duration: 'all',
    location: 'all',
    rating: 0,
    sortBy: 'popularity'
  });

  const categories = [
    { name: 'All', icon: 'Grid', count: 48 },
    { name: 'Hair', icon: 'Scissors', count: 12 },
    { name: 'Skin', icon: 'Sparkles', count: 10 },
    { name: 'Makeup', icon: 'Palette', count: 8 },
    { name: 'Nails', icon: 'Hand', count: 7 },
    { name: 'Cosmetology', icon: 'Zap', count: 11 }
  ];

  const mockServices = [
    {
      id: 1,
      name: "Hair Cut & Styling",
      category: "Hair",
      duration: "60 min",
      startingPrice: 800,
      rating: 4.8,
      reviewCount: 245,
      image: "/assets/images/no_image.png",
      description: "Professional haircut with styling consultation",
      popular: true,
      location: "Bandra",
      benefits: ["Expert consultation", "Premium products", "Aftercare tips"]
    },
    {
      id: 2,
      name: "Hydrating Facial",
      category: "Skin",
      duration: "75 min",
      startingPrice: 1500,
      rating: 4.9,
      reviewCount: 189,
      image: "/assets/images/no_image.png",
      description: "Deep hydrating treatment for glowing skin",
      popular: true,
      location: "Andheri",
      benefits: ["Deep hydration", "Glowing skin", "Anti-aging effects"]
    },
    {
      id: 3,
      name: "Bridal Makeup",
      category: "Makeup",
      duration: "120 min",
      startingPrice: 3500,
      rating: 4.7,
      reviewCount: 156,
      image: "/assets/images/no_image.png",
      description: "Complete bridal makeup for your special day",
      popular: true,
      location: "Mumbai Central",
      benefits: ["HD makeup", "Long lasting", "Trial session included"]
    },
    {
      id: 4,
      name: "Gel Manicure",
      category: "Nails",
      duration: "45 min",
      startingPrice: 600,
      rating: 4.6,
      reviewCount: 132,
      image: "/assets/images/no_image.png",
      description: "Long-lasting gel manicure with nail art",
      popular: false,
      location: "Powai",
      benefits: ["Chip resistant", "14 days lasting", "UV protection"]
    },
    {
      id: 5,
      name: "Hair Coloring",
      category: "Hair",
      duration: "180 min",
      startingPrice: 2200,
      rating: 4.5,
      reviewCount: 198,
      image: "/assets/images/no_image.png",
      description: "Professional hair coloring with premium brands",
      popular: false,
      location: "Bandra",
      benefits: ["Ammonia free", "Color protection", "Scalp treatment"]
    },
    {
      id: 6,
      name: "Anti-Aging Facial",
      category: "Skin",
      duration: "90 min",
      startingPrice: 2500,
      rating: 4.8,
      reviewCount: 167,
      image: "/assets/images/no_image.png",
      description: "Advanced anti-aging treatment with latest technology",
      popular: true,
      location: "Juhu",
      benefits: ["Reduces fine lines", "Firms skin", "Brightens complexion"]
    },
    {
      id: 7,
      name: "Party Makeup",
      category: "Makeup",
      duration: "90 min",
      startingPrice: 2000,
      rating: 4.6,
      reviewCount: 143,
      image: "/assets/images/no_image.png",
      description: "Glamorous party makeup for special occasions",
      popular: false,
      location: "Andheri",
      benefits: ["Photo ready", "Waterproof", "Custom look"]
    },
    {
      id: 8,
      name: "Pedicure Deluxe",
      category: "Nails",
      duration: "60 min",
      startingPrice: 900,
      rating: 4.7,
      reviewCount: 178,
      image: "/assets/images/no_image.png",
      description: "Luxurious pedicure with foot massage and treatment",
      popular: false,
      location: "Malad",
      benefits: ["Foot spa", "Callus removal", "Moisturizing treatment"]
    }
  ];

  const filteredServices = useMemo(() => {
    let filtered = mockServices;

    // Category filter
    if (activeCategory !== 'All') {
      filtered = filtered?.filter(service => service?.category === activeCategory);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(service =>
        service?.name?.toLowerCase()?.includes(query) ||
        service?.description?.toLowerCase()?.includes(query) ||
        service?.benefits?.some(benefit => benefit?.toLowerCase()?.includes(query))
      );
    }

    // Price range filter
    filtered = filtered?.filter(service =>
      service?.startingPrice >= filters?.priceRange?.[0] &&
      service?.startingPrice <= filters?.priceRange?.[1]
    );

    // Duration filter
    if (filters?.duration !== 'all') {
      const durationValue = parseInt(filters?.duration);
      filtered = filtered?.filter(service => {
        const serviceDuration = parseInt(service?.duration);
        if (filters?.duration === '30') return serviceDuration <= 30;
        if (filters?.duration === '60') return serviceDuration > 30 && serviceDuration <= 60;
        if (filters?.duration === '90') return serviceDuration > 60 && serviceDuration <= 90;
        if (filters?.duration === '120') return serviceDuration > 90;
        return true;
      });
    }

    // Location filter
    if (filters?.location !== 'all') {
      filtered = filtered?.filter(service => service?.location === filters?.location);
    }

    // Rating filter
    if (filters?.rating > 0) {
      filtered = filtered?.filter(service => service?.rating >= filters?.rating);
    }

    // Sorting
    switch (filters?.sortBy) {
      case 'price-low':
        filtered = filtered?.sort((a, b) => a?.startingPrice - b?.startingPrice);
        break;
      case 'price-high':
        filtered = filtered?.sort((a, b) => b?.startingPrice - a?.startingPrice);
        break;
      case 'rating':
        filtered = filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'duration':
        filtered = filtered?.sort((a, b) => parseInt(a?.duration) - parseInt(b?.duration));
        break;
      default:
        filtered = filtered?.sort((a, b) => b?.reviewCount - a?.reviewCount);
    }

    return filtered;
  }, [activeCategory, searchQuery, filters, mockServices]);

  const handleLoadMore = () => {
    setVisibleServices(prev => prev + 12);
  };

  const handleServiceClick = (service) => {
    navigate('/service-detail', { state: { service } });
  };

  const handleBookNow = (service) => {
    navigate('/booking-system', { state: { selectedService: service } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-success/10 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Service Catalog
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover our comprehensive range of professional beauty treatments designed to enhance your natural beauty
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Icon
                name="Search"
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="text"
                placeholder="Search services, benefits, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="pl-10 pr-4 py-3 w-full"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <Icon name="X" size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            onFiltersChange={setFilters}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Category Tabs & Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              {/* Category Tabs */}
              <div className="flex overflow-x-auto space-x-2 pb-2 w-full sm:w-auto">
                {categories?.map((category) => (
                  <button
                    key={category?.name}
                    onClick={() => setActiveCategory(category?.name)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-smooth ${
                      activeCategory === category?.name
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    }`}
                  >
                    <Icon name={category?.icon} size={16} />
                    <span>{category?.name}</span>
                    <span className="bg-background/20 text-xs px-2 py-0.5 rounded-full">
                      {category?.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden"
                iconName="Filter"
                iconPosition="left"
              >
                Filters
              </Button>
            </div>

            {/* Results Count & Sort */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                {filteredServices?.length} services found
                {activeCategory !== 'All' && ` in ${activeCategory}`}
              </p>

              {/* Sort Dropdown */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select
                  value={filters?.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e?.target?.value }))}
                  className="bg-background border border-border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="duration">Duration</option>
                </select>
              </div>
            </div>

            {/* Popular Services Banner */}
            {activeCategory === 'All' && !searchQuery && (
              <PopularServices
                services={mockServices?.filter(s => s?.popular)}
                onServiceClick={handleServiceClick}
              />
            )}

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {filteredServices?.slice(0, visibleServices)?.map((service) => (
                <ServiceCard
                  key={service?.id}
                  service={service}
                  onViewDetails={handleServiceClick}
                  onBookNow={handleBookNow}
                />
              ))}
            </div>

            {/* No Results */}
            {filteredServices?.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No services found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                    setFilters({
                      priceRange: [0, 10000],
                      duration: 'all',
                      location: 'all',
                      rating: 0,
                      sortBy: 'popularity'
                    });
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}

            {/* Load More */}
            {filteredServices?.length > visibleServices && (
              <LoadMoreButton
                onLoadMore={handleLoadMore}
                hasMore={filteredServices?.length > visibleServices}
              />
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our beauty experts are here to recommend the perfect treatment for your specific needs and preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/booking-system')}
              iconName="MessageCircle"
              iconPosition="left"
            >
              Book Consultation
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/user-dashboard')}
              iconName="Phone"
              iconPosition="left"
            >
              Call Expert
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCatalog;