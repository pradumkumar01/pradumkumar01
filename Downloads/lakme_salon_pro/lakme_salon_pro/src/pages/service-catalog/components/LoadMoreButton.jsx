import React from 'react';
import Button from '../../../components/ui/Button';

const LoadMoreButton = ({ onLoadMore, hasMore }) => {
  if (!hasMore) return null;

  return (
    <div className="text-center">
      <Button
        variant="outline"
        size="lg"
        onClick={onLoadMore}
        iconName="ChevronDown"
        iconPosition="right"
        className="px-8"
      >
        Load More Services
      </Button>
    </div>
  );
};

export default LoadMoreButton;