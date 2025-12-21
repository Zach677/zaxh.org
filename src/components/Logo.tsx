import { useActivity } from "../hooks/useActivity";
import { ActivityIcon } from "./ActivityIcon";

export function Logo() {
  const { online, processName } = useActivity();

  return (
    <div className="flex items-center gap-2">
      <span>ZachSpace</span>
      {online && processName && <ActivityIcon processName={processName} />}
    </div>
  );
}
