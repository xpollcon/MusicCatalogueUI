import { ReactNode, useMemo } from 'react'
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'

interface ApolloWrapperProps {
  children: ReactNode
}

export function ApolloWrapper({ children }: ApolloWrapperProps) {
  const { user } = useAuth0()

  const client = useMemo(() => {
    return new ApolloClient({
      link: new HttpLink({
        uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
        headers: {
          'x-api-key': import.meta.env.VITE_API_KEY,
          'x-user-email': user?.email || '',
        },
      }),
      cache: new InMemoryCache(),
    })
  }, [user?.email])

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
