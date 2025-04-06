
import {atom} from "recoil"
import { CardProps } from "../ui/HeroComponent"
export const contentAtom=atom<CardProps[]>({
    key:"contentAtom",
    default:[]
}) 