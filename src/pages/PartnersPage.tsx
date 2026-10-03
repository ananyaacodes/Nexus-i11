import React, { useEffect } from 'react';
import { LuminaInteractiveList } from '../components/ui/lumina-interactive-list';

export const PartnersPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return <LuminaInteractiveList />;
};
