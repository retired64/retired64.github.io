"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export function SearchBar({ onSearch, placeholder = "Search mods..." }: SearchBarProps) {
  const [value, setValue] = useState("")

  // Debounced search with 300ms delay
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value)
    }, 300)

    return () => clearTimeout(timer)
  }, [value, onSearch])

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
        <Search className="h-5 w-5" />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pixel-corners border-4 border-border pl-12 pr-4 py-6 text-base focus:border-primary transition-colors bg-card"
        aria-label="Search mods by name or tags"
      />
    </div>
  )
}
