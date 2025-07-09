import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Markdown from 'react-markdown';
import { Node } from '@xyflow/react';

interface NodeData extends Record<string, unknown> {
  label: string;
  description: string;
  actions: string[];
}

interface NodeDetailsPanelProps {
  selectedNode: Node<NodeData> | undefined;
}

export function NodeDetailsPanel({ selectedNode }: NodeDetailsPanelProps) {
  if (!selectedNode) {
    return null;
  }

  return (
    <div className="w-full md:w-80 lg:w-96 right-0 absolute top-0 md:top-0 pt-6 px-4 md:px-6 bg-background h-full z-10 border-l border-border overflow-y-auto">
      <h1 className="text-xl md:text-2xl pb-4 break-words">
        {selectedNode.data.label}
      </h1>
      <div className="text-sm md:text-base">
        <Markdown
          components={{
            ul(props) {
              const { ...rest } = props;
              return (
                <ul className="list-disc pl-4 pb-2" {...rest}>
                  {props.children}
                </ul>
              );
            },
            ol(props) {
              const { ...rest } = props;
              return (
                <ol className="list-decimal pl-4 pb-2" {...rest}>
                  {props.children}
                </ol>
              );
            },
          }}
        >
          {selectedNode.data.description}
        </Markdown>

        <div className="mt-4 flex flex-wrap gap-2">
          {selectedNode.data.actions.map((actionName: string) => (
            <Button
              key={actionName}
              variant="outline"
              size="sm"
              className="text-xs md:text-sm"
            >
              <ArrowRight className="text-blue-500 h-3 w-3 md:h-4 md:w-4 mr-1" />
              {actionName === 'next' ? 'Далее' : actionName}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
