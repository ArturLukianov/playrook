import { useEffect } from 'react';
import { updateSEO } from '@/lib/seo';
import { pageSEO } from '@/hooks/useSEO';

interface SEOUpdaterProps {
  playbookName?: string;
  pageType: 'playbookEditor';
}

export function SEOUpdater({ playbookName, pageType }: SEOUpdaterProps) {
  useEffect(() => {
    if (pageType === 'playbookEditor') {
      const seoData = pageSEO.playbookEditor(playbookName);
      updateSEO({
        ...seoData,
        canonical: window.location.href,
      });
    }
  }, [playbookName, pageType]);

  return null;
}
