import { useState } from "react";
import { PlusIcon } from "./icons/PlusIcon";

import "./App.css";
import { Button } from "./components/ui/button";
import { DocumentIcon } from "./icons/DocumentIcon";
import { SidebarItem } from "./components/ui/sidebarItem";
import { TweetIcon } from "./icons/TweetIcon";


function App() {
  const [count, setCount] = useState(0);

  return <>
  <Button type= {"primary"} size={"sm"} text="hwllo" startIcon={<DocumentIcon size="sm"/>} onclick={()=>{}}></Button>
  <Button  type= {"secondary"} size={"md"} text="hwllo" startIcon={<DocumentIcon size="md"/>} onclick={()=>{}}></Button>
  <Button type= {"secondary"} size={"lg"} text="hwllo" startIcon={<DocumentIcon size="lg"/>} onclick={()=>{}}></Button>

  <SidebarItem text ="Twitter" icon ={<TweetIcon size="sm"/>} size="sm"></SidebarItem>
  </>;
}

export default App;
 