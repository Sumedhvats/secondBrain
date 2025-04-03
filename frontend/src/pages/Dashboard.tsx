import { useState } from "react";

import { SideBar } from "../components/ui/sideBar";
import { Hero } from "../components/ui/HeroComponent";
import { TopBar } from "../components/ui/TopBar";
import { CreateContent } from "../components/ui/CreateContentModal";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <CreateContent open={modalOpen} setOpen={setModalOpen} />

      <div className="flex h-screen">
        <SideBar />
        <div className="flex flex-col flex-1 px-6 bg-slate-100">
         {/* @ts-ignore*/ }
          <TopBar onClick1={setModalOpen}/>
          <Hero />
        </div>
      </div>
    </>
  );
}

export default Dashboard;