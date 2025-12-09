"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { MarioCoin } from "@/components/mario-coin"
import { Button } from "@/components/ui/button"
import { Github, Twitter, Youtube } from "lucide-react"

export function Header() {
  return (
    <header className="border-b-4 border-border bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="flex items-center gap-3 group">
            <MarioCoin className="group-hover:scale-110 transition-transform" />
            <h1 className="font-[family-name:var(--font-pixel)] text-lg md:text-xl text-primary leading-relaxed">
              MARIO MODS
            </h1>
          </Link>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="pixel-corners border-2 hover:bg-muted bg-transparent"
              asChild
              aria-label="GitHub"
            >
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="pixel-corners border-2 hover:bg-muted bg-transparent"
              asChild
              aria-label="Twitter"
            >
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="pixel-corners border-2 hover:bg-muted bg-transparent"
              asChild
              aria-label="YouTube"
            >
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-4 w-4" />
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
          Welcome to the ultimate Super Mario Bros mod repository! Browse, search, and download amazing mods with our
          retro 8-bit style interface. Power up your gaming experience!
        </p>
      </div>
    </header>
  )
}
