import { useEffect, useState } from 'react'
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
    if (selectedNode) {
      handleAddChild(selectedNode)
    } else { handleAddChild(null) }
  }

  const handleAddChild = (parentId: string | null) => {
    const newId = (Math.max(...treeData.map((node) => Number.parseInt(node.id)), 0) + 1).toString()
    const newNode: TreeNode = {
      id: newId,
      text: `Node ${newId}`,
      parent: parentId
    }
    setTreeData([...treeData, newNode])
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
    handleDeselect()
  }

  const handleDeselect = () => {
    if(selectedNode){
      setSelectedNode(null)
    }
  }

  return (
    <div className='app-container' >
      <h1>Дерево</h1>
      <div className='tree-container'>
        <div className='main-tree'onClick={handleDeselect} >
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
