import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { isSmallScreen } from "../recoil/isSmallScreen";

export const useResponsive = () => {
  const setIsSmallScreen = useSetRecoilState(isSmallScreen);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsSmallScreen(!window.matchMedia("(min-width: 768px)").matches);
    };

    updateScreenSize(); // Initial check

    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, [setIsSmallScreen]);
};
