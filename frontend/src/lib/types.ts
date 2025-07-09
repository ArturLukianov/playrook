export interface Playbook {
  name: string;
  start: string;
  nodes: Record<string, Node>;
}

export interface Node {
  name: string;
  description: string;
  next: Record<string, string>;
}
