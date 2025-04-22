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
  const [currentRootId] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [editingNode, setEditingNode] = useState<string | null>(null)
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
    if (selectedNode){
      setEditingNode(selectedNode)
    }
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
    setEditingNode(null)
  }
  const handleReset = () => {
    setTreeData(initialData.objects)
    handleDeselect()
  }

  const handleDeselect = () => {
    if(selectedNode){
      setSelectedNode(null)
    }
    if (editingNode){
      setEditingNode(null)
    }
  }

  const handleSaveEdit = (nodeId: string, newText: string) => {
    if (newText.trim()) {
      const editedData = treeData.map((node) => (node.id === nodeId) ? ({...node, text: newText}) : (node))
      setTreeData(editedData)
      setEditingNode(null)
    }
  }

  const handleCancelEdit = () => {
    setEditingNode(null)
  }

  return (
    <div className='page-background' onClick={handleDeselect}>
      <div className='app-container' >
        <h1>Tree</h1>
        <div className='tree-container'>
          <div className='main-tree' onClick={handleDeselect}>
            <TreeView
            data={treeData}
            rootId={currentRootId}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            editingNode={editingNode}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
            />
          </div>
        </div>
        <TreeControls
        onAdd={handleAdd}
        onEdit={handleEdit}
        onRemove={handleRemove}
        onReset={handleReset}
        />
      </div>
    </div>
  )
}

export default App
