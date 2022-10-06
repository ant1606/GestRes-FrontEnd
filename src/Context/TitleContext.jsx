import {createContext, useState} from "react";

//Creando el context
const TitleContext = createContext();

export function TitleContextProvider({children}) {

  const [title, setTitle] = useState("");

  function changeTitle(value){
    setTitle(value);
  }

  return (
    <TitleContext.Provider value={{title, changeTitle}}>
      {children}
    </TitleContext.Provider>
  )
}

export default TitleContext;
