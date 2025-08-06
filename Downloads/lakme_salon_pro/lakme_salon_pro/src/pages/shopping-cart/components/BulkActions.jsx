import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const BulkActions = ({ 
  items, 
  selectedItems, 
  onSelectAll, 
  onSelectItem, 
  onBulkRemove, 
  onBulkMoveToWishlist 
}) => {
  const [showBulkRemoveDialog, setShowBulkRemoveDialog] = useState(false);
  
  const isAllSelected = items?.length > 0 && selectedItems?.length === items?.length;
  const isPartiallySelected = selectedItems?.length > 0 && selectedItems?.length < items?.length;

  const handleBulkRemove = () => {
    onBulkRemove(selectedItems);
    setShowBulkRemoveDialog(false);
  };

  if (items?.length === 0) return null;

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-muted/50 rounded-lg mb-6">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={isAllSelected}
            indeterminate={isPartiallySelected}
            onChange={(e) => onSelectAll(e?.target?.checked)}
            label={`Select all (${items?.length} items)`}
          />
        </div>
        
        {selectedItems?.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {selectedItems?.length} selected
            </span>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onBulkMoveToWishlist(selectedItems)}
              iconName="Heart"
              iconPosition="left"
            >
              Save for Later
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBulkRemoveDialog(true)}
              iconName="Trash2"
              iconPosition="left"
              className="text-error hover:text-error"
            >
              Remove
            </Button>
          </div>
        )}
      </div>
      {/* Individual Item Checkboxes */}
      <div className="space-y-4">
        {items?.map((item) => (
          <div key={item?.id} className="flex items-start gap-3">
            <Checkbox
              checked={selectedItems?.includes(item?.id)}
              onChange={(e) => onSelectItem(item?.id, e?.target?.checked)}
              className="mt-6"
            />
            {/* Item content will be rendered by parent component */}
          </div>
        ))}
      </div>
      {/* Bulk Remove Confirmation Dialog */}
      {showBulkRemoveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 max-w-sm w-full shadow-modal">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Remove Items</h3>
                <p className="text-sm text-muted-foreground">
                  Are you sure you want to remove {selectedItems?.length} selected items?
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowBulkRemoveDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                fullWidth
                onClick={handleBulkRemove}
              >
                Remove All
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActions;