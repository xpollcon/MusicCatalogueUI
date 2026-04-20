import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { ADD_ALBUM, LIST_ALL_ALBUMS } from '../queries/albums'

interface AddAlbumModalProps {
  onClose: () => void
}

export function AddAlbumModal({ onClose }: AddAlbumModalProps) {
  const [artist, setArtist] = useState('')
  const [title, setTitle] = useState('')
  const [mediaType, setMediaType] = useState('LP')
  const [condition, setCondition] = useState('New')

  const [addAlbum, { loading, error }] = useMutation(ADD_ALBUM, {
    refetchQueries: [{ query: LIST_ALL_ALBUMS }],
    onCompleted: () => onClose(),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addAlbum({ variables: { artist, title, mediaType, condition } })
  }

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '0.875rem',
    outline: 'none',
    boxSizing: 'border-box' as const,
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.75rem',
    color: '#6b7280',
    marginBottom: '4px',
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50,
    }}
      onClick={onClose}
    >
      <div style={{
        backgroundColor: 'white', borderRadius: '10px', padding: '32px',
        width: '100%', maxWidth: '440px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
      }}
        onClick={e => e.stopPropagation()}
      >
        <h2 style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 100, fontSize: '1.5rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '24px' }}>
          Add Album
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Artist</label>
            <input style={inputStyle} value={artist} onChange={e => setArtist(e.target.value)} required />
          </div>
          <div>
            <label style={labelStyle}>Title</label>
            <input style={inputStyle} value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div>
            <label style={labelStyle}>Media Type</label>
            <div style={{ display: 'flex', gap: '24px', marginTop: '4px', flexWrap: 'wrap' }}>
              {['LP', 'CD', 'Cassette', 'Other'].map(option => (
                <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#374151', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="mediaType"
                    value={option}
                    checked={mediaType === option}
                    onChange={() => setMediaType(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label style={labelStyle}>Condition</label>
            <div style={{ display: 'flex', gap: '24px', marginTop: '4px' }}>
              {['New', 'Used'].map(option => (
                <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#374151', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="condition"
                    value={option}
                    checked={condition === option}
                    onChange={() => setCondition(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {error && <p style={{ color: '#ef4444', fontSize: '0.875rem' }}>Error: {error.message}</p>}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
            <button type="button" onClick={onClose}
              style={{ padding: '8px 20px', borderRadius: '6px', border: '1px solid #e5e7eb', backgroundColor: 'white', cursor: 'pointer', fontSize: '0.875rem', color: '#6b7280' }}
            >
              Cancel
            </button>
            <button type="submit" disabled={loading}
              style={{ padding: '8px 20px', borderRadius: '6px', border: 'none', backgroundColor: '#2563eb', color: 'white', cursor: 'pointer', fontSize: '0.875rem', opacity: loading ? 0.6 : 1 }}
            >
              {loading ? 'Saving...' : 'Add Album'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
