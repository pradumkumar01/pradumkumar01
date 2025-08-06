import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LoyaltyCard = ({ loyaltyData }) => {
  const progressPercentage = (loyaltyData?.currentPoints / loyaltyData?.nextTierPoints) * 100;
  const pointsToNextTier = loyaltyData?.nextTierPoints - loyaltyData?.currentPoints;

  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-6 border border-border shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
            In Privileges
          </h3>
          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 bg-primary/10 rounded-full">
              <span className="text-sm font-medium text-primary">
                {loyaltyData?.tier} Member
              </span>
            </div>
          </div>
        </div>
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon name="Crown" size={24} color="var(--color-primary)" />
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-foreground">
            {loyaltyData?.currentPoints?.toLocaleString('en-IN')}
          </span>
          <span className="text-sm text-muted-foreground">
            Points
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2 mb-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Progress to {loyaltyData?.nextTier}</span>
          <span>{pointsToNextTier} points to go</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">
            ₹{loyaltyData?.cashbackEarned}
          </div>
          <div className="text-xs text-muted-foreground">
            Cashback Earned
          </div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">
            {loyaltyData?.rewardsAvailable}
          </div>
          <div className="text-xs text-muted-foreground">
            Rewards Available
          </div>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <h4 className="font-medium text-foreground text-sm">Available Rewards</h4>
        {loyaltyData?.availableRewards?.slice(0, 2)?.map((reward, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-background rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="Gift" size={16} color="var(--color-accent)" />
              <span className="text-sm text-foreground">{reward?.title}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {reward?.points} pts
            </span>
          </div>
        ))}
      </div>
      <Button variant="outline" fullWidth iconName="Gift">
        View All Rewards
      </Button>
    </div>
  );
};

export default LoyaltyCard;