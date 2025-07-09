import { PlaybookEntry } from '@/lib/types'
import { Button } from './ui/button'
import { Pencil, Play, TrashIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { KeyedMutator } from 'swr'

export default function PlaybookListEntry({
  playbook,
  mutate
}: {
  playbook: PlaybookEntry
  mutate: KeyedMutator<PlaybookEntry>
}) {
  const navigate = useNavigate()

  return (
    <div
      key={playbook.id}
      className="flex items-center justify-between py-2 px-4 transition-colors"
    >
      <span className="font-medium">{playbook.name}</span>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="cursor-pointer">
          <Play className="h-4 w-4 mr-2 text-green-500" />
          Запустить
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer"
          onClick={() => navigate(`/playbook/${playbook.id}/edit`)}
        >
          <Pencil className="h-4 w-4 text-orange-500" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer"
          onClick={() =>
            fetch(`http://localhost:8080/playbook/${playbook.id}`, {
              method: 'DELETE'
            }).then(() => mutate())
          }
        >
          <TrashIcon className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </div>
  )
}
