export const treeRendering = (treeData, onItemClick) => {
  return (
    <>
      <ul>
        {treeData.map((item, index) => (
          <li
            key={index}
            onClick={(e) =>
              onItemClick(e, item.id, item.Name, item.role, item.role_id)
            }
          >
            <div className={`${item.role === "E" && "pointer"}`}>
              {item.Name}
            </div>
            {item.children &&
              item.children.length > 0 &&
              treeRendering(item.children, onItemClick)}
          </li>
        ))}
      </ul>
    </>
  );
};
