import CiclogreenIcon from "@/components/Atoms/Icons/CiclogreenIcon";
import useUserStatus from "@/hooks/api/useUserStatus";
import React from "react";
import classNames from "classnames";
import { B2 } from "@/common/typography";

export default function Loading() {
  useUserStatus();

  const loadingAnimationClasses = classNames(
    "animate-pulse",
    "animate-infinite",
    "flex",
    "justify-center",
    "items-center",
    "h-[65vh]",
    "flex-col"
  );

  return (
    <div>
      <div className={loadingAnimationClasses}>
        <CiclogreenIcon width={130} height={130} />
        <B2 fontWeight="font-semibold" color="mt-2 text-white-100">
          Aguardamos que confirmes tu email...
        </B2>
      </div>
    </div>
  );
}
