import { Button } from '@/components/ui/button';
import { Loader2Icon, PlayIcon, SaveIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PlaybookHeaderProps {
  playbookName: string;
  saveState: string;
  onSave: () => void;
}

export function PlaybookHeader({
  playbookName,
  saveState,
  onSave,
}: PlaybookHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="p-2 pb-0 flex flex-col md:flex-row gap-2 md:gap-0 md:justify-between w-full">
      <div className="flex gap-2 order-1 md:order-1">
        <Button
          variant="outline"
          className="cursor-pointer flex-1 md:flex-none"
          onClick={() => navigate('/playbooks')}
        >
          <span className="hidden sm:inline">Назад</span>
          <span className="sm:hidden">←</span>
        </Button>
        <Button
          variant="outline"
          className="cursor-pointer flex-1 md:flex-none"
        >
          <PlayIcon className="text-green-500" />
          <span className="hidden sm:inline ml-1">Запустить</span>
        </Button>
      </div>
      <h1 className="font-bold text-center md:text-left order-3 md:order-2 truncate">
        {playbookName || ''}
      </h1>
      <Button
        variant="outline"
        className={`cursor-pointer order-2 md:order-3 flex-1 md:flex-none ${
          saveState === 'error'
            ? 'border-red-500 text-red-500'
            : saveState === 'saved'
              ? 'border-green-500 text-green-500'
              : ''
        }`}
        onClick={onSave}
        disabled={saveState === 'saving'}
      >
        {saveState === 'saving' ? (
          <>
            <Loader2Icon className="animate-spin" />
            <span className="hidden sm:inline ml-1">Сохраняю..</span>
          </>
        ) : saveState === 'saved' ? (
          <>
            <SaveIcon className="text-green-500" />
            <span className="hidden sm:inline ml-1">Сохранено</span>
          </>
        ) : saveState === 'error' ? (
          <>
            <SaveIcon className="text-red-500" />
            <span className="hidden sm:inline ml-1">Ошибка</span>
          </>
        ) : (
          <>
            <SaveIcon className="text-blue-500" />
            <span className="hidden sm:inline ml-1">Сохранить</span>
          </>
        )}
      </Button>
    </div>
  );
}
