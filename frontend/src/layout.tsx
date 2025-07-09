import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Button } from './components/ui/button'
import { DoorOpenIcon, HouseIcon, InfoIcon, ListIcon } from 'lucide-react'

const pages = [
  {
    icon: <HouseIcon />,
    page: '/'
  },
  {
    icon: <ListIcon />,
    page: '/playbooks'
  },
  {
    icon: <InfoIcon />,
    page: '/info'
  }
]

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="flex row w-full h-full">
      <div className="w-8 pt-6 ml-2 mr-2 flex flex-col gap-2 items-center text-2xl font-semibold items-center">
        <DoorOpenIcon className="text-orange-500 mb-4" />
        {pages.map((page) => (
          <Button
            variant={location.pathname == page.page ? 'secondary' : 'ghost'}
            className="cursor-pointer"
            onClick={() => navigate(page.page)}
          >
            {page.icon}
          </Button>
        ))}
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  )
}
