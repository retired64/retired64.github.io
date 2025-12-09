"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TagFilterProps {
  tags: string[]
  selectedTags: string[]
  onTagToggle: (tag: string) => void
}

export function TagFilter({ tags, selectedTags, onTagToggle }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag)
        return (
          <Button
            key={tag}
            onClick={() => onTagToggle(tag)}
            variant={isSelected ? "default" : "outline"}
            className={cn(
              "pixel-corners border-4 font-[family-name:var(--font-pixel)] text-[10px] leading-relaxed transition-all",
              isSelected
                ? "bg-[color:var(--mario-block)] text-accent-foreground border-[color:var(--mario-block)] hover:bg-[color:var(--mario-block)]/90"
                : "border-border hover:bg-muted",
            )}
          >
            {isSelected ? "?" : ""} {tag}
          </Button>
        )
      })}
    </div>
  )
}
