import { useRecoilState } from "recoil";
import { PlusIcon } from "../../icons/PlusIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { Button } from "./button";
import { topTitle } from "../recoil/Titlebar";
import { HamburgerIcon } from "../../icons/hamburger";
import { useResponsive } from "../hooks/useResponsive";
import { isSmallScreen } from "../recoil/isSmallScreen";
import { isNavVisible } from "../recoil/hamburger";

export const TopBar = (props: { onClick1: () => void }) => {
  const [topBarTitle] = useRecoilState(topTitle);
  const [isSmall] = useRecoilState(isSmallScreen);
  const [navVisible, setNavVisible] = useRecoilState(isNavVisible);

  useResponsive();

  return (
    <div className="w-full flex items-center justify-between py-8 px-4  mb-4">

      <div className="flex items-center gap-3">
        {isSmall && (
          <div className="cursor-pointer" onClick={() => setNavVisible(!navVisible)}>
            <HamburgerIcon size="sm" />
          </div>
        )}
        <div className="md:text-3xl text-2xl ml-2 font-bold">{topBarTitle}</div>
      </div>

      <div className="flex items-center gap-2">
        {isSmall ? (
          <>
            <button
              onClick={() => {}}
              className="p-2 rounded-full text-[#7755c5] hover:bg-gray-100 transition"
              title="Share"
            >
              <ShareIcon size="sm" />
            </button>
            <button
              onClick={props.onClick1}
              className="p-2 rounded-full bg-[#7755c5] text-white hover:opacity-90 transition"
              title="Add Content"
            >
              <PlusIcon size="sm" />
            </button>
          </>
        ) : (
          <>
            <Button
              type="secondary"
              text="Share brain"
              startIcon={<ShareIcon size="sm" />}
              onclick={() => {}}
            />
            <Button
              type="primary"
              text="Add content"
              startIcon={<PlusIcon size="sm" />}
              onclick={props.onClick1}
            />
          </>
        )}
      </div>
    </div>
  );
};
