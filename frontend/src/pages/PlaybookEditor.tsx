import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Playbook } from '@/lib/types';
import { parsePlaybook } from '@/lib/converter';
import { playbookApi, PlaybookData } from '@/lib/api';
import { EditIcon, NetworkIcon } from 'lucide-react';
import { Node } from '@xyflow/react';
import { useLoaderData, useParams } from 'react-router';

// Components
import { PlaybookHeader } from '@/components/playbook/PlaybookHeader';
import { PlaybookGraphView } from '@/components/playbook/PlaybookGraphView';
import { PlaybookEditorView } from '@/components/playbook/PlaybookEditorView';
import { SEOUpdater } from '@/components/SEOUpdater';

// Utilities
import { getLayoutedElements } from '@/lib/layout';
import { convertPlaybookToFlowElements } from '@/lib/playbookConverter';
import { useDebounceEffect } from '@/hooks/useDebounceEffect';
import { useSEO } from '@/hooks/useSEO';
import { pageSEO } from '@/hooks/useSEO';

interface NodeData extends Record<string, unknown> {
  label: string;
  description: string;
  actions: string[];
}

export function PlaybookEditor() {
  const { playbookId } = useParams();
  const { data } = useLoaderData() as { data: PlaybookData };

  const [playbookRaw, setPlaybookRaw] = useState<string | undefined>(
    data.raw_data
  );
  const [playbook, setPlaybook] = useState<Playbook | undefined>(data.data);
  const [saveState, setSaveState] = useState<string>('');
  const [selectedNode, setSelectedNode] = useState<
    Node<NodeData> | undefined
  >();

  // Set initial SEO metadata for playbook editor
  useSEO(pageSEO.playbookEditor(playbook?.name));

  async function savePlaybook() {
    if (!playbook) return;

    setSaveState('saving');
    try {
      if (!playbookId) {
        setSaveState('error');
        return;
      }

      await playbookApi.update(playbookId, {
        data: playbook,
        raw_data: playbookRaw || '',
      });
      setSaveState('saved');

      // Clear saved state after 3 seconds
      setTimeout(() => {
        setSaveState('');
      }, 3000);
    } catch (error) {
      console.error('Failed to save playbook:', error);
      setSaveState('error');

      // Clear error state after 5 seconds
      setTimeout(() => {
        setSaveState('');
      }, 5000);
    }
  }

  const renderPlaybook = () => {
    try {
      if (!playbookRaw) {
        setPlaybook(undefined);
        return;
      }
      const parsedPlaybook = parsePlaybook(playbookRaw);
      setPlaybook(parsedPlaybook);
    } catch {
      // Error ?
    }
  };

  useDebounceEffect(playbookRaw, renderPlaybook, 1000);

  const { nodes, edges } = convertPlaybookToFlowElements(playbook);
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    nodes,
    edges
  );

  return (
    <div className="h-screen flex flex-col">
      <SEOUpdater playbookName={playbook?.name} pageType="playbookEditor" />
      <PlaybookHeader
        playbookName={playbook?.name || ''}
        saveState={saveState}
        onSave={savePlaybook}
      />
      <Tabs defaultValue="graph" className="flex-1 p-2">
        <TabsList className="w-full">
          <TabsTrigger value="graph" className="flex-1 md:flex-none">
            <NetworkIcon className="h-4 w-4 md:mr-2" />
            <span className="hidden sm:inline">Плейбук</span>
          </TabsTrigger>
          <TabsTrigger value="editor" className="flex-1 md:flex-none">
            <EditIcon className="h-4 w-4 md:mr-2" />
            <span className="hidden sm:inline">Редактор</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="graph" className="h-full">
          <PlaybookGraphView
            nodes={layoutedNodes as Node<NodeData>[]}
            edges={layoutedEdges}
            selectedNode={selectedNode}
            onNodeClick={(_, node) => setSelectedNode(node)}
          />
        </TabsContent>
        <TabsContent value="editor" className="h-full overflow-hidden">
          <PlaybookEditorView value={playbookRaw} onChange={setPlaybookRaw} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
