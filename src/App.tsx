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
import { LIST_ALL_ALBUMS } from './queries/albums'

interface Album {
  id: string
  artist: string
  title: string
  mediaType: string
  condition: string
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
    skip: !isAuthenticated, // Only fetch data if authenticated
  })

  const signup = () => login({ authorizationParams: { screen_hint: "signup" } })
  const logout = () => auth0Logout({ logoutParams: { returnTo: window.location.origin } })

  const musicData = data?.listAllAlbums || []

  // Show loading while Auth0 is initializing
  if (authLoading) return <div className="flex items-center justify-center min-h-screen">Loading authentication...</div>

  // Show login/signup if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-3xl font-bold mb-4">Music Catalogue</h1>
        {authError && <p className="text-red-500">Error: {authError.message}</p>}
        <div className="flex gap-4">
          <button 
            onClick={() => signup()}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Signup
          </button>
          <button 
            onClick={() => login()}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Login
          </button>
        </div>
      </div>
    )
  }

  // Show loading while fetching albums
  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading albums...</div>
  
  // Show error if GraphQL query failed
  if (error) return <div className="flex items-center justify-center min-h-screen">Error: {error.message}</div>

  // Show the music catalogue for authenticated users
  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="w-full flex justify-between items-center max-w-3xl">
        <div>
          <p className="text-sm">Logged in as {user?.email}</p>
        </div>
        <button 
          onClick={() => logout()}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="card" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <img src={musicCatalogue} style={{ width: '50%', height: 'auto' }} alt="Music Catalogue" />
      </div>

      <div className="w-full max-w-3xl" style={{ border: '2px solid black', borderRadius: '8px', overflow: 'hidden' }}>
        <Table>
          <TableHeader>
            <TableRow style={{ borderBottom: '1px solid black' }}>
              <TableHead className="text-center" style={{ borderRight: '1px solid black' }}>Artist</TableHead>
              <TableHead className="text-center" style={{ borderRight: '1px solid black' }}>Title</TableHead>
              <TableHead className="text-center" style={{ borderRight: '1px solid black' }}>Media Type</TableHead>
              <TableHead className="text-center">Condition</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {musicData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">No albums found</TableCell>
              </TableRow>
            ) : (
              musicData.map((item: Album) => (
                <TableRow key={item.id} style={{ borderBottom: '1px solid black' }}>
                  <TableCell className="text-center" style={{ borderRight: '1px solid black' }}>{item.artist}</TableCell>
                  <TableCell className="text-center" style={{ borderRight: '1px solid black' }}>{item.title}</TableCell>
                  <TableCell className="text-center" style={{ borderRight: '1px solid black' }}>{item.mediaType}</TableCell>
                  <TableCell className="text-center">{item.condition}</TableCell>
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
