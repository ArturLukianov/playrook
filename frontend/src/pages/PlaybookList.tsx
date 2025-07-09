// App.tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Play, Pencil, Plus, DoorOpenIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

// const playbooks = Array.from({ length: 20 }, (_, i) => ({
//   id: i + 1,
//   name: `Playbook ${i + 1}`,
// }));

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function PlaybookList() {
  const navigate = useNavigate();
  const { data, error, isLoading, mutate } = useSWR(
    `http://localhost:8080/playbooks`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  function newPlaybook() {
    fetch("http://localhost:8080/playbook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      mutate();
    });
  }

  const playbooks = data.data || [];

  return (
    <div className="mx-auto w-full mt-2">
      <div className="p-2 px-4 border-b-1 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-semibold font-mono flex gap-x-2 items-center">
              <DoorOpenIcon className="text-orange-500" /> PlayRook
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
