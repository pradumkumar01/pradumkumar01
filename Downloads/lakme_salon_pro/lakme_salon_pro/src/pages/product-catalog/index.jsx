import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import ProductCard from './components/ProductCard';
import ProductFilter from './components/ProductFilter';
import RecentlyViewed from './components/RecentlyViewed';
import QuickViewModal from './components/QuickViewModal';

const ProductCatalog = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    brand: 'all',
    skinType: 'all',
    productType: 'all',
    rating: 0,
    availability: 'all',
    sortBy: 'popularity'
  });

  const categories = [
    { name: 'All', icon: 'Grid', count: 156 },
    { name: 'Hair Care', icon: 'Scissors', count: 42 },
    { name: 'Skincare', icon: 'Sparkles', count: 38 },
    { name: 'Makeup', icon: 'Palette', count: 45 },
    { name: 'Tools', icon: 'Settings', count: 31 }
  ];

  const mockProducts = [
    {
      id: 1,
      name: "Lakme Absolute Perfect Radiance Skin Brightening Day Creme",
      category: "Skincare",
      brand: "Lakme",
      price: 850,
      originalPrice: 1200,
      rating: 4.3,
      reviewCount: 245,
      images: ["/assets/images/no_image.png"],
      inStock: true,
      stockCount: 15,
      skinTypes: ["Normal", "Dry"],
      productType: "Moisturizer",
      description: "A lightweight day cream that brightens and evens skin tone while providing all-day hydration.",
      benefits: ["Skin brightening", "UV protection", "Long-lasting hydration"],
      isOnSale: true
    },
    {
      id: 2,
      name: "Lakme Enrich Satin Lipstick",
      category: "Makeup",
      brand: "Lakme",
      price: 450,
      originalPrice: 600,
      rating: 4.6,
      reviewCount: 189,
      images: ["/assets/images/no_image.png"],
      inStock: true,
      stockCount: 25,
      productType: "Lipstick",
      description: "Creamy, long-lasting lipstick with rich color payoff and comfortable wear.",
      benefits: ["Long-lasting", "Moisturizing", "Rich color"],
      isOnSale: true
    },
    {
      id: 3,
      name: "Lakme Teknia Deep Care Shampoo",
      category: "Hair Care",
      brand: "Lakme",
      price: 650,
      originalPrice: 650,
      rating: 4.2,
      reviewCount: 156,
      images: ["/assets/images/no_image.png"],
      inStock: true,
      stockCount: 30,
      productType: "Shampoo",
      description: "Nourishing shampoo for dry and damaged hair with keratin and argan oil.",
      benefits: ["Deep nourishment", "Damage repair", "Shine enhancement"],
      isOnSale: false
    },
    {
      id: 4,
      name: "Professional Makeup Brush Set",
      category: "Tools",
      brand: "Lakme",
      price: 1200,
      originalPrice: 1500,
      rating: 4.5,
      reviewCount: 132,
      images: ["/assets/images/no_image.png"],
      inStock: true,
      stockCount: 8,
      productType: "Brush Set",
      description: "Complete set of professional makeup brushes for flawless application.",
      benefits: ["Professional quality", "Soft bristles", "Durable"],
      isOnSale: true
    },
    {
      id: 5,
      name: "Lakme 9 to 5 Primer + Matte Powder Foundation",
      category: "Makeup",
      brand: "Lakme",
      price: 750,
      originalPrice: 750,
      rating: 4.4,
      reviewCount: 198,
      images: ["/assets/images/no_image.png"],
      inStock: false,
      stockCount: 0,
      skinTypes: ["Oily", "Combination"],
      productType: "Foundation",
      description: "Mattifying foundation perfect for long office hours with primer benefits.",
      benefits: ["Matte finish", "Long-lasting", "Oil control"],
      isOnSale: false
    },
    {
      id: 6,
      name: "Lakme Clean-Up Fresh Fairness Face Wash",
      category: "Skincare",
      brand: "Lakme",
      price: 320,
      originalPrice: 400,
      rating: 4.1,
      reviewCount: 167,
      images: ["/assets/images/no_image.png"],
      inStock: true,
      stockCount: 20,
      skinTypes: ["All"],
      productType: "Face Wash",
      description: "Gentle daily face wash that cleanses and brightens the skin.",
      benefits: ["Deep cleansing", "Brightening", "Gentle formula"],
      isOnSale: true
    },
    {
      id: 7,
      name: "Lakme Absolute Argan Oil Radiance Oil-in-Serum",
      category: "Skincare",
      brand: "Lakme",
      price: 1100,
      originalPrice: 1100,
      rating: 4.7,
      reviewCount: 143,
      images: ["/assets/images/no_image.png"],
      inStock: true,
      stockCount: 12,
      skinTypes: ["Dry", "Normal"],
      productType: "Serum",
      description: "Luxurious face serum with argan oil for radiant and nourished skin.",
      benefits: ["Deep nourishment", "Radiance", "Anti-aging"],
      isOnSale: false
    },
    {
      id: 8,
      name: "Lakme Teknia Color Stay Conditioner",
      category: "Hair Care",
      brand: "Lakme",
      price: 580,
      originalPrice: 720,
      rating: 4.3,
      reviewCount: 178,
      images: ["/assets/images/no_image.png"],
      inStock: true,
      stockCount: 18,
      productType: "Conditioner",
      description: "Color-protecting conditioner that maintains vibrancy of colored hair.",
      benefits: ["Color protection", "Deep conditioning", "Smooth texture"],
      isOnSale: true
    }
  ];

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts;

    // Category filter
    if (activeCategory !== 'All') {
      filtered = filtered?.filter(product => product?.category === activeCategory);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(product =>
        product?.name?.toLowerCase()?.includes(query) ||
        product?.brand?.toLowerCase()?.includes(query) ||
        product?.description?.toLowerCase()?.includes(query) ||
        product?.benefits?.some(benefit => benefit?.toLowerCase()?.includes(query))
      );
    }

    // Apply filters
    filtered = filtered?.filter(product => {
      // Price range
      if (product?.price < filters?.priceRange?.[0] || product?.price > filters?.priceRange?.[1]) {
        return false;
      }

      // Brand
      if (filters?.brand !== 'all' && product?.brand !== filters?.brand) {
        return false;
      }

      // Skin type
      if (filters?.skinType !== 'all' && product?.skinTypes && !product?.skinTypes?.includes(filters?.skinType)) {
        return false;
      }

      // Product type
      if (filters?.productType !== 'all' && product?.productType !== filters?.productType) {
        return false;
      }

      // Rating
      if (filters?.rating > 0 && product?.rating < filters?.rating) {
        return false;
      }

      // Availability
      if (filters?.availability === 'in-stock' && !product?.inStock) {
        return false;
      }
      if (filters?.availability === 'sale' && !product?.isOnSale) {
        return false;
      }

      return true;
    });

    // Sorting
    switch (filters?.sortBy) {
      case 'price-low':
        filtered = filtered?.sort((a, b) => a?.price - b?.price);
        break;
      case 'price-high':
        filtered = filtered?.sort((a, b) => b?.price - a?.price);
        break;
      case 'rating':
        filtered = filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'newest':
        filtered = filtered?.sort((a, b) => b?.id - a?.id);
        break;
      default:
        filtered = filtered?.sort((a, b) => b?.reviewCount - a?.reviewCount);
    }

    return filtered;
  }, [activeCategory, searchQuery, filters, mockProducts]);

  const handleLoadMore = () => {
    setVisibleProducts(prev => prev + 12);
  };

  const handleProductClick = (product) => {
    navigate('/product-detail', { state: { product } });
  };

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, { ...product, quantity: 1, id: Date.now() }]);
  };

  const handleToggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev?.find(item => item?.id === product?.id);
      if (exists) {
        return prev?.filter(item => item?.id !== product?.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
  };

  const isInWishlist = (productId) => {
    return wishlist?.some(item => item?.id === productId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-success/10 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Product Catalog
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover Lakme's premium beauty products designed to enhance your natural radiance
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
                placeholder="Search products, brands, or benefits..."
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
          <ProductFilter
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
                {filteredProducts?.length} products found
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
                  <option value="rating">Customer Rating</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {filteredProducts?.slice(0, visibleProducts)?.map((product) => (
                <ProductCard
                  key={product?.id}
                  product={product}
                  onProductClick={handleProductClick}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickView={handleQuickView}
                  isInWishlist={isInWishlist(product?.id)}
                />
              ))}
            </div>

            {/* No Results */}
            {filteredProducts?.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                    setFilters({
                      priceRange: [0, 5000],
                      brand: 'all',
                      skinType: 'all',
                      productType: 'all',
                      rating: 0,
                      availability: 'all',
                      sortBy: 'popularity'
                    });
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}

            {/* Load More */}
            {filteredProducts?.length > visibleProducts && (
              <div className="text-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLoadMore}
                  iconName="ChevronDown"
                  iconPosition="right"
                  className="px-8"
                >
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Recently Viewed */}
        <RecentlyViewed 
          products={mockProducts?.slice(0, 4)} 
          onProductClick={handleProductClick}
        />
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onViewFullDetails={() => handleProductClick(selectedProduct)}
          isInWishlist={isInWishlist(selectedProduct?.id)}
        />
      )}
    </div>
  );
};

export default ProductCatalog;