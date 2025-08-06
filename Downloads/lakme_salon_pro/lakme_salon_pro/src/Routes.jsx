import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ShoppingCart from './pages/shopping-cart';
import ProductDetail from './pages/product-detail';
import UserDashboard from './pages/user-dashboard';
import ServiceDetail from './pages/service-detail';
import BookingSystem from './pages/booking-system';
import Homepage from './pages/homepage';
import ServiceCatalog from './pages/service-catalog';
import ProductCatalog from './pages/product-catalog';
import SalonLocator from './pages/salon-locator';
import LoginRegister from './pages/login-register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/service-detail" element={<ServiceDetail />} />
        <Route path="/booking-system" element={<BookingSystem />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/service-catalog" element={<ServiceCatalog />} />
        <Route path="/product-catalog" element={<ProductCatalog />} />
        <Route path="/salon-locator" element={<SalonLocator />} />
        <Route path="/login-register" element={<LoginRegister />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;