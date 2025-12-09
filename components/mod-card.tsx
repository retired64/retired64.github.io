"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Mod } from "@/types/mod"

interface ModCardProps {
  mod: Mod
}

export function ModCard({ mod }: ModCardProps) {
  return (
    <Card className="pixel-corners border-4 border-border overflow-hidden hover:border-primary transition-colors group">
      <div className="relative h-48 overflow-hidden bg-muted">
        <Image
          src={mod.thumbnail || "/placeholder.svg"}
          alt={mod.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="font-[family-name:var(--font-pixel)] text-xs leading-relaxed line-clamp-2 mb-2">
          {mod.title}
        </CardTitle>
        <CardDescription className="text-xs leading-relaxed line-clamp-2">{mod.shortDescription}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex flex-wrap gap-2">
          {mod.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="pixel-corners border-2 text-[10px] px-2 py-0.5 leading-relaxed"
            >
              {tag}
            </Badge>
          ))}
          {mod.tags.length > 3 && (
            <Badge variant="outline" className="pixel-corners border-2 text-[10px] px-2 py-0.5">
              +{mod.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/mod/${mod.id}`} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button
            className="w-full pixel-corners border-4 border-foreground font-[family-name:var(--font-pixel)] text-[10px] leading-relaxed hover:bg-[color:var(--mario-coin)] hover:text-accent-foreground hover:border-[color:var(--mario-coin)] transition-all"
            size="lg"
          >
            VIEW / DOWNLOAD
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
