import { PlusIcon } from "../../icons/PlusIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { Button } from "./button";

export const TopBar = (props:{onClick1:()=>void }) => {
  return (
    <div className="w-full  flex justify-between items-center py-6">

      <div className="text-4xl font-bold">All Notes</div>
      <div className="flex gap-3">
        <Button type="secondary" text="Share brain" startIcon={<ShareIcon size="sm" />} onclick={() => {}} />
        <Button type="primary" text="Add content" startIcon={<PlusIcon size="sm" />} onclick={props.onClick1} />
      </div>
    </div>
  );
};
