import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ items = [] }) => {
  const location = useLocation();

  // Auto-generate breadcrumbs if no items provided
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/' }];

    const routeMap = {
      'service-detail': 'Service Details',
      'booking-system': 'Book Appointment',
      'product-detail': 'Product Details',
      'shopping-cart': 'Shopping Cart',
      'user-dashboard': 'Dashboard'
    };

    pathSegments?.forEach((segment, index) => {
      const path = '/' + pathSegments?.slice(0, index + 1)?.join('/');
      const label = routeMap?.[segment] || segment?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase());
      breadcrumbs?.push({ label, path });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items?.length > 0 ? items : generateBreadcrumbs();

  if (breadcrumbItems?.length <= 1) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground py-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbItems?.map((item, index) => {
          const isLast = index === breadcrumbItems?.length - 1;
          const isActive = location.pathname === item?.path;

          return (
            <li key={item?.path} className="flex items-center">
              {index > 0 && (
                <Icon 
                  name="ChevronRight" 
                  size={14} 
                  className="mx-2 text-muted-foreground/60" 
                />
              )}
              {isLast || isActive ? (
                <span 
                  className="font-medium text-foreground"
                  aria-current="page"
                >
                  {item?.label}
                </span>
              ) : (
                <Link
                  to={item?.path}
                  className="hover:text-foreground transition-smooth font-caption"
                >
                  {item?.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;