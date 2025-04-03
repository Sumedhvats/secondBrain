import { useEffect, useRef } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./button";
import { InputElement } from "./Input";
{/* @ts-ignore*/ }
export const CreateContent = ({ open, setOpen }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen((o: boolean) => !o);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setOpen]);
  if (!open) return null; 

  return (
    <div className="fixed inset-0  bg-opacity-90 backdrop-blur-sm flex justify-center items-center z-50 " >
      <div className="bg-white p-4 rounded-xl shadow-lg w-96" ref={modalRef}>
        <div className="flex justify-end">
          <button className="cursor-pointer" onClick={() => setOpen(false)}>
            <CrossIcon />
          </button>
        </div>
        <div className="">
          <InputElement placeholder="Title" onChange={() => {}}></InputElement>
          <InputElement placeholder="Link" onChange={() => {}}></InputElement>
        </div>
        <div className="flex justify-center pt-5">
        <Button type="primary" text="Add content" onclick={() => {}}></Button>
        </div>
      </div>
    </div>
  );
};

