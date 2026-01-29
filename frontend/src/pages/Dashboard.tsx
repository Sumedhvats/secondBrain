import { modalState } from "../components/recoil/atom";
import { useRecoilState } from "recoil";
import { SideBar } from "../components/ui/sideBar";
import { Hero } from "../components/ui/HeroComponent";
import { TopBar } from "../components/ui/TopBar";
import { CreateContent } from "../components/ui/CreateContentModal";

function Dashboard() {
  //@ts-ignore
  const [modalOpen, setModalOpen] = useRecoilState(modalState);


  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <CreateContent />
      <div className="flex h-screen bg-[rgb(var(--color-bg-secondary))]">
        <SideBar />
        <div className="flex flex-col flex-1 h-screen overflow-y-auto pb-5">
          <TopBar onClick1={handleOpenModal} />
          <Hero />
        </div>
      </div>
    </>
  );
}

export default Dashboard;