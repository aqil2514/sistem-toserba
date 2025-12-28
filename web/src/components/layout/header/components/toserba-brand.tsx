import Link from "next/link";

interface Props {
  isDemo: boolean;
}

export function ToserbaBrand({ isDemo }: Props) {
  return (
    <>
      {isDemo && (
        <span className="ml-4 rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800">
          Demo Mode
        </span>
      )}

      <Link
        href={isDemo ? "/demo/dashboard" : "/dashboard"}
        className="text-lg font-semibold tracking-tight"
      >
        Toserba{" "}
      </Link>
    </>
  );
}
