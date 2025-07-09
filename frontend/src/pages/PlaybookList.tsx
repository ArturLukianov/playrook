import PlaybookListEntry from '@/components/PlaybookListEntry';
import { Button } from '@/components/ui/button';
import { Plus, TriangleAlertIcon, Loader2Icon } from 'lucide-react';
import useSWR from 'swr';
import { playbookApi } from '@/lib/api';
import { useSEO } from '@/hooks/useSEO';
import { pageSEO } from '@/hooks/useSEO';

export function PlaybookList() {
  // Set SEO metadata for playbooks page
  useSEO(pageSEO.playbooks);

  const { data, error, isLoading, mutate } = useSWR('playbooks', () =>
    playbookApi.getAll()
  );

  if (error)
    return (
      <div className="flex h-full flex-col items-center justify-center text-2xl font-mono">
        <div className="p-4 bg-red-950 text-red-500 rounded-md flex flex-row gap-4 items-center">
          <TriangleAlertIcon />
          Failed to load
        </div>
      </div>
    );
  if (isLoading)
    return (
      <div className="flex h-full flex-col items-center justify-center text-2xl font-mono">
        <div className="p-4 rounded-md flex flex-row gap-4 items-center">
          <Loader2Icon className="animate-spin" />
          Loading
        </div>
      </div>
    );

  async function newPlaybook() {
    try {
      await playbookApi.create();
      mutate();
    } catch (error) {
      console.error('Failed to create playbook:', error);
    }
  }

  const playbooks = data?.data || [];

  return (
    <div className="mx-auto w-full mt-2 px-2 md:px-0">
      <div className="p-2 md:px-4 border-b-1 pb-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
          <div>
            <span className="text-xl md:text-2xl font-semibold font-mono flex gap-x-2 items-center">
              Список плейбуков
            </span>
          </div>
          <Button
            variant="outline"
            className="cursor-pointer w-full md:w-auto"
            onClick={newPlaybook}
          >
            <Plus className="mr-2 h-4 w-4 text-blue-500" />
            <span className="hidden sm:inline">Создать новый плейбук</span>
            <span className="sm:hidden">Создать</span>
          </Button>
        </div>
      </div>

      <div className="p-0">
        <div className="divide-y overflow-y-auto max-h-[calc(100vh-120px)] md:max-h-[90vh]">
          {playbooks.map(playbook => (
            <PlaybookListEntry
              key={playbook.id}
              playbook={playbook}
              mutate={mutate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
