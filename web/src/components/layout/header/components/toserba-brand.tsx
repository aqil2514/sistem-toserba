import Link from "next/link";
import { useToserbaHeader } from "../hooks/use-toserba-header";

export function ToserbaBrand() {
  const { pathname, isDemo, isAuthenticated } = useToserbaHeader();

  const basePath = normalizePath(pathname);

  const modeBadge = isDemo ? (
    <span className="rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800">
      Demo Mode
    </span>
  ) : (
    <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-800">
      Private Mode
    </span>
  );

  return (
    <div className="flex items-center gap-3">
      {/* MODE BADGE */}
      {isAuthenticated ? (
        isDemo ? (
          <Link href={basePath || "/dashboard"}>{modeBadge}</Link>
        ) : (
          <Link href={`/demo${basePath || "/dashboard"}`}>{modeBadge}</Link>
        )
      ) : (
        <span className="cursor-default opacity-80">{modeBadge}</span>
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

const normalizePath = (pathname: string) => {
  return pathname.startsWith("/demo")
    ? pathname.replace("/demo", "")
    : pathname;
}
