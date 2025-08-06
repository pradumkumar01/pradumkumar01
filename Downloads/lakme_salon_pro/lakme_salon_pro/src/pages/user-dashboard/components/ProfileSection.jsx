import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileSection = ({ userProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name,
    email: userProfile?.email,
    phone: userProfile?.phone,
    birthday: userProfile?.birthday
  });

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Mock save functionality
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: userProfile?.name,
      email: userProfile?.email,
      phone: userProfile?.phone,
      birthday: userProfile?.birthday
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Profile Information
        </h3>
        {!isEditing ? (
          <Button 
            variant="outline" 
            size="sm" 
            iconName="Edit2"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="User" size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h4 className="font-semibold text-foreground">
            {userProfile?.name}
          </h4>
          <p className="text-sm text-muted-foreground">
            Member since {userProfile?.memberSince}
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <Input
          label="Full Name"
          name="name"
          value={formData?.name}
          onChange={handleInputChange}
          disabled={!isEditing}
          className="mb-4"
        />

        <Input
          label="Email Address"
          name="email"
          type="email"
          value={formData?.email}
          onChange={handleInputChange}
          disabled={!isEditing}
          className="mb-4"
        />

        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData?.phone}
          onChange={handleInputChange}
          disabled={!isEditing}
          className="mb-4"
        />

        <Input
          label="Birthday"
          name="birthday"
          type="date"
          value={formData?.birthday}
          onChange={handleInputChange}
          disabled={!isEditing}
          className="mb-4"
        />
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-medium text-foreground mb-3">Communication Preferences</h4>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm text-foreground">WhatsApp notifications</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm text-foreground">SMS notifications</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm text-foreground">Email newsletters</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;