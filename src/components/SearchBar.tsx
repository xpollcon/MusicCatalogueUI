import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '36rem' }}>
      <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', height: '20px', width: '20px', color: '#6b7280' }} />
      <Input
        placeholder="Search albums..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ height: '56px', borderRadius: '12px', paddingLeft: '48px', paddingRight: '16px', width: '100%', fontSize: '1rem' }}
      />
    </div>
  )
}
