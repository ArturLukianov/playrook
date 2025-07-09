import { Button } from '@/components/ui/button'
import { DoorOpenIcon, InfoIcon, PlayIcon, PlusIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Homepage() {
  const navigate = useNavigate()
  function newPlaybook() {
    fetch('http://localhost:8080/playbook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      navigate('/playbooks')
    })
  }

  return (
    <div className="flex flex-col items-center pt-8 justify-center h-full">
      <div className="text-4xl font-mono flex flex-row items-center gap-2 content-center text-center">
        Добро пожаловать в
        <DoorOpenIcon className="ml-2 text-orange-500 inline" size={32} />
        <span className="font-semibold">PlayRook</span>
      </div>
      <div className="mt-6 flex flex-row gap-4">
        <Button
          variant="secondary"
          className="w-64 h-64 text-md flex flex-col font-mono cursor-pointer"
          onClick={() => newPlaybook()}
        >
          <PlusIcon className="text-green-500" />
          Создать Playbook
        </Button>
        <Button
          variant="secondary"
          className="w-64 h-64 text-md flex flex-col font-mono cursor-pointer"
          onClick={() => navigate('/playbooks')}
        >
          <PlayIcon className="text-green-500" />
          Запустить Playbook
        </Button>
        <Button
          variant="secondary"
          className="w-64 h-64 text-md flex flex-col font-mono cursor-pointer"
          onClick={() => navigate('/info')}
        >
          <InfoIcon className="text-yellow-500" />О нас
        </Button>
      </div>
    </div>
  )
}
