import type React from "react"
import type { Metadata, Viewport } from "next"
import { Press_Start_2P } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap", // Optimización de carga de fuente
})

export const metadata: Metadata = {
  title: "Retired64 - Sm64CoopDx Mods",
  description: "Browse and download Sm64CoopDx Mods of Retired64",
  generator: "Retired64 Github",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  // Prevenir flash de contenido sin estilos
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fef0f5" },
    { media: "(prefers-color-scheme: dark)", color: "#1a2952" },
  ],
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fef0f5" },
    { media: "(prefers-color-scheme: dark)", color: "#1a2952" },
  ],
  // Optimización para móvil
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      // Prevenir layout shift durante carga de tema
      className="scroll-smooth"
    >
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/icon.svg" as="image" type="image/svg+xml" />
        {/* Prevenir FOIT (Flash of Invisible Text) */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: 'Press Start 2P';
              font-display: swap;
              src: url('https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK3nVivM.woff2') format('woff2');
            }
          `
        }} />
      </head>
      <body className={`${pressStart.variable} font-sans antialiased`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
          // Forzar tema inicial para prevenir parpadeo
          storageKey="mario-mods-theme"
        >
          {/* Loading state global opcional */}
          <div className="min-h-screen bg-background">
            {children}
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
