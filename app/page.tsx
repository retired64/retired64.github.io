"use client"

import { useState, useMemo, useCallback } from "react"
import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { TagFilter } from "@/components/tag-filter"
import { ModCard } from "@/components/mod-card"
import { Button } from "@/components/ui/button"
import modsData from "@/mods.json"
import type { Mod } from "@/types/mod"

const MODS_PER_PAGE = 6

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [visibleCount, setVisibleCount] = useState(MODS_PER_PAGE)

  const mods = modsData.mods as Mod[]

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    mods.forEach((mod) => {
      mod.tags.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [mods])

  // Memoized filtered mods for performance
  const filteredMods = useMemo(() => {
    return mods.filter((mod) => {
      // Search by name
      const matchesSearch =
        searchQuery === "" ||
        mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mod.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mod.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      // Filter by tags (AND logic - mod must have all selected tags)
      const matchesTags = selectedTags.length === 0 || selectedTags.every((tag) => mod.tags.includes(tag))

      return matchesSearch && matchesTags
    })
  }, [mods, searchQuery, selectedTags])

  const visibleMods = useMemo(() => {
    return filteredMods.slice(0, visibleCount)
  }, [filteredMods, visibleCount])

// ESTO ES LO NUEVO (Copia y pega esto):
  const handleTagToggle = useCallback((tag: string) => {
    setSelectedTags((prev) => prev.includes(tag) ? [] : [tag])
  }, [])

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + MODS_PER_PAGE)
  }, [])

  const hasMore = visibleCount < filteredMods.length

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <SearchBar onSearch={setSearchQuery} placeholder="Search by mod name or tags..." />
        </div>

        {/* Tag Filter Section */}
        <div className="mb-8">
          <h2 className="font-[family-name:var(--font-pixel)] text-sm text-center mb-4 text-muted-foreground">
            FILTER BY TAGS
          </h2>
          <TagFilter tags={allTags} selectedTags={selectedTags} onTagToggle={handleTagToggle} />
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">
            Showing {visibleMods.length} of {filteredMods.length} mods
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Mods Grid */}
        {filteredMods.length === 0 ? (
          <div className="text-center py-16">
            <div className="pixel-corners bg-card border-4 border-border p-8 max-w-md mx-auto">
              <div className="text-6xl mb-4">:(</div>
              <h3 className="font-[family-name:var(--font-pixel)] text-sm mb-4 text-foreground leading-relaxed">
                NO MODS FOUND
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedTags([])
                }}
                className="pixel-corners border-4 border-foreground font-[family-name:var(--font-pixel)] text-[10px] leading-relaxed"
              >
                RESET FILTERS
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {visibleMods.map((mod) => (
                <ModCard key={mod.id} mod={mod} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center">
                <Button
                  onClick={handleLoadMore}
                  size="lg"
                  className="pixel-corners border-4 border-foreground font-[family-name:var(--font-pixel)] text-[10px] leading-relaxed hover:bg-[color:var(--mario-pipe)] hover:text-primary-foreground hover:border-[color:var(--mario-pipe)] transition-all"
                >
                  LOAD MORE ({filteredMods.length - visibleCount} REMAINING)
                </Button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-xs text-muted-foreground leading-relaxed">Made with ❤️ for Retired64</p>
        </div>
      </footer>
    </div>
  )
}
