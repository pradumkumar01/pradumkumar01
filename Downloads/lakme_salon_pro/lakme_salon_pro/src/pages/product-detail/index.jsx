import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import RelatedProducts from './components/RelatedProducts';
import RecentlyViewed from './components/RecentlyViewed';
import Icon from '../../components/AppIcon';

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const productId = searchParams?.get('id') || '1';
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock product data
  const mockProducts = {
    '1': {
      id: '1',
      name: 'Olaplex No. 6 Bond Smoother',
      brand: 'Olaplex',
      price: 2850,
      originalPrice: 3200,
      rating: 4.5,
      reviewCount: 127,
      verifiedPurchases: 98,
      inStock: true,
      stockCount: 8,
      maxQuantity: 5,
      skinTypes: ['All Hair Types', 'Damaged Hair', 'Color-Treated'],
      variantType: 'Size',
      variants: [
        { id: 'v1', name: '100ml', price: 2850 },
        { id: 'v2', name: '200ml', price: 4200 }
      ],
      images: [
        'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
        'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500'
      ],
      description: `Olaplex No. 6 Bond Smoother is a leave-in reparative styling creme that eliminates frizz, hydrates, and protects all hair types. This concentrated smoothing cream is excellent for all hair types including colored and chemically treated hair. It strengthens, hydrates, moisturizes, and speeds up blow-dry times while smoothing and eliminating frizz and flyaways for up to 72 hours.`,
      keyIngredients: [
        { name: 'Bis-Aminopropyl Diglycol Dimaleate', benefit: 'Patented bond-building technology that repairs damaged hair' },
        { name: 'Coconut Oil', benefit: 'Deeply moisturizes and adds shine' },
        { name: 'Sunflower Seed Oil', benefit: 'Provides UV protection and antioxidants' }
      ],
      fullIngredientsList: 'Water, Cetearyl Alcohol, PPG-3 Benzyl Ether Myristate, Caprylic/Capric Triglyceride, Cetyl Alcohol, Octyldodecyl Ricinoleate, Quaternium-91, Cetrimonium Methosulfate, Divinyldimethicone/Dimethicone Copolymer, Behentrimonium Chloride, Glycerin, Cetyl Esters, Bis-Aminopropyl Diglycol Dimaleate, Fragrance, Polysilicone-15, Caprylyl Methicone, Decyl Oleate, Lactic Acid, Amodimethicone, Polyquaternium-37, Isododecane, C11-15 Pareth-7, Glycine, Sodium Benzoate, Hydroxypropyl Guar, Trideceth-12, Limonene, Citral, Hydroxycitronellal, Hexyl Cinnamal, Citronellol, Iodopropynyl Butylcarbamate, Alpha-Isomethyl Ionone.',
      usageInstructions: [
        'Apply a small amount to damp, towel-dried hair',
        'Work through hair from mid-length to ends',
        'Comb through for even distribution',
        'Style as desired - air dry or blow dry',
        'Use 2-3 times per week for best results'
      ],
      tips: [
        'Start with a small amount - a little goes a long way',
        'Focus on the most damaged areas of your hair',
        'Can be used on wet or dry hair for touch-ups',
        'Safe for daily use on all hair types'
      ],
      ratingBreakdown: { 5: 78, 4: 32, 3: 12, 2: 3, 1: 2 },
      reviews: [
        {
          id: 'r1',
          userName: 'Priya Sharma',
          rating: 5,
          date: '2025-01-15',
          comment: 'Amazing product! My hair feels so much smoother and healthier after just one use. The frizz control lasts all day even in humid weather.',
          verified: true,
          helpfulCount: 12,
          images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=100']
        },
        {
          id: 'r2',
          userName: 'Anita Desai',
          rating: 4,
          date: '2025-01-10',
          comment: 'Good product for damaged hair. I noticed less breakage after using it for a month. The only downside is the price, but it\'s worth it for the quality.',
          verified: true,
          helpfulCount: 8
        },
        {
          id: 'r3',
          userName: 'Meera Patel',
          rating: 5,
          date: '2025-01-05',
          comment: 'This has become a staple in my hair care routine. My color-treated hair looks vibrant and feels soft. Highly recommend!',
          verified: true,
          helpfulCount: 15
        }
      ]
    },
    '2': {
      id: '2',
      name: 'Lakme Absolute Hydra Pro Serum',
      brand: 'Lakme',
      price: 1250,
      originalPrice: 1500,
      rating: 4.2,
      reviewCount: 89,
      verifiedPurchases: 76,
      inStock: true,
      stockCount: 15,
      maxQuantity: 3,
      skinTypes: ['Dry', 'Combination', 'Sensitive'],
      images: [
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500'
      ],
      description: `Lakme Absolute Hydra Pro Serum is an intensive hydrating serum that provides deep moisture to your skin. Formulated with hyaluronic acid and vitamin E, it helps restore skin's natural moisture barrier while providing long-lasting hydration for up to 24 hours.`,
      keyIngredients: [
        { name: 'Hyaluronic Acid', benefit: 'Provides intense hydration and plumps the skin' },
        { name: 'Vitamin E', benefit: 'Antioxidant protection and skin nourishment' },
        { name: 'Glycerin', benefit: 'Maintains skin moisture and softness' }
      ],
      usageInstructions: [
        'Cleanse your face thoroughly','Apply 2-3 drops to clean, dry skin','Gently pat and massage into skin','Follow with moisturizer','Use twice daily for best results'
      ],
      tips: [
        'Use on slightly damp skin for better absorption','Layer under your regular moisturizer','Perfect for use under makeup'
      ],
      ratingBreakdown: { 5: 45, 4: 28, 3: 12, 2: 3, 1: 1 },
      reviews: [
        {
          id: 'r4',userName: 'Kavya Singh',rating: 4,date: '2025-01-12',comment: 'Nice hydrating serum. My skin feels plump and moisturized. Good value for money compared to international brands.',
          verified: true,
          helpfulCount: 6
        }
      ]
    }
  };

  const mockRelatedProducts = [
    {
      id: '3',
      name: 'Lakme 9 to 5 Matte Foundation',
      brand: 'Lakme',
      price: 650,
      originalPrice: 750,
      rating: 4.1,
      reviewCount: 234,
      image: 'https://images.unsplash.com/photo-1631214540242-3cd8c4b6b9e5?w=300',
      skinTypes: ['Oily', 'Combination'],
      inStock: true,
      discount: 13
    },
    {
      id: '4',
      name: 'Olaplex No. 3 Hair Perfector',
      brand: 'Olaplex',
      price: 2200,
      rating: 4.6,
      reviewCount: 156,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300',
      skinTypes: ['All Hair Types'],
      inStock: true
    },
    {
      id: '5',
      name: 'Lakme Absolute Skin Gloss',
      brand: 'Lakme',
      price: 890,
      originalPrice: 1100,
      rating: 4.3,
      reviewCount: 78,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300',
      skinTypes: ['All Skin Types'],
      inStock: true,
      discount: 19
    },
    {
      id: '6',
      name: 'Olaplex No. 4 Bond Maintenance Shampoo',
      brand: 'Olaplex',
      price: 2650,
      rating: 4.4,
      reviewCount: 203,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300',
      skinTypes: ['All Hair Types'],
      inStock: false
    },
    {
      id: '7',
      name: 'Lakme Absolute Hydra Pro Moisturizer',
      brand: 'Lakme',
      price: 1450,
      rating: 4.2,
      reviewCount: 92,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300',
      skinTypes: ['Dry', 'Sensitive'],
      inStock: true
    }
  ];

  const mockRecentlyViewed = [
    {
      id: '8',
      name: 'Lakme Eyeconic Kajal',
      price: 250,
      originalPrice: 300,
      rating: 4.0,
      image: 'https://images.unsplash.com/photo-1631214540242-3cd8c4b6b9e5?w=150'
    },
    {
      id: '9',
      name: 'Olaplex No. 5 Conditioner',
      price: 2400,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=150'
    },
    {
      id: '10',
      name: 'Lakme Sun Expert Sunscreen',
      price: 320,
      rating: 4.1,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=150'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      const selectedProduct = mockProducts?.[productId] || mockProducts?.['1'];
      setProduct(selectedProduct);
      setRelatedProducts(mockRelatedProducts);
      setRecentlyViewed(mockRecentlyViewed);
      setIsLoading(false);

      // Add to recently viewed
      const recentItems = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      const updatedRecent = [selectedProduct, ...recentItems?.filter(item => item?.id !== selectedProduct?.id)]?.slice(0, 10);
      localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecent));
    }, 500);
  }, [productId]);

  const handleAddToCart = (productData) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItem = cartItems?.find(item => 
      item?.id === productData?.id && 
      item?.selectedVariant?.id === productData?.selectedVariant?.id
    );

    if (existingItem) {
      existingItem.quantity += productData?.quantity;
    } else {
      cartItems?.push({
        ...productData,
        addedAt: new Date()?.toISOString()
      });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Show success message (you can implement a toast notification here)
    alert(`${productData?.name} added to cart!`);
  };

  const handleAddToWishlist = (productData) => {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems') || '[]');
    const exists = wishlistItems?.find(item => item?.id === productData?.id);

    if (!exists) {
      wishlistItems?.push({
        ...productData,
        addedAt: new Date()?.toISOString()
      });
      localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
      alert(`${productData?.name} added to wishlist!`);
    } else {
      alert('Product already in wishlist!');
    }
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/product-detail' },
    { label: product?.name || 'Product Details', path: `/product-detail?id=${productId}` }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-muted-foreground">Loading product details...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <Icon name="Package" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
              Product Not Found
            </h2>
            <p className="text-muted-foreground mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-smooth"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4">
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductImageGallery 
              images={product?.images} 
              productName={product?.name} 
            />
          </div>

          {/* Product Information */}
          <div>
            <ProductInfo
              product={product}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
            />
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mb-12">
          <ProductTabs product={product} />
        </div>

        {/* Related Products */}
        <div className="mb-8">
          <RelatedProducts 
            products={relatedProducts}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
      {/* Recently Viewed */}
      <RecentlyViewed products={recentlyViewed} />
    </div>
  );
};

export default ProductDetail;