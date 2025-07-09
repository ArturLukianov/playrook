import { useEffect } from 'react';
import { updateSEO, defaultSEO, type SEOData } from '@/lib/seo';

export function useSEO(data: Partial<SEOData> = {}) {
  useEffect(() => {
    const seoData = {
      ...defaultSEO,
      ...data,
      canonical: data.canonical || window.location.href,
    };

    updateSEO(seoData);
  }, [
    data.title,
    data.description,
    data.keywords,
    data.ogTitle,
    data.ogDescription,
    data.ogImage,
    data.canonical,
    data,
  ]);
}

// Specific SEO data for different pages
export const pageSEO = {
  home: {
    title: 'PlayRook - SOC Playbook Management Platform',
    description:
      'Create and manage security playbooks with powerful Markdown syntax. Designed specifically for Security Operations Center (SOC) teams.',
    keywords:
      'SOC, playbook, cybersecurity, incident response, security automation, PlayRook',
    ogTitle: 'PlayRook - SOC Playbook Management Platform',
    ogDescription:
      'Create and manage security playbooks with powerful Markdown syntax for SOC teams.',
  },
  playbooks: {
    title: 'Playbooks - PlayRook',
    description:
      'Browse and manage your security playbooks. Create new playbooks or edit existing ones for your SOC operations.',
    keywords:
      'playbooks, SOC, security playbooks, incident response, cybersecurity',
    ogTitle: 'Playbooks - PlayRook',
    ogDescription:
      'Browse and manage your security playbooks for SOC operations.',
  },
  about: {
    title: 'About PlayRook - SOC Playbook Platform',
    description:
      'Learn about PlayRook, the specialized platform for SOC teams. Discover our powerful Markdown syntax and security playbook features.',
    keywords:
      'about PlayRook, SOC platform, security playbooks, Markdown syntax, cybersecurity',
    ogTitle: 'About PlayRook - SOC Playbook Platform',
    ogDescription:
      'Learn about PlayRook, the specialized platform for SOC teams with powerful Markdown syntax.',
  },
  playbookEditor: (playbookName?: string) => ({
    title: playbookName
      ? `Edit ${playbookName} - PlayRook`
      : 'Edit Playbook - PlayRook',
    description: playbookName
      ? `Edit the playbook "${playbookName}" with our powerful Markdown editor and visual graph interface.`
      : 'Edit your security playbook with our powerful Markdown editor and visual graph interface.',
    keywords:
      'edit playbook, SOC playbook editor, Markdown editor, security playbook, PlayRook',
    ogTitle: playbookName
      ? `Edit ${playbookName} - PlayRook`
      : 'Edit Playbook - PlayRook',
    ogDescription: playbookName
      ? `Edit the playbook "${playbookName}" with our powerful Markdown editor.`
      : 'Edit your security playbook with our powerful Markdown editor and visual graph interface.',
  }),
};
