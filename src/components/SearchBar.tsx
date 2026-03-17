import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '20rem' }}>
      <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', height: '16px', width: '16px', color: '#6b7280' }} />
      <Input
        placeholder="Search albums..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ height: '36px', borderRadius: '8px', paddingLeft: '32px', paddingRight: '12px', width: '100%', fontSize: '0.875rem' }}
      />
    </div>
  )
}
