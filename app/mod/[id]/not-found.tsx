import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="pixel-corners bg-card border-4 border-border p-12 max-w-lg mx-auto">
            <div className="text-8xl mb-6 font-[family-name:var(--font-pixel)]">404</div>
            <h1 className="font-[family-name:var(--font-pixel)] text-lg mb-4 text-foreground leading-relaxed">
              MOD NOT FOUND
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Sorry, the mod you're looking for doesn't exist. It may have been removed or the link is incorrect.
            </p>
            <Link href="/">
              <Button className="pixel-corners border-4 border-foreground font-[family-name:var(--font-pixel)] text-[10px] leading-relaxed hover:bg-[color:var(--mario-pipe)] hover:text-primary-foreground transition-all">
                RETURN HOME
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
