import { Playbook, Node } from './types'

export function parsePlaybook(text: string): Playbook {
  const lines = text.split('\n').map((line) => line.trimEnd())
  let startNode = ''
  let name = ''
  const nodes: Record<string, Node> = {}

  // Parse start node from the first code block
  let inStartCodeBlock = false
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.startsWith('# ')) {
      name = line.substring(2).trim()
    } else if (line.startsWith('```')) {
      inStartCodeBlock = !inStartCodeBlock
      if (!inStartCodeBlock) break
    } else if (inStartCodeBlock && line.startsWith('start:')) {
      startNode = line.split(':')[1].trim()
      break
    }
  }

  // Parse nodes
  let currentNodeName = ''
  let nodeContent: string[] = []

  const processNode = () => {
    if (!currentNodeName) return

    let inCodeBlock = false
    const next: Record<string, string> = {}
    const descriptionLines: string[] = []
    let codeBlockContent: string[] = []

    for (const line of nodeContent) {
      if (line.startsWith('```')) {
        inCodeBlock = !inCodeBlock
        if (!inCodeBlock && codeBlockContent.length > 0) {
          codeBlockContent.forEach((codeLine) => {
            const [key, value] = codeLine.split(':').map((p) => p.trim())
            if (key && value) next[key] = value
          })
          codeBlockContent = []
        }
      } else if (inCodeBlock) {
        codeBlockContent.push(line)
      } else {
        descriptionLines.push(line)
      }
    }

    nodes[currentNodeName] = {
      name: currentNodeName,
      description: descriptionLines.join('\n'),
      next
    }
  }

  for (const line of lines) {
    if (line.startsWith('## ')) {
      processNode()
      currentNodeName = line.substring(3).trim()
      nodeContent = []
    } else if (currentNodeName) {
      console.log(line)
      nodeContent.push(line)
    }
  }
  processNode() // Process last node

  return { name: name, start: startNode, nodes }
}
