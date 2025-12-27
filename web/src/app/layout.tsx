import { ToserbaFooter } from "@/components/layout/footer/toserba-footer";
import { ToserbaHeader } from "@/components/layout/header/toserba-header";
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col">
        
        <ToserbaHeader />

        {/* Content */}
        <div className="flex-1">
          {children}
        </div>

        <ToserbaFooter />
      </body>
    </html>
  );
}
