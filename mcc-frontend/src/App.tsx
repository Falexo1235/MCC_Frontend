import { useState } from 'react'
import './App.css'
import TreeView from './components/TreeView'
import initialData from "./data.json"
import TreeControls from './components/TreeControls'

export interface TreeNode {
  id: string
  text: string
  parent: string | null
}

const App = () => {
  const [treeData, setTreeData] = useState<TreeNode[]>(initialData.objects)
  const [currentRootId, setCurrentRootId] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const handleAdd = () => {

  }
  const handleEdit = () => {
    
  }
  const handleRemove = () => {
    if(!selectedNode) { return }
    const nodesToRemove = new Set<string>()
    const findChildren = (nodeId: string) => {
      nodesToRemove.add(nodeId)
      treeData.forEach((node)=> {
        if (node.parent === nodeId) {
          findChildren(node.id)
        }
      })
    }
    findChildren(selectedNode)
    const newTree = treeData.filter((node) => !nodesToRemove.has(node.id))
    setTreeData(newTree)
    setSelectedNode(null)
  }
  const handleReset = () => {
    setTreeData(initialData.objects)
  }
  return (
    <div className='app-container'>
      <h1>Дерево</h1>
      <div className='tree-container'>
        <div className='main-tree'>
          <TreeView
          data={treeData}
          rootId={currentRootId}
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
          />
        </div>
      </div>
      <TreeControls
      onAdd={handleAdd}
      onEdit={handleEdit}
      onRemove={handleRemove}
      onReset={handleReset}>

      </TreeControls>
    </div>
  )
}

export default App
