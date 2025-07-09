import { PlaybookEntry } from '@/lib/api';
import { Button } from './ui/button';
import { Pencil, Play, TrashIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { KeyedMutator } from 'swr';
import { PlaybookResponse } from '@/lib/api';
import { playbookApi } from '@/lib/api';

export default function PlaybookListEntry({
  playbook,
  mutate,
}: {
  playbook: PlaybookEntry;
  mutate: KeyedMutator<PlaybookResponse>;
}) {
  const navigate = useNavigate();

  return (
    <div
      key={playbook.id}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 px-4 transition-colors gap-3 sm:gap-2"
    >
      <span className="font-medium text-sm sm:text-base truncate">
        {playbook.name}
      </span>

      <div className="flex gap-2 w-full sm:w-auto justify-end">
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer flex-1 sm:flex-none"
        >
          <Play className="h-4 w-4 mr-1 sm:mr-2 text-green-500" />
          <span className="hidden sm:inline">Запустить</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer flex-1 sm:flex-none"
          onClick={() => navigate(`/playbook/${playbook.id}/edit`)}
        >
          <Pencil className="h-4 w-4 text-orange-500" />
          <span className="hidden sm:inline ml-1">Редактировать</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer flex-1 sm:flex-none"
          onClick={async () => {
            try {
              await playbookApi.delete(playbook.id);
              mutate();
            } catch (error) {
              console.error('Failed to delete playbook:', error);
            }
          }}
        >
          <TrashIcon className="h-4 w-4 text-red-500" />
          <span className="hidden sm:inline ml-1">Удалить</span>
        </Button>
      </div>
    </div>
  );
}
