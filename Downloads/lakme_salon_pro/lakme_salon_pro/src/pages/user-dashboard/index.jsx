import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import DashboardCard from './components/DashboardCard';
import AppointmentCard from './components/AppointmentCard';
import OrderCard from './components/OrderCard';
import LoyaltyCard from './components/LoyaltyCard';
import QuickActions from './components/QuickActions';
import ActivityFeed from './components/ActivityFeed';
import ProfileSection from './components/ProfileSection';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock user data
  const userData = {
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    birthday: "1992-03-15",
    memberSince: "March 2022",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  };

  // Mock appointments data
  const upcomingAppointments = [
    {
      id: 1,
      service: "K-SSense Face Ritual",
      salon: "Lakme Salon - Connaught Place",
      date: "2025-01-08",
      time: "14:30",
      price: 2500,
      status: "Confirmed"
    },
    {
      id: 2,
      service: "Glass Shine Hair Treatment",
      salon: "Lakme Salon - Khan Market",
      date: "2025-01-12",
      time: "11:00",
      price: 3200,
      status: "Pending"
    }
  ];

  // Mock orders data
  const recentOrders = [
    {
      id: "ORD001",
      date: "2025-01-02",
      status: "Delivered",
      total: 2850,
      items: [
        {
          name: "Lakme Absolute Hydra Pro Serum",
          quantity: 1,
          price: 1200,
          image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=100&h=100&fit=crop"
        },
        {
          name: "Lakme 9 to 5 Matte Foundation",
          quantity: 2,
          price: 825,
          image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=100&h=100&fit=crop"
        }
      ]
    },
    {
      id: "ORD002",
      date: "2024-12-28",
      status: "Shipped",
      total: 1650,
      items: [
        {
          name: "Olaplex No. 6 Bond Smoother",
          quantity: 1,
          price: 1650,
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop"
        }
      ]
    }
  ];

  // Mock loyalty data
  const loyaltyData = {
    currentPoints: 12450,
    nextTierPoints: 15000,
    tier: "Gold",
    nextTier: "Platinum",
    cashbackEarned: 1240,
    rewardsAvailable: 8,
    availableRewards: [
      { title: "20% Off Next Service", points: 500 },
      { title: "Free Hair Wash", points: 300 },
      { title: "Complimentary Manicure", points: 800 },
      { title: "Product Sample Kit", points: 200 }
    ]
  };

  // Mock activity data
  const recentActivities = [
    {
      id: 1,
      type: "booking",
      message: "Appointment booked for K-SSense Face Ritual",
      timestamp: "2025-01-06T10:30:00Z"
    },
    {
      id: 2,
      type: "points",
      message: "Earned 250 loyalty points from recent purchase",
      timestamp: "2025-01-05T14:20:00Z",
      amount: 25
    },
    {
      id: 3,
      type: "order",
      message: "Order #ORD001 has been delivered",
      timestamp: "2025-01-02T16:45:00Z"
    },
    {
      id: 4,
      type: "reward",
      message: "New reward unlocked: 20% Off Next Service",
      timestamp: "2025-01-01T09:15:00Z"
    }
  ];

  const dashboardStats = [
    {
      title: "Upcoming Appointments",
      value: upcomingAppointments?.length,
      subtitle: "Next: Jan 8, 2:30 PM",
      icon: "Calendar",
      color: "primary"
    },
    {
      title: "Recent Orders",
      value: recentOrders?.length,
      subtitle: "Last order delivered",
      icon: "ShoppingBag",
      color: "accent"
    },
    {
      title: "Loyalty Points",
      value: loyaltyData?.currentPoints?.toLocaleString('en-IN'),
      subtitle: `${loyaltyData?.nextTierPoints - loyaltyData?.currentPoints} to ${loyaltyData?.nextTier}`,
      icon: "Star",
      color: "success"
    },
    {
      title: "Total Savings",
      value: `₹${loyaltyData?.cashbackEarned}`,
      subtitle: "This year",
      icon: "Wallet",
      color: "warning"
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'bookings', label: 'Bookings', icon: 'Calendar' },
    { id: 'orders', label: 'Orders', icon: 'ShoppingBag' },
    { id: 'rewards', label: 'Rewards', icon: 'Gift' },
    { id: 'profile', label: 'Profile', icon: 'User' }
  ];

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/user-dashboard' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
                Welcome back, {userData?.name?.split(' ')?.[0]}!
              </h1>
              <p className="text-muted-foreground">
                Manage your appointments, orders, and rewards all in one place.
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Member since</div>
                <div className="font-semibold text-foreground">{userData?.memberSince}</div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={24} color="var(--color-primary)" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-border">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-smooth ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardStats?.map((stat, index) => (
                <DashboardCard
                  key={index}
                  title={stat?.title}
                  value={stat?.value}
                  subtitle={stat?.subtitle}
                  icon={stat?.icon}
                  color={stat?.color}
                />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Upcoming Appointments */}
                <div className="bg-card rounded-lg p-6 shadow-card border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading font-semibold text-lg text-foreground">
                      Upcoming Appointments
                    </h3>
                    <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {upcomingAppointments?.map((appointment) => (
                      <AppointmentCard key={appointment?.id} appointment={appointment} />
                    ))}
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-card rounded-lg p-6 shadow-card border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading font-semibold text-lg text-foreground">
                      Recent Orders
                    </h3>
                    <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentOrders?.map((order) => (
                      <OrderCard key={order?.id} order={order} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <LoyaltyCard loyaltyData={loyaltyData} />
                <QuickActions />
                <ActivityFeed activities={recentActivities} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                My Bookings
              </h2>
              <button 
                onClick={() => window.location.href = '/booking-system'}
                className="text-primary hover:text-primary/80 transition-smooth"
              >
                Book New Appointment
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingAppointments?.map((appointment) => (
                <AppointmentCard key={appointment?.id} appointment={appointment} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Order History
              </h2>
              <button 
                onClick={() => window.location.href = '/product-detail'}
                className="text-primary hover:text-primary/80 transition-smooth"
              >
                Shop Products
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentOrders?.map((order) => (
                <OrderCard key={order?.id} order={order} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="space-y-6">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Loyalty & Rewards
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <LoyaltyCard loyaltyData={loyaltyData} />
              <div className="bg-card rounded-lg p-6 shadow-card border border-border">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                  Reward History
                </h3>
                <div className="space-y-3">
                  {loyaltyData?.availableRewards?.map((reward, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background rounded-md">
                      <div className="flex items-center space-x-3">
                        <Icon name="Gift" size={16} color="var(--color-accent)" />
                        <span className="text-sm text-foreground">{reward?.title}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">{reward?.points} points</div>
                        <button className="text-xs text-primary hover:text-primary/80">
                          Redeem
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Profile Settings
            </h2>
            <div className="max-w-2xl">
              <ProfileSection userProfile={userData} />
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date()?.getFullYear()} Lakme Salon Pro. All rights reserved.</p>
            <p className="mt-2">
              Need help? Call us at <span className="text-primary">1800 123 1952</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;