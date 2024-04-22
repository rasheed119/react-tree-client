import React, { useEffect, useContext } from "react";

import Appbar from "./Appbar";
import OptionContext from "../Context/OptionContext";
import FolderTree from "react-folder-tree";

const FolderTreeView = () => {
  useEffect(() => {
    window.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  }, []);
/*   const { treeData } = useContext(OptionContext); */

  //console.log(treeData);

  return (
    <Appbar>
      <h1>Folder Tree View</h1>
{/*       <div style={{ marginLeft: "170px" }}>
        {treeData.length > 0 && treeData ? (
          <FolderTree
            data={treeData[0]}
            initOpenStatus="closed"
          />
        ) : (
          <p>Loading...</p>
        )}
      </div> */}
    </Appbar>
  );
};

export default FolderTreeView;
