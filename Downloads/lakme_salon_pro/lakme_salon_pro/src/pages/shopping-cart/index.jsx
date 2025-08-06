import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import EmptyCart from './components/EmptyCart';
import SavedForLater from './components/SavedForLater';
import RecentlyViewed from './components/RecentlyViewed';
import BulkActions from './components/BulkActions';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [recentlyViewedItems, setRecentlyViewedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [discount, setDiscount] = useState(0);

  // Mock cart data
  useEffect(() => {
    const mockCartItems = [
      {
        id: 1,
        name: "Olaplex No. 6 Bond Smoother",
        category: "Hair Care",
        variant: "100ml",
        price: 2850,
        originalPrice: 3200,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop"
      },
      {
        id: 2,
        name: "Lakme Absolute Hydra Pro Serum",
        category: "Skin Care",
        variant: "30ml",
        price: 1299,
        originalPrice: 1499,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop"
      },
      {
        id: 3,
        name: "Lakme 9 to 5 Matte Foundation",
        category: "Makeup",
        variant: "Natural Marble",
        price: 675,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop"
      }
    ];

    const mockSavedItems = [
      {
        id: 4,
        name: "Lakme Eyeconic Kajal",
        price: 225,
        originalPrice: 275,
        image: "https://images.unsplash.com/photo-1583241800698-9c2e8e6b9c7e?w=400&h=400&fit=crop"
      },
      {
        id: 5,
        name: "Lakme Lip Love Chapstick",
        price: 150,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop"
      }
    ];

    const mockRecentlyViewed = [
      {
        id: 6,
        name: "Lakme Complexion Care Cream",
        price: 85,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop"
      },
      {
        id: 7,
        name: "Lakme Rose Face Powder",
        price: 140,
        originalPrice: 160,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop"
      },
      {
        id: 8,
        name: "Lakme Nail Color Remover",
        price: 55,
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop"
      },
      {
        id: 9,
        name: "Lakme Clean Up Fresh Fairness",
        price: 99,
        image: "https://images.unsplash.com/photo-1583241800698-9c2e8e6b9c7e?w=400&h=400&fit=crop"
      }
    ];

    setCartItems(mockCartItems);
    setSavedItems(mockSavedItems);
    setRecentlyViewedItems(mockRecentlyViewed);
  }, []);

  // Calculate totals
  const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + tax - discount;

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems(items =>
      items?.map(item =>
        item?.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(items => items?.filter(item => item?.id !== itemId));
    setSelectedItems(selected => selected?.filter(id => id !== itemId));
  };

  const handleMoveToWishlist = (itemId) => {
    const item = cartItems?.find(item => item?.id === itemId);
    if (item) {
      setSavedItems(prev => [...prev, { ...item, quantity: 1 }]);
      handleRemoveItem(itemId);
    }
  };

  const handleMoveToCart = (itemId) => {
    const item = savedItems?.find(item => item?.id === itemId);
    if (item) {
      setCartItems(prev => [...prev, { ...item, quantity: 1 }]);
      setSavedItems(prev => prev?.filter(item => item?.id !== itemId));
    }
  };

  const handleRemoveFromSaved = (itemId) => {
    setSavedItems(prev => prev?.filter(item => item?.id !== itemId));
  };

  const handleAddToCart = (itemId) => {
    const item = recentlyViewedItems?.find(item => item?.id === itemId);
    if (item) {
      const existingItem = cartItems?.find(cartItem => cartItem?.id === itemId);
      if (existingItem) {
        handleUpdateQuantity(itemId, existingItem?.quantity + 1);
      } else {
        setCartItems(prev => [...prev, { ...item, quantity: 1, category: "Beauty" }]);
      }
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(cartItems?.map(item => item?.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId, checked) => {
    if (checked) {
      setSelectedItems(prev => [...prev, itemId]);
    } else {
      setSelectedItems(prev => prev?.filter(id => id !== itemId));
    }
  };

  const handleBulkRemove = (itemIds) => {
    setCartItems(items => items?.filter(item => !itemIds?.includes(item?.id)));
    setSelectedItems([]);
  };

  const handleBulkMoveToWishlist = (itemIds) => {
    const itemsToMove = cartItems?.filter(item => itemIds?.includes(item?.id));
    setSavedItems(prev => [...prev, ...itemsToMove?.map(item => ({ ...item, quantity: 1 }))]);
    handleBulkRemove(itemIds);
  };

  const handleApplyPromoCode = (code) => {
    // Mock promo code logic
    const promoDiscounts = {
      'SAVE20': Math.round(subtotal * 0.20),
      'WELCOME10': Math.round(subtotal * 0.10),
      'BEAUTY15': Math.round(subtotal * 0.15)
    };
    setDiscount(promoDiscounts?.[code?.toUpperCase()] || 0);
  };

  const handleProceedToCheckout = () => {
    setIsLoading(true);
    // Mock checkout process
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to checkout page (would be implemented)
      alert('Proceeding to checkout...');
    }, 2000);
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Shopping Cart', path: '/shopping-cart' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">
              Shopping Cart
            </h1>
            {cartItems?.length > 0 && (
              <p className="text-muted-foreground mt-1">
                {cartItems?.length} {cartItems?.length === 1 ? 'item' : 'items'} in your cart
              </p>
            )}
          </div>
          
          {cartItems?.length > 0 && (
            <Link to="/product-detail">
              <Button variant="outline" iconName="Plus" iconPosition="left">
                Continue Shopping
              </Button>
            </Link>
          )}
        </div>

        {cartItems?.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items - Left Column */}
            <div className="lg:col-span-2">
              {/* Bulk Actions */}
              <BulkActions
                items={cartItems}
                selectedItems={selectedItems}
                onSelectAll={handleSelectAll}
                onSelectItem={handleSelectItem}
                onBulkRemove={handleBulkRemove}
                onBulkMoveToWishlist={handleBulkMoveToWishlist}
              />

              {/* Cart Items List */}
              <div className="space-y-4">
                {cartItems?.map((item) => (
                  <div key={item?.id} className="flex items-start gap-3">
                    <div className="flex-1">
                      <CartItem
                        item={item}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemove={handleRemoveItem}
                        onMoveToWishlist={handleMoveToWishlist}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Guest Checkout Notice */}
              <div className="mt-8 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <Icon name="Info" size={20} className="text-accent mt-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">
                      Create an account for faster checkout
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Save your details, track orders, and enjoy exclusive member benefits.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Sign Up
                      </Button>
                      <Button variant="ghost" size="sm">
                        Continue as Guest
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary - Right Column */}
            <div className="lg:col-span-1">
              <OrderSummary
                subtotal={subtotal}
                tax={tax}
                discount={discount}
                total={total}
                onApplyPromoCode={handleApplyPromoCode}
                onProceedToCheckout={handleProceedToCheckout}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}

        {/* Saved for Later */}
        <SavedForLater
          items={savedItems}
          onMoveToCart={handleMoveToCart}
          onRemove={handleRemoveFromSaved}
        />
      </div>
      {/* Recently Viewed */}
      <RecentlyViewed
        items={recentlyViewedItems}
        onAddToCart={handleAddToCart}
      />
      {/* Footer CTA */}
      {cartItems?.length > 0 && (
        <div className="sticky bottom-0 lg:hidden bg-background border-t border-border p-4 shadow-modal">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-lg font-semibold text-primary">
                ₹{total?.toLocaleString('en-IN')}
              </p>
            </div>
            <Button
              variant="default"
              size="lg"
              onClick={handleProceedToCheckout}
              loading={isLoading}
              iconName="ArrowRight"
              iconPosition="right"
            >
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;