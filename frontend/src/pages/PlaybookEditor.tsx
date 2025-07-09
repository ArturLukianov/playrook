import { Button } from "@/components/ui/button";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Playbook } from "@/lib/types";
import { parsePlaybook } from "@/lib/converter";
import {
  ArrowRight,
  EditIcon,
  Loader2Icon,
  NetworkIcon,
  PlayIcon,
  SaveIcon,
} from "lucide-react";

import {
  Background,
  Controls,
  Edge,
  EdgeLabelRenderer,
  MarkerType,
  MiniMap,
  Node,
  ReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import dagre from "@dagrejs/dagre";
import StartNode from "@/components/nodes/StartNode";
import EndNode from "@/components/nodes/EndNode";
import QuestionNode from "@/components/nodes/QuestionNode";
import ActionNode from "@/components/nodes/ActionNode";
import { useLoaderData, useNavigate, useParams } from "react-router";

import Markdown from "react-markdown";

const nodeTypes = {
  startNode: StartNode,
  endNode: EndNode,
  questionNode: QuestionNode,
  actionNode: ActionNode,
};

function useDebounceEffect<T>(
  value: T,
  callback: (value: T) => void,
  delay: number = 3000,
  areEqual: (a: T, b: T) => boolean = (a, b) => a === b
) {
  const timeoutRef = useRef<number | null>(null);
  const previousValueRef = useRef<T>(value);

  useEffect(() => {
    // Skip if value hasn't actually changed
    if (areEqual(value, previousValueRef.current)) return;

    // Update previous value and clear existing timeout
    previousValueRef.current = value;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Set new timeout
    timeoutRef.current = window.setTimeout(() => {
      callback(value);
    }, delay);

    // Cleanup
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, delay, callback, areEqual]);
}

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 200;
const nodeHeight = 50;

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  dagreGraph.setGraph({ rankdir: "TD" });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: "down",
      sourcePosition: "top",
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };

    return newNode;
  });

  return { nodes: newNodes, edges };
};

export function PlaybookEditor() {
  const { playbookId } = useParams();
  const navigate = useNavigate();

  const { data } = useLoaderData();

  const [playbookRaw, setPlaybookRaw] = useState<string | undefined>(
    data.raw_data
  );
  const [playbook, setPlaybook] = useState<Playbook | undefined>(data.data);
  const [saveState, setSaveState] = useState<string>("");
  const [selectedNode, setSelectedNode] = useState<Node | undefined>();

  function savePlaybook() {
    if (!playbook) return;

    setSaveState("saving");
    fetch(`http://localhost:8080/playbook/${playbookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: playbook, raw_data: playbookRaw }),
    }).then(() => setSaveState("saved"));
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

  let nodes = [];
  let edges = [];

  for (const key in playbook?.nodes) {
    const node = playbook?.nodes[key];
    let type = "default";
    if (key == playbook?.start) {
      type = "startNode";
    } else if (Object.keys(node.next).length == 0) {
      type = "endNode";
    } else if (Object.keys(node.next).length == 1) {
      type = "actionNode";
    } else {
      type = "questionNode";
    }
    nodes.push({
      id: node.name,
      // type: "default",
      data: {
        label: node.name,
        description: node.description,
        actions: Object.keys(node.next),
      },
      position: { x: 0, y: 0 },
      type: type,
    });
  }

  for (const key in playbook?.nodes) {
    const node = playbook?.nodes[key];
    for (const nextKey in node.next) {
      const nextNodeName = node.next[nextKey];
      edges.push({
        id: key + "-" + nextNodeName,
        source: key,
        target: nextNodeName,
        // animated: true,
        // label: nextKey === "next" ? undefined : nextKey,
        // type: "smoothstep",

        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      });
    }
  }

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    nodes,
    edges
  );

  return (
    <div className="h-screen">
      <div className="p-2 pb-0 justify-between flex w-full">
        <div className="space-x-2 flex">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => navigate("/")}
          >
            Назад
          </Button>
          <Button variant="outline" className="cursor-pointer">
            <PlayIcon className="text-green-500" /> Запустить
          </Button>
        </div>
        <h1 className="font-bold">
          {playbook === undefined ? "" : playbook.name}
        </h1>
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={savePlaybook}
        >
          {saveState == "saving" ? (
            <>
              <Loader2Icon className="animate-spin" /> Сохраняю..
            </>
          ) : (
            <>
              <SaveIcon className="text-blue-500" /> Сохранить
            </>
          )}
        </Button>
      </div>
      <Tabs defaultValue="graph" className="h-[95vh] p-2">
        <TabsList className="w-full">
          <TabsTrigger value="graph">
            <NetworkIcon /> Плейбук
          </TabsTrigger>
          <TabsTrigger value="editor">
            <EditIcon /> Редактор
          </TabsTrigger>
        </TabsList>
        <TabsContent value="graph">
          <ReactFlow
            colorMode="dark"
            proOptions={{ hideAttribution: true }}
            nodeTypes={nodeTypes}
            nodes={layoutedNodes}
            edges={layoutedEdges}
            edgesReconnectable={false}
            nodesDraggable={false}
            onSelectionChange={(elements) => {
              if (elements.nodes.length == 1) {
                setSelectedNode(elements.nodes[0]);
              }
            }}
            nodesConnectable={false}
            nodesFocusable
            fitView
          >
            <Background />
            <Controls />

            {selectedNode == undefined ? (
              <></>
            ) : (
              <div className="w-10 h-10 right-0 absolute pt-6 px-10 min-w-1/3 bg-background h-full z-10">
                <h1 className="text-2xl pb-4">{selectedNode?.data.label}</h1>
                <div className="">
                  <Markdown
                    components={{
                      ul(props) {
                        const { node, ...rest } = props;
                        return (
                          <ul className="list-disc pl-4 pb-2" {...rest}>
                            {props.children}
                          </ul>
                        );
                      },
                      ol(props) {
                        const { node, ...rest } = props;
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

                  <div className="mt-4 flex gap-x-2">
                    {selectedNode.data.actions.map((actionName) => (
                      <Button variant="outline"><ArrowRight className="text-blue-500"/> {actionName == "next" ? "Далее" : actionName}</Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </ReactFlow>
        </TabsContent>
        <TabsContent value="editor" className="h-full overflow-hidden">
          <MDEditor
            onChange={setPlaybookRaw}
            value={playbookRaw}
            height="99%"
            highlightEnable
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
