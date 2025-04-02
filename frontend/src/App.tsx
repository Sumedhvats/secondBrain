import { useState } from "react";
import { PlusIcon } from "./icons/PlusIcon";

import "./App.css";
import { Button } from "./components/button";


function App() {
  const [count, setCount] = useState(0);

  return <>
  <Button type= {"primary"} size={"sm"} text="hwllo" startIcon={<PlusIcon size="sm"/>} onclick={()=>{}}></Button>
  <Button  type= {"secondary"} size={"md"} text="hwllo" startIcon={<PlusIcon size="md"/>} onclick={()=>{}}></Button>
  <Button type= {"secondary"} size={"lg"} text="hwllo" startIcon={<PlusIcon size="lg"/>} onclick={()=>{}}></Button>
  </>;
}

export default App;
 