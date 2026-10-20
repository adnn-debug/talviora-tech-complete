import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-serif",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

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
      <body className={`${dmSans.variable} ${dmSerifDisplay.variable} ${jetbrainsMono.variable} antialiased selection:bg-[var(--color-dusty-rose)]/40 selection:text-[var(--color-burgundy)]`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
