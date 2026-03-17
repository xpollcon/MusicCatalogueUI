import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { useAuth0 } from '@auth0/auth0-react'
import musicCatalogue from './assets/music_catalogue_banner_2.jpg'
import './App.css'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SearchBar } from './components/SearchBar'
import { LIST_ALL_ALBUMS } from './queries/albums'

interface Album {
  id: string
  artist: string
  title: string
  mediaType: string
  condition: string
  username: string
}

interface AlbumsData {
  listAllAlbums: Album[]
}

function App() {
  const {
    isLoading: authLoading,
    isAuthenticated,
    error: authError,
    loginWithRedirect: login,
    logout: auth0Logout,
    user,
  } = useAuth0()

  const { loading, error, data } = useQuery<AlbumsData>(LIST_ALL_ALBUMS, {
    skip: !isAuthenticated,
  })

  const [searchQuery, setSearchQuery] = useState('')

  const signup = () => login({ authorizationParams: { screen_hint: "signup" } })
  const logout = () => auth0Logout({ logoutParams: { returnTo: window.location.origin } })

  const musicData = data?.listAllAlbums || []
  const filteredData = musicData.filter((item) =>
    item.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.mediaType.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (authLoading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      Loading authentication...
    </div>
  )

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '16px' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '16px' }}>Music Catalogue</h1>
        {authError && <p style={{ color: '#ef4444' }}>Error: {authError.message}</p>}
        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            onClick={() => signup()}
            style={{ padding: '8px 24px', backgroundColor: '#2563eb', color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
          >
            Signup
          </button>
          <button
            onClick={() => login()}
            style={{ padding: '8px 24px', backgroundColor: '#16a34a', color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
          >
            Login
          </button>
        </div>
      </div>
    )
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      Loading albums...
    </div>
  )
  if (error) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      Error: {error.message}
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', padding: '32px' }}>
      {/* Header bar */}
      <div style={{ width: '100%', maxWidth: '768px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
        <p style={{ fontSize: '0.875rem' }}>Logged in as {user?.email}</p>
        <button
          onClick={() => logout()}
          style={{ padding: '8px 16px', backgroundColor: '#dc2626', color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}
        >
          Logout
        </button>
      </div>

      {/* Banner image */}
      <div style={{ width: '100%', maxWidth: '768px', display: 'flex', justifyContent: 'center' }}>
        <img src={musicCatalogue} style={{ width: '100%', height: 'auto' }} alt="Music Catalogue" />
      </div>

      {/* Search bar */}
      <div style={{ width: '100%', maxWidth: '768px', display: 'flex', justifyContent: 'center' }}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Table */}
      <div style={{ width: '100%', maxWidth: '768px', border: '2px solid black', borderRadius: '8px', overflow: 'hidden' }}>
        <Table>
          <TableHeader>
            <TableRow style={{ borderBottom: '1px solid black' }}>
              <TableHead style={{ textAlign: 'center', borderRight: '1px solid black' }}>Artist</TableHead>
              <TableHead style={{ textAlign: 'center', borderRight: '1px solid black' }}>Title</TableHead>
              <TableHead style={{ textAlign: 'center', borderRight: '1px solid black' }}>Media Type</TableHead>
              <TableHead style={{ textAlign: 'center' }}>Condition</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} style={{ textAlign: 'center' }}>No albums found</TableCell>
              </TableRow>
            ) : (
              filteredData.map((item: Album) => (
                <TableRow key={item.id} style={{ borderBottom: '1px solid black' }}>
                  <TableCell style={{ textAlign: 'center', borderRight: '1px solid black' }}>{item.artist}</TableCell>
                  <TableCell style={{ textAlign: 'center', borderRight: '1px solid black' }}>{item.title}</TableCell>
                  <TableCell style={{ textAlign: 'center', borderRight: '1px solid black' }}>{item.mediaType}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{item.condition}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default App
