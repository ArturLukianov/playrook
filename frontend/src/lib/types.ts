export interface Playbook {
  name: string;
  start: string;
  nodes: Record<string, Node>;
}

export interface PlaybookEntry {
  id: number;
  name: string;
}

export interface Node {
  name: string;
  description: string;
  next: Record<string, string>;
}
