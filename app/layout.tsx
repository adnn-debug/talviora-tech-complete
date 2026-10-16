import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";

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
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..700&family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('talviora-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) document.documentElement.classList.add('dark');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased selection:bg-[var(--color-dusty-rose)]/40 selection:text-[var(--color-burgundy)]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
