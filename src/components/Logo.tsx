import { useActivity } from "../hooks/useActivity";
import { ActivityIcon } from "./ActivityIcon";

interface LogoProps {
  iconSize?: number;
}

export function Logo({ iconSize }: LogoProps) {
  const { online, processName } = useActivity();

  return (
    <div className="flex items-center gap-2">
      <span>ZachSpace</span>
      {online && processName && (
        <ActivityIcon processName={processName} size={iconSize} />
      )}
    </div>
  );
}
