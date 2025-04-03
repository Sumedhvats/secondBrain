import { useState } from "react";
import "./App.css";
import { SideBar } from "./components/ui/sideBar";
import { Hero } from "./components/HeroComponent";
import { TopBar } from "./components/ui/TopBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex flex-col flex-1 px-6">
        <TopBar />
        <Hero />
      </div>
    </div>
  );
}

export default App;
