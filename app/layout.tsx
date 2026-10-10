import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";

export const metadata: Metadata = {
  title: "TALVIORA TECH | AI Career Intelligence Platform",
  description:
    "Autonomous technology learning & career intelligence ecosystem. Discover, understand, practise, build, prove, and apply real technical skills.",
  keywords: [
    "Talviora Tech",
    "AI Career Intelligence",
    "Technology Learning Ecosystem",
    "Skill Assessment",
    "Dynamic Roadmap",
    "Proof of Work",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Manrope:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('talviora-theme');
                  if (savedTheme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased selection:bg-[#C58F98]/30 selection:text-[#6F1737] dark:selection:bg-[#C58F98]/20 dark:selection:text-[#F0C4CC]">
        <div className="min-h-screen flex flex-col justify-between">
          <div>
            <Navbar />
            <div className="max-w-[1720px] w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col md:flex-row gap-6">
              <Sidebar />
              <main className="flex-1 min-w-0">
                <Breadcrumbs />
                {children}
              </main>
            </div>
          </div>
          <Footer />
          <CommandPalette />
        </div>
      </body>
    </html>
  );
}
