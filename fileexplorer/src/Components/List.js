import { useState } from "react";

const List = ({ list, setData }) => {
  const [isExpanded, setIsExpanded] = useState({});

  const addNodeToList = (parentId) => {
    const name = prompt("Enter name ");

    const updateTree = (list) => {
      return list.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...node.children,
              { id: Date.now().toString(), name: name, isFolder: true, children: [] },
            ],
          };
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    };
    setData((prev) => updateTree(prev));
  };

  const deleteNodeFromList=(itemId)=>{
    const updateTree=(list)=>{
      return list.filter(node=>node.id!==itemId).map((node)=>{
        if(node.children){
          return {...node, children: updateTree(node.children)}
        }
        return node;
      });
    }
    setData((prev)=>updateTree(prev));
  }
  return (
    <div className="container">
      {list.map((node) => (
        <div key={node.id}>
          {node.isFolder && (
            <span
              onClick={() =>
                setIsExpanded((prev) => ({
                  ...prev,
                  [node.name]: !prev[node.name],
                }))
              }
            >
              {isExpanded?.[node.name] ? "˄ " : "˅ "}
            </span>
          )}
          <span>{node.name}</span>
          {node?.isFolder && (
            <span onClick={() => addNodeToList(node.id)}>
              <img
                src="https://img.icons8.com/?size=96&id=C8gfz6xPL7TZ&format=png"
                alt="icon"
                className="icon"
              />
            </span>
            )}
            <span onClick={() => deleteNodeFromList(node.id)}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpERQXFZgj_diH_JgU7y_1ursxZ3Trc5DIQA&s"
              alt="icon"
              className="icon"
            />
          </span>
          
          {isExpanded?.[node.name] && node?.children && (
            <List list={node.children} setData={setData} addNodeToList={addNodeToList} deleteNodeFromList={deleteNodeFromList} />
          )}
        </div>
      ))}
    </div>
  );
};
export default List;
