import { Button } from '@/components/ui/button';
import { DoorOpenIcon, InfoIcon, PlayIcon, PlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { playbookApi } from '@/lib/api';
import { useSEO } from '@/hooks/useSEO';
import { pageSEO } from '@/hooks/useSEO';

export default function Homepage() {
  const navigate = useNavigate();

  // Set SEO metadata for homepage
  useSEO(pageSEO.home);

  async function newPlaybook() {
    try {
      await playbookApi.create();
      navigate('/playbooks');
    } catch (error) {
      console.error('Failed to create playbook:', error);
    }
  }

  return (
    <div className="flex flex-col items-center pt-4 md:pt-8 justify-center h-full px-4">
      <div className="text-2xl md:text-4xl font-mono flex flex-col md:flex-row items-center gap-2 content-center text-center">
        <span>Добро пожаловать в</span>
        <div className="flex items-center gap-2">
          <DoorOpenIcon className="text-orange-500" size={24} />
          <span className="font-semibold">PlayRook</span>
        </div>
      </div>
      <div className="mt-6 flex flex-col md:flex-row gap-4 w-full max-w-md md:max-w-none md:justify-center">
        <Button
          variant="secondary"
          className="w-full md:w-64 h-32 md:h-64 text-sm md:text-md flex flex-col font-mono cursor-pointer"
          onClick={() => newPlaybook()}
        >
          <PlusIcon className="text-green-500 mb-2" />
          Создать Playbook
        </Button>
        <Button
          variant="secondary"
          className="w-full md:w-64 h-32 md:h-64 text-sm md:text-md flex flex-col font-mono cursor-pointer"
          onClick={() => navigate('/playbooks')}
        >
          <PlayIcon className="text-green-500 mb-2" />
          Запустить Playbook
        </Button>
        <Button
          variant="secondary"
          className="w-full md:w-64 h-32 md:h-64 text-sm md:text-md flex flex-col font-mono cursor-pointer"
          onClick={() => navigate('/info')}
        >
          <InfoIcon className="text-yellow-500 mb-2" />О нас
        </Button>
      </div>
    </div>
  );
}
