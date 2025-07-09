import { Edge, MarkerType, Node } from '@xyflow/react';
import { Playbook } from './types';

interface NodeData extends Record<string, unknown> {
  label: string;
  description: string;
  actions: string[];
}

export function convertPlaybookToFlowElements(playbook: Playbook | undefined) {
  const nodes: Node<NodeData>[] = [];
  const edges: Edge[] = [];

  if (!playbook) {
    return { nodes, edges };
  }

  // Convert nodes
  for (const key in playbook.nodes) {
    const node = playbook.nodes[key];
    let type = 'default';

    if (key === playbook.start) {
      type = 'startNode';
    } else if (Object.keys(node.next).length === 0) {
      type = 'endNode';
    } else if (Object.keys(node.next).length === 1) {
      type = 'actionNode';
    } else {
      type = 'questionNode';
    }

    nodes.push({
      id: node.name,
      data: {
        label: node.name,
        description: node.description,
        actions: Object.keys(node.next),
      },
      position: { x: 0, y: 0 },
      type: type,
    });
  }

  // Convert edges
  for (const key in playbook.nodes) {
    const node = playbook.nodes[key];
    for (const nextKey in node.next) {
      const nextNodeName = node.next[nextKey];
      edges.push({
        id: key + '-' + nextNodeName,
        source: key,
        target: nextNodeName,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      });
    }
  }

  return { nodes, edges };
}
