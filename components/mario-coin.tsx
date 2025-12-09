"use client"

export function MarioCoin({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-8 h-8 ${className}`}>
      <div className="absolute inset-0 pixel-corners bg-[color:var(--mario-coin)] border-2 border-foreground animate-float-coin flex items-center justify-center">
        <div className="text-[10px] font-[family-name:var(--font-pixel)] text-accent-foreground">$</div>
      </div>
    </div>
  )
}
