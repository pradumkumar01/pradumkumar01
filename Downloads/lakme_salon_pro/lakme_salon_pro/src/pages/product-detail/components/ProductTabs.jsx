import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('ingredients');

  const tabs = [
    { id: 'ingredients', label: 'Ingredients', icon: 'Leaf' },
    { id: 'howToUse', label: 'How to Use', icon: 'Info' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' }
  ];

  const renderStars = (rating) => {
    return [...Array(5)]?.map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={i < Math.floor(rating) ? 'text-accent fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'ingredients':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-foreground mb-2">Key Ingredients:</h4>
              <ul className="space-y-2">
                {product?.keyIngredients?.map((ingredient, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-foreground">{ingredient?.name}</span>
                      <p className="text-sm text-muted-foreground">{ingredient?.benefit}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {product?.fullIngredientsList && (
              <div>
                <h4 className="font-medium text-foreground mb-2">Full Ingredients List:</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product?.fullIngredientsList}
                </p>
              </div>
            )}
          </div>
        );

      case 'howToUse':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-foreground mb-3">Application Steps:</h4>
              <ol className="space-y-3">
                {product?.usageInstructions?.map((step, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <p className="text-muted-foreground">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
            {product?.tips && (
              <div className="bg-surface p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2 flex items-center">
                  <Icon name="Lightbulb" size={16} className="mr-2 text-accent" />
                  Pro Tips:
                </h4>
                <ul className="space-y-1">
                  {product?.tips?.map((tip, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      • {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            {/* Review Summary */}
            <div className="bg-surface p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-2xl font-semibold text-foreground">{product?.rating}</span>
                    <div className="flex">{renderStars(product?.rating)}</div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on {product?.reviewCount} reviews
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Verified Purchases</p>
                  <p className="text-lg font-semibold text-success">
                    {Math.round((product?.verifiedPurchases / product?.reviewCount) * 100)}%
                  </p>
                </div>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1]?.map((stars) => {
                  const count = product?.ratingBreakdown?.[stars] || 0;
                  const percentage = (count / product?.reviewCount) * 100;
                  return (
                    <div key={stars} className="flex items-center space-x-2 text-sm">
                      <span className="w-8 text-muted-foreground">{stars}★</span>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className="bg-accent h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-8 text-muted-foreground text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Individual Reviews */}
            <div className="space-y-4">
              {product?.reviews?.map((review) => (
                <div key={review?.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-medium text-sm">
                          {review?.userName?.charAt(0)?.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{review?.userName}</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex">{renderStars(review?.rating)}</div>
                          {review?.verified && (
                            <span className="bg-success text-success-foreground px-2 py-0.5 rounded text-xs font-medium">
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.date)?.toLocaleDateString('en-IN')}
                    </span>
                  </div>

                  <p className="text-muted-foreground mb-3">{review?.comment}</p>

                  {review?.images && review?.images?.length > 0 && (
                    <div className="flex space-x-2 mb-3">
                      {review?.images?.map((image, index) => (
                        <div key={index} className="w-16 h-16 rounded-lg overflow-hidden">
                          <Image
                            src={image}
                            alt={`Review image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <button className="flex items-center space-x-1 hover:text-foreground transition-smooth">
                      <Icon name="ThumbsUp" size={14} />
                      <span>Helpful ({review?.helpfulCount})</span>
                    </button>
                    <button className="hover:text-foreground transition-smooth">
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-background">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-smooth whitespace-nowrap ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
              {tab?.id === 'reviews' && (
                <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-xs">
                  {product?.reviewCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="py-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductTabs;