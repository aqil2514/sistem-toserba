import Link from "next/link";
import { useToserbaHeader } from "../hooks/use-toserba-header";

interface Props {
  isDemo: boolean;
}

export function ToserbaBrand({ isDemo }: Props) {
  const { pathname } = useToserbaHeader();

  const basePath = normalizePath(pathname);

  return (
    <div className="flex items-center gap-3">
      {/* MODE SWITCH */}
      {isDemo ? (
        <Link href={basePath || "/dashboard"}>
          <span className="rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800 cursor-pointer">
            Demo Mode
          </span>
        </Link>
      ) : (
        <Link href={`/demo${basePath || "/dashboard"}`}>
          <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-800 cursor-pointer">
            Private Mode
          </span>
        </Link>
      )}

      {/* BRAND */}
      <Link
        href={isDemo ? "/demo/dashboard" : "/dashboard"}
        className="text-lg font-semibold tracking-tight"
      >
        Toserba
      </Link>
    </div>
  );
}

function normalizePath(pathname: string) {
  return pathname.startsWith("/demo")
    ? pathname.replace("/demo", "")
    : pathname;
}
