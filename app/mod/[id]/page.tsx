import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from 'react'
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Download, ArrowLeft, Star } from "lucide-react"
import modsData from "@/mods.json"
import type { Mod } from "@/types/mod"

interface ModPageProps {
  params: Promise<{
    id: string
  }>
}

// Generate static params for all mods (required for static export)
export async function generateStaticParams() {
  return modsData.mods.map((mod) => ({
    id: mod.id,
  }))
}

export async function generateMetadata({ params }: ModPageProps) {
  const { id } = await params
  const mod = modsData.mods.find((m) => m.id === id) as Mod | undefined

  if (!mod) {
    return {
      title: "Mod Not Found",
    }
  }

  return {
    title: `${mod.title} - Sm64CoopDx Retired64 MODS`,
    description: mod.shortDescription,
  }
}

// Componente separado para el contenido del mod
async function ModContent({ params }: ModPageProps) {
  const { id } = await params
  const mod = modsData.mods.find((m) => m.id === id) as Mod | undefined

  if (!mod) {
    notFound()
  }

  return (
    <>
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/">
          <Button
            variant="outline"
            className="pixel-corners border-4 border-border font-[family-name:var(--font-pixel)] text-[10px] leading-relaxed hover:bg-[color:var(--mario-pipe)] hover:text-primary-foreground hover:border-[color:var(--mario-pipe)] transition-all bg-transparent"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            BACK TO MODS
          </Button>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="pixel-corners border-4 border-border overflow-hidden mb-8">
        <div className="relative w-full h-[400px] md:h-[500px] bg-muted">
          <Image
            src={mod.thumbnail || "/placeholder.svg"}
            alt={mod.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Title & Description */}
          <div className="mb-8">
            <h1 className="font-[family-name:var(--font-pixel)] text-xl md:text-2xl text-primary mb-4 leading-relaxed">
              {mod.title}
            </h1>
            <p className="text-base text-foreground leading-relaxed">{mod.detailedDescription}</p>
          </div>

          {/* Features Section */}
          <Card className="pixel-corners border-4 border-border mb-8">
            <CardContent className="p-6">
              <h2 className="font-[family-name:var(--font-pixel)] text-sm text-primary mb-4 flex items-center gap-2">
                <Star className="h-4 w-4" />
                FEATURES
              </h2>
              <ul className="space-y-3">
                {mod.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-[color:var(--mario-coin)] text-lg shrink-0">•</span>
                    <span className="text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Activation Instructions */}
          <Card className="pixel-corners border-4 border-border mb-8">
            <CardContent className="p-6">
              <h2 className="font-[family-name:var(--font-pixel)] text-sm text-primary mb-4">HOW TO ACTIVATE</h2>
              <div className="bg-muted p-4 pixel-corners border-2 border-border">
                <p className="text-sm leading-relaxed font-mono">{mod.activation}</p>
              </div>
            </CardContent>
          </Card>

          {/* YouTube Video */}
          {mod.youtubeVideoId && (
            <Card className="pixel-corners border-4 border-border mb-8">
              <CardContent className="p-0">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${mod.youtubeVideoId}`}
                    title={`${mod.title} - Gameplay Video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Screenshot Gallery */}
          {mod.images.length > 0 && (
            <div className="mb-8">
              <h2 className="font-[family-name:var(--font-pixel)] text-sm text-primary mb-4">SCREENSHOTS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mod.images.map((image, index) => (
                  <div key={index} className="pixel-corners border-4 border-border overflow-hidden">
                    <div className="relative w-full h-64 bg-muted">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${mod.title} Screenshot ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            {/* Download Card */}
            {mod.hasDownload && (
              <Card className="pixel-corners border-4 border-border mb-6 bg-card">
                <CardContent className="p-6">
                  <Button
                    asChild
                    size="lg"
                    className="w-full pixel-corners border-4 border-foreground font-[family-name:var(--font-pixel)] text-[10px] leading-relaxed bg-[color:var(--mario-coin)] text-accent-foreground hover:bg-[color:var(--mario-coin)]/90 hover:border-[color:var(--mario-coin)] transition-all mb-4"
                  >
                    <a href={mod.downloadUrl || "#"} download>
                      <Download className="mr-2 h-4 w-4" />
                      DOWNLOAD MOD
                    </a>
                  </Button>
                  <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
                    Free and safe download
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Tags Card */}
            <Card className="pixel-corners border-4 border-border">
              <CardContent className="p-6">
                <h3 className="font-[family-name:var(--font-pixel)] text-xs text-primary mb-4">TAGS</h3>
                <div className="flex flex-wrap gap-2">
                  {mod.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="pixel-corners border-2 text-[10px] px-2 py-1 leading-relaxed"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default async function ModPage({ params }: ModPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded mb-6 w-32"></div>
            <div className="h-[400px] bg-muted rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-32 bg-muted rounded"></div>
                <div className="h-32 bg-muted rounded"></div>
              </div>
              <div className="lg:col-span-1">
                <div className="h-20 bg-muted rounded mb-6"></div>
                <div className="h-32 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        }>
          <ModContent params={params} />
        </Suspense>
      </main>
      <footer className="border-t-4 border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Made with ❤️ for Retired64
          </p>
        </div>
      </footer>
    </div>
  )
}
