import { PlusIcon } from "../../icons/PlusIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { Button } from "./button";

export const TopBar = () => {
  return (
    <div className="w-full max-w-screen-lg flex justify-between items-center py-4 ">

      <div className="text-4xl font-bold">All Notes</div>
      <div className="flex gap-4 ml-auto">
        <Button type="secondary" text="Share brain" startIcon={<ShareIcon size="sm" />} onclick={() => {}} />
        <Button type="primary" text="Add content" startIcon={<PlusIcon size="sm" />} onclick={() => {}} />
      </div>
    </div>
  );
};
