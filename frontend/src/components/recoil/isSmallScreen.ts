import { atom } from "recoil";

export const isSmallScreen = atom({
  key: "isSmallScreen",
  default: !window.matchMedia("(min-width: 768px)").matches,
});
