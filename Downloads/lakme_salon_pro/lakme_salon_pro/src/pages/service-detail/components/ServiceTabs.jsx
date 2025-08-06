import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';


const ServiceTabs = ({ service }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'process', label: 'Process', icon: 'List' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-heading font-semibold mb-4">About This Service</h3>
        <p className="text-muted-foreground leading-relaxed">
          {service?.fullDescription}
        </p>
      </div>
      
      <div>
        <h3 className="text-xl font-heading font-semibold mb-4">Key Benefits</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {service?.benefits?.map((benefit, index) => (
            <li key={index} className="flex items-start space-x-3">
              <Icon name="Check" size={16} className="text-success mt-1 flex-shrink-0" />
              <span className="text-muted-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3 className="text-xl font-heading font-semibold mb-4">Recommended For</h3>
        <div className="flex flex-wrap gap-2">
          {service?.recommendedFor?.map((type, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-heading font-semibold mb-4">Frequency</h3>
        <p className="text-muted-foreground">{service?.frequency}</p>
      </div>
    </div>
  );

  const renderProcess = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-heading font-semibold mb-4">Treatment Process</h3>
      <div className="space-y-4">
        {service?.processSteps?.map((step, index) => (
          <div key={index} className="flex space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
              {index + 1}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-2">{step?.title}</h4>
              <p className="text-muted-foreground">{step?.description}</p>
              <span className="text-sm text-accent font-medium">{step?.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-heading font-semibold">Customer Reviews</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5]?.map((star) => (
              <Icon
                key={star}
                name="Star"
                size={16}
                className={star <= Math.floor(service?.rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {service?.rating}/5 ({service?.reviewCount} reviews)
          </span>
        </div>
      </div>
      
      <div className="space-y-4">
        {service?.reviews?.map((review) => (
          <div key={review?.id} className="border border-border rounded-lg p-4">
            <div className="flex items-start space-x-4">
              <Image
                src={review?.avatar}
                alt={review?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{review?.name}</h4>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5]?.map((star) => (
                      <Icon
                        key={star}
                        name="Star"
                        size={12}
                        className={star <= review?.rating ? 'text-warning fill-current' : 'text-muted-foreground'}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-2">{review?.comment}</p>
                <span className="text-xs text-muted-foreground">{review?.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-lg shadow-card">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-4 border-b-2 transition-smooth ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="font-medium">{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'process' && renderProcess()}
        {activeTab === 'reviews' && renderReviews()}
      </div>
    </div>
  );
};

export default ServiceTabs;