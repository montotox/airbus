import CiclogreenIcon from "@/components/Atoms/Icons/CiclogreenIcon";
import React from "react";
import classNames from "classnames";
import { B2 } from "@/common/typography";

export interface LoaderProps {
  message: string;
}

export default function Loader({ message }: LoaderProps) {
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
          {message}
        </B2>
      </div>
    </div>
  );
}
