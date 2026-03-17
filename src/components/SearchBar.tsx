import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-xl">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search albums..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-14 rounded-xl pl-12 pr-4"
      />
    </div>
  )
}
