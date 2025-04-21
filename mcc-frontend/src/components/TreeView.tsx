import type React from "react"

import { useEffect, useState } from "react"
import type { TreeNode } from "../App"

interface TreeViewProps {
    data: TreeNode[]
    rootId: string | null
    selectedNode: string | null
    setSelectedNode: (id: string | null) => void
}
const TreeView = ({
    data,
    rootId,
    selectedNode,
    setSelectedNode
}: TreeViewProps) => {
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())

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
    const renderNode = (node: TreeNode) => {
        const children = getChildren(node.id)
        const hasChildren= children.length > 0
        const isExpanded = expandedNodes.has(node.id)
        const isSelected = selectedNode === node.id
        
        return (
            <div key={node.id} className="tree-node-container">
                <div className={`tree-node ${isSelected ? "selected" : ""}`} onClick={() => setSelectedNode(node.id)}>
                    {hasChildren  && (
                        <span className="toggle-icon" onClick={() => toggleNode(node.id)}>
                            {isExpanded ? "▼" : "►"}
                        </span>
                    )}
                    {!hasChildren && <span className="toggle-icon-placeholder"></span>}
                    <span className="node-text">{node.text}</span>
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