import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";
import { ActiveThemeProvider } from "@/components/themes/active-theme";
import { DEFAULT_THEME, type Theme } from "@/components/themes/theme.config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OT Tracker",
  description: "Personal overtime tracker",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const activeTheme = (cookieStore.get("active_theme")?.value ?? DEFAULT_THEME) as Theme;

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning data-theme={activeTheme}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ActiveThemeProvider initialTheme={activeTheme}>
              <ConvexClientProvider>{children}</ConvexClientProvider>
            </ActiveThemeProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
