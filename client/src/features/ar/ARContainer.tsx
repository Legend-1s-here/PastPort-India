import React from 'react';
import { TajMahalARViewer } from './TajMahalARViewer';

interface ARContainerProps {
  onBackTo3D: () => void;
}

export const ARContainer: React.FC<ARContainerProps> = ({ onBackTo3D }) => {
  return <TajMahalARViewer onExitAR={onBackTo3D} />;
};

export default ARContainer;
