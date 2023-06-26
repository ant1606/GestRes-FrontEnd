import {createContext, useState} from "react";

//Uso del context 
//https://mindsers.blog/post/updating-react-context-from-consumer/

//Creando el context
const SideBarContext = createContext();

export function SideBarContextProvider({children}){

  const [open, setToggle] = useState(true);

  function toggle() {
    setToggle(!open);
  }

  return(
    <SideBarContext.Provider value={{open, toggle}}>
      {children}
    </SideBarContext.Provider>
  )
}

export default SideBarContext