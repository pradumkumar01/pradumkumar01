import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterSidebar = ({ isOpen, onClose, filters, onFiltersChange }) => {
  const priceRanges = [
    { label: '₹0 - ₹1,000', value: [0, 1000] },
    { label: '₹1,000 - ₹2,500', value: [1000, 2500] },
    { label: '₹2,500 - ₹5,000', value: [2500, 5000] },
    { label: '₹5,000+', value: [5000, 10000] }
  ];

  const durations = [
    { label: 'Under 30 min', value: '30' },
    { label: '30-60 min', value: '60' },
    { label: '60-90 min', value: '90' },
    { label: '90+ min', value: '120' }
  ];

  const locations = [
    { label: 'Bandra', value: 'Bandra' },
    { label: 'Andheri', value: 'Andheri' },
    { label: 'Mumbai Central', value: 'Mumbai Central' },
    { label: 'Juhu', value: 'Juhu' },
    { label: 'Powai', value: 'Powai' },
    { label: 'Malad', value: 'Malad' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    onFiltersChange({
      priceRange: [0, 10000],
      duration: 'all',
      location: 'all',
      rating: 0,
      sortBy: 'popularity'
    });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-full lg:h-auto w-80 lg:w-64 bg-background border-r lg:border-r-0 border-border z-50 lg:z-auto
        transform lg:transform-none transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-lg font-semibold text-foreground">
              Filters
            </h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear
              </Button>
              <button
                onClick={onClose}
                className="lg:hidden p-1 hover:bg-muted rounded-lg transition-smooth"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h4 className="font-medium text-foreground mb-3">Price Range</h4>
            <div className="space-y-2">
              {priceRanges?.map((range) => (
                <label
                  key={range?.label}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="priceRange"
                    checked={
                      filters?.priceRange?.[0] === range?.value?.[0] &&
                      filters?.priceRange?.[1] === range?.value?.[1]
                    }
                    onChange={() => handleFilterChange('priceRange', range?.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    {range?.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="mb-6">
            <h4 className="font-medium text-foreground mb-3">Duration</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="duration"
                  checked={filters?.duration === 'all'}
                  onChange={() => handleFilterChange('duration', 'all')}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">Any Duration</span>
              </label>
              {durations?.map((duration) => (
                <label
                  key={duration?.value}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="duration"
                    checked={filters?.duration === duration?.value}
                    onChange={() => handleFilterChange('duration', duration?.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    {duration?.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <h4 className="font-medium text-foreground mb-3">Salon Location</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="location"
                  checked={filters?.location === 'all'}
                  onChange={() => handleFilterChange('location', 'all')}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">All Locations</span>
              </label>
              {locations?.map((location) => (
                <label
                  key={location?.value}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="location"
                    checked={filters?.location === location?.value}
                    onChange={() => handleFilterChange('location', location?.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    {location?.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <h4 className="font-medium text-foreground mb-3">Minimum Rating</h4>
            <div className="space-y-2">
              {[0, 3, 4, 4.5]?.map((rating) => (
                <label
                  key={rating}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="rating"
                    checked={filters?.rating === rating}
                    onChange={() => handleFilterChange('rating', rating)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <div className="flex items-center space-x-1">
                    {rating === 0 ? (
                      <span className="text-sm text-muted-foreground">Any Rating</span>
                    ) : (
                      <>
                        <span className="text-sm text-muted-foreground">{rating}</span>
                        <Icon name="Star" size={14} className="text-accent fill-current" />
                        <span className="text-sm text-muted-foreground">& above</span>
                      </>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;