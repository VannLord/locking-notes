import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import { Public_Sans } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NoteProvider from "@/providers/NoteProvider";

const publicSans = Public_Sans({
  subsets: ["vietnamese"],
});

export const metadata: Metadata = {
  title: "Locking Notes",
  description: "The Notes powered by King Loc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={publicSans.className}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NoteProvider>
            <SidebarProvider>
              <AppSidebar />
              <div className="flex min-h-screen w-full flex-col">
                <Header />
                <main className="flex flex-1 flex-col px-4 pt-10 xl:px-8">
                  {children}
                </main>
              </div>
            </SidebarProvider>

            <Toaster />
          </NoteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
