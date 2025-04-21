import { useState } from 'react'
import './App.css'
import TreeView from './components/TreeView'
import initialData from "./data.json"

export interface TreeNode {
  id: string
  text: string
  parent: string | null
}

const App = () => {
  const [treeData, setTreeData] = useState<TreeNode[]>(initialData.objects)
  const [currentRootId, setCurrentRootId] = useState<string | null>(null)
  return (
    <div className='app-container'>
      <h1>Дерево</h1>
      <div className='tree-container'>
        <div className='main-tree'>
          <TreeView
          data={treeData}
          rootId={currentRootId}
          />
        </div>
      </div>
    </div>
  )
}

export default App
