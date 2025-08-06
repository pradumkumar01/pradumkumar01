import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductFilter = ({ isOpen, onClose, filters, onFiltersChange }) => {
  const priceRanges = [
    { label: '₹0 - ₹500', value: [0, 500] },
    { label: '₹500 - ₹1,000', value: [500, 1000] },
    { label: '₹1,000 - ₹2,000', value: [1000, 2000] },
    { label: '₹2,000+', value: [2000, 5000] }
  ];

  const brands = [
    { label: 'Lakme', value: 'Lakme' },
    { label: 'Other Brands', value: 'Other' }
  ];

  const skinTypes = [
    { label: 'All Skin Types', value: 'All' },
    { label: 'Oily', value: 'Oily' },
    { label: 'Dry', value: 'Dry' },
    { label: 'Normal', value: 'Normal' },
    { label: 'Combination', value: 'Combination' },
    { label: 'Sensitive', value: 'Sensitive' }
  ];

  const productTypes = [
    { label: 'Face Wash', value: 'Face Wash' },
    { label: 'Moisturizer', value: 'Moisturizer' },
    { label: 'Serum', value: 'Serum' },
    { label: 'Foundation', value: 'Foundation' },
    { label: 'Lipstick', value: 'Lipstick' },
    { label: 'Shampoo', value: 'Shampoo' },
    { label: 'Conditioner', value: 'Conditioner' },
    { label: 'Brush Set', value: 'Brush Set' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    onFiltersChange({
      priceRange: [0, 5000],
      brand: 'all',
      skinType: 'all',
      productType: 'all',
      rating: 0,
      availability: 'all',
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

          {/* Brand */}
          <div className="mb-6">
            <h4 className="font-medium text-foreground mb-3">Brand</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="brand"
                  checked={filters?.brand === 'all'}
                  onChange={() => handleFilterChange('brand', 'all')}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">All Brands</span>
              </label>
              {brands?.map((brand) => (
                <label
                  key={brand?.value}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="brand"
                    checked={filters?.brand === brand?.value}
                    onChange={() => handleFilterChange('brand', brand?.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    {brand?.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Skin Type */}
          <div className="mb-6">
            <h4 className="font-medium text-foreground mb-3">Skin Type</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="skinType"
                  checked={filters?.skinType === 'all'}
                  onChange={() => handleFilterChange('skinType', 'all')}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">Any Skin Type</span>
              </label>
              {skinTypes?.map((type) => (
                <label
                  key={type?.value}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="skinType"
                    checked={filters?.skinType === type?.value}
                    onChange={() => handleFilterChange('skinType', type?.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    {type?.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Product Type */}
          <div className="mb-6">
            <h4 className="font-medium text-foreground mb-3">Product Type</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="productType"
                  checked={filters?.productType === 'all'}
                  onChange={() => handleFilterChange('productType', 'all')}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">All Types</span>
              </label>
              {productTypes?.map((type) => (
                <label
                  key={type?.value}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="productType"
                    checked={filters?.productType === type?.value}
                    onChange={() => handleFilterChange('productType', type?.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    {type?.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <h4 className="font-medium text-foreground mb-3">Customer Rating</h4>
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

          {/* Availability */}
          <div className="mb-6">
            <h4 className="font-medium text-foreground mb-3">Availability</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="availability"
                  checked={filters?.availability === 'all'}
                  onChange={() => handleFilterChange('availability', 'all')}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">All Products</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="availability"
                  checked={filters?.availability === 'in-stock'}
                  onChange={() => handleFilterChange('availability', 'in-stock')}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">In Stock</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="availability"
                  checked={filters?.availability === 'sale'}
                  onChange={() => handleFilterChange('availability', 'sale')}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">On Sale</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilter;