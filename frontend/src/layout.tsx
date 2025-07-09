import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './components/ui/button';
import { DoorOpenIcon, HouseIcon, InfoIcon, ListIcon } from 'lucide-react';

const pages = [
  {
    icon: <HouseIcon />,
    page: '/',
  },
  {
    icon: <ListIcon />,
    page: '/playbooks',
  },
  {
    icon: <InfoIcon />,
    page: '/info',
  },
];

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      <div className="w-full md:w-16 h-12 md:h-full pt-2 md:pt-6 px-2 md:px-2 flex flex-row md:flex-col gap-2 items-center justify-center md:justify-start text-lg md:text-2xl font-semibold border-b md:border-b-0 md:border-r border-border">
        <DoorOpenIcon className="text-orange-500 mb-0 md:mb-4 text-xl md:text-2xl" />
        {pages.map(page => (
          <Button
            key={page.page}
            variant={location.pathname == page.page ? 'secondary' : 'ghost'}
            className="cursor-pointer h-8 w-8 md:h-9 md:w-9 p-0"
            onClick={() => navigate(page.page)}
          >
            {page.icon}
          </Button>
        ))}
      </div>
      <div className="w-full flex-1">
        <Outlet />
      </div>
    </div>
  );
}
