import React from 'react';
import { Landmark } from 'lucide-react';
import { EmptyState } from '@/components/ui';

export const NotFound: React.FC = () => {
  return (
    <div className="py-12">
      <EmptyState
        icon={<Landmark className="w-8 h-8 text-brass-400" />}
        badgeText="404 Archive Notice"
        badgeVariant="brass"
        title="Page Not Found"
        description="The historical archive, catalog record, or route you are searching for does not exist in PastPort India."
        actionText="Back to Heritage Home"
        actionTo="/"
      />
    </div>
  );
};

export default NotFound;
