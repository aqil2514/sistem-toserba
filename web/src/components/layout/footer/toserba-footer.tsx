export function ToserbaFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Toserba — Sistem Internal
        </p>
      </div>
    </footer>
  );
}
