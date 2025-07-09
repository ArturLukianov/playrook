// App.tsx
import PlaybookListEntry from '@/components/PlaybookListEntry'
import { Button } from '@/components/ui/button'
import { PlaybookEntry } from '@/lib/types'
import { Plus, TriangleAlertIcon, Loader2Icon } from 'lucide-react'
import useSWR from 'swr'

// const playbooks = Array.from({ length: 20 }, (_, i) => ({
//   id: i + 1,
//   name: `Playbook ${i + 1}`,
// }));

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function PlaybookList() {
  const { data, error, isLoading, mutate } = useSWR(
    `http://localhost:8080/playbooks`,
    fetcher
  )

  if (error)
    return (
      <div className="flex h-full flex-col items-center justify-center text-2xl font-mono">
        <div className="p-4 bg-red-950 text-red-500 rounded-md flex flex-row gap-4 items-center">
          <TriangleAlertIcon />
          Failed to load
        </div>
      </div>
    )
  if (isLoading)
    return (
      <div className="flex h-full flex-col items-center justify-center text-2xl font-mono">
        <div className="p-4 rounded-md flex flex-row gap-4 items-center">
          <Loader2Icon className="animate-spin" />
          Loading
        </div>
      </div>
    )

  function newPlaybook() {
    fetch('http://localhost:8080/playbook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      mutate()
    })
  }

  const playbooks: PlaybookEntry[] = data.data || []

  return (
    <div className="mx-auto w-full mt-2">
      <div className="p-2 px-4 border-b-1 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-semibold font-mono flex gap-x-2 items-center">
              Список плейбуков
            </span>
          </div>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={newPlaybook}
          >
            <Plus className="mr-2 h-4 w-4 text-blue-500" />
            Создать новый плейбук
          </Button>
        </div>
      </div>

      <div className="p-0">
        <div className="divide-y overflow-y-auto max-h-[90vh]">
          {playbooks.map((playbook) => (
            <PlaybookListEntry playbook={playbook} mutate={mutate} />
          ))}
        </div>
      </div>
    </div>
  )
}
