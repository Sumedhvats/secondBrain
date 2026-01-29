import { useRecoilState } from "recoil";
import { PlusIcon } from "../../icons/PlusIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { SearchIcon } from "../../icons/SearchIcon";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./button";
import { topTitle } from "../recoil/Titlebar";
import { HamburgerIcon } from "../../icons/hamburger";
import { useResponsive } from "../hooks/useResponsive";
import { isSmallScreen } from "../recoil/isSmallScreen";
import { isNavVisible } from "../recoil/hamburger";
import { ThemeToggle } from "./ThemeToggle";
import { searchQueryAtom } from "../recoil/searchQuery";

export const TopBar = (props: { onClick1: () => void }) => {
  const [topBarTitle] = useRecoilState(topTitle);
  const [isSmall] = useRecoilState(isSmallScreen);
  const [navVisible, setNavVisible] = useRecoilState(isNavVisible);
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryAtom);

  useResponsive();

  return (
    <div className="w-full flex items-center justify-between py-6 px-4 mb-4 bg-[rgb(var(--color-bg-secondary))]/80 backdrop-blur-sm border-b border-[rgb(var(--color-border))] sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {isSmall && (
          <div className="cursor-pointer" onClick={() => setNavVisible(!navVisible)}>
            <HamburgerIcon size="sm" />
          </div>
        )}
        <div className="md:text-3xl text-2xl ml-2 font-bold text-[rgb(var(--color-text-primary))]">
          {topBarTitle}
        </div>
      </div>

      {/* Search Input */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative">
          <SearchIcon
            size="sm"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--color-text-tertiary))]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, tags, or type..."
            className="w-full pl-10 pr-10 py-2 rounded-lg bg-[rgb(var(--color-bg-tertiary))]/50 border border-[rgb(var(--color-border))] text-[rgb(var(--color-text-primary))] placeholder:text-[rgb(var(--color-text-tertiary))] focus:outline-none focus:border-[rgb(var(--color-primary))] focus:ring-2 focus:ring-[rgb(var(--color-primary))]/20 transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--color-text-tertiary))] hover:text-[rgb(var(--color-text-primary))] transition-colors"
              aria-label="Clear search"
            >
              <CrossIcon size="sm" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        {isSmall ? (
          <>
            <button
              onClick={() => { }}
              className="p-2 rounded-full text-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-bg-tertiary))] transition-colors"
              title="Share"
            >
              <ShareIcon size="sm" />
            </button>
            <button
              onClick={props.onClick1}
              className="p-2 rounded-full bg-[rgb(var(--color-primary))] text-white hover:bg-[rgb(var(--color-primary-hover))] transition-colors"
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
              onclick={() => { }}
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
