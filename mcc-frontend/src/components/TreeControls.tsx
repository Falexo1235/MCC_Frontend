interface TreeControlsProps {
    onAdd: () => void
    onRemove: () => void
    onEdit: () => void
    onReset: () => void
  }
  
  const TreeControls = ({ onAdd, onRemove, onEdit, onReset }: TreeControlsProps) => {
    return (
      <div className="tree-controls">
        <button className="control-button add" onClick={onAdd}>
          Add
        </button>
        <button className="control-button remove" onClick={onRemove}>
          Delete
        </button>
        <button className="control-button edit" onClick={onEdit}>
          Edit
        </button>
        <button className="control-button reset" onClick={onReset}>
          Reset
        </button>
      </div>
    )
  }
  
  export default TreeControls