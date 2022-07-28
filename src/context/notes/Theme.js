import {React, createContext,useState } from "react";


const Theme = (props) => {
    const Theme = createContext();
    
    const [mode, setmode] = useState("light");
    const changemode = () => {
        if(mode==="light")
        {
            setmode("dark");
        }
        else{
            setmode("light");
        }
    }
  return (
    <Theme.Provider value={{mode,changemode}}>
        {props.children};
    </Theme.Provider>
  )
}
export default Theme;
