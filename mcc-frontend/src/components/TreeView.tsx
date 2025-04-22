import type React from "react"

import { useState } from "react"
import type { TreeNode } from "../App"

interface TreeViewProps {
    data: TreeNode[]
    rootId: string | null
    selectedNode: string | null
    setSelectedNode: (id: string | null) => void
    editingNode: string | null
    onSaveEdit: (nodeId: string, newText: string) => void
    onCancelEdit: () => void
}
const TreeView = ({
    data,
    rootId,
    selectedNode,
    setSelectedNode,
    editingNode,
    onSaveEdit,
    onCancelEdit
}: TreeViewProps) => {
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
    const [editText, setEditText] = useState<string>("")

    const getChildren = (parentId: string | null) => {
        return data.filter((node) => node.parent === parentId)
    }
    const toggleNode = (id: string) => {
        const newExpandedNodes = new Set(expandedNodes)
        if (newExpandedNodes.has(id)) {
            newExpandedNodes.delete(id)
        } else {
            newExpandedNodes.add(id)
        }
        setExpandedNodes(newExpandedNodes)
    }

    const handleNodeClick = (e: React.MouseEvent, node: TreeNode) => {
        e.stopPropagation()
        setSelectedNode(node.id)
        setEditText(node.text)
    }
    const handleKeyPress = (e: React.KeyboardEvent, nodeId: string) => {
        console.log(e.key)
        if (e.key === "Enter"){
            onSaveEdit(nodeId, editText)
        } else if (e.key === "Escape") {
            onCancelEdit()
        }
    }
    

    const renderNode = (node: TreeNode) => {
        const children = getChildren(node.id)
        const hasChildren= children.length > 0
        const isExpanded = expandedNodes.has(node.id)
        const isSelected = selectedNode === node.id
        const isEditing = editingNode === node.id

        return (
            <div key={node.id} className="tree-node-container" onClick={(e) => e.stopPropagation()}>
                <div className={`tree-node ${isSelected ? "selected" : ""}`} onClick={(e) => {handleNodeClick(e, node)}}>
                    {hasChildren  && (
                        <span className="toggle-icon" onClick={() => toggleNode(node.id)}>
                            {isExpanded ? "▼" : "►"}
                        </span>
                    )}
                    {!hasChildren && <span className="toggle-icon-placeholder"></span>}
                    {isEditing ? (<div className="edit-container"onClick={(e) => e.stopPropagation()} >
                        <input
                            type="text"
                            className="edit-input"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={(e) => handleKeyPress(e, node.id)}
                            onBlur={() => onSaveEdit(node.id, editText)}
                            autoFocus
                        />
                    </div>
                ) : (
                <span className="node-text">{node.text}</span>)}
                </div>
                {hasChildren && isExpanded && (
                    <div className="children-container">{children.map((child) => renderNode(child))}</div>
                )}
            </div>
        )
        
    }
    const rootNodes=getChildren(rootId)
    return(
        <div className="tree-view">
            {rootNodes.map((node) => renderNode(node))}
            {rootNodes.length === 0 && <div className="empty-tree">No nodes to display</div>}
        </div>
    )
}

export default TreeView