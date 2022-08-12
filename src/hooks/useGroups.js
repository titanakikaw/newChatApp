import React, { useEffect, useState } from "react";

function useGroups(){
   const [groups, setGroups] = useState();
   useEffect(() => {
      const unsubscribe = setGroups();
      return unsubscribe
   }, [])
   return groups
}

export { useGroups };