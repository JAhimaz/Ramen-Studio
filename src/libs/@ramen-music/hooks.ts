import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ConvertIPFS, QUERY } from './config'
import { Song } from './types'

const getClient = async () => {
  return new ApolloClient({
    link: createHttpLink({ uri: 'https://gql.rmrk.link/v1/graphql' }),
    cache: new InMemoryCache(),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
    },
  })
}

export const useFetchMusicNFTs = (address: string) => {

  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  if (!address || address === '' || address.startsWith('0x')) return {
    songs: undefined,
    error: 'Invalid address',
    loading: false
  }

  useEffect(() => {
    fetchNFTs()
  }, [address])


  const fetchNFTs = async () => { 
    const client = await getClient()

    setSongs([])
    setLoading(true)
    await client.query({ query: QUERY, variables: { address } })
    .then(({ data }) => {
      const { nfts } = data
      
      nfts && nfts.forEach((nft: any) => {
        const { resources, collection } = nft
        const { metadata_name } = collection

        resources && resources.forEach((resource : any, index: number) => { 
          const { src, thumb, nft_id } = resource

          setSongs(songs => [...songs, {
            id: nft_id,
            index,
            name: `${metadata_name} #${index}`,
            collection: metadata_name,
            thumb: ConvertIPFS(thumb),
            src: ConvertIPFS(src)
          }])

              
        })  
    })})
    .catch((error: any) => {
      console.log(error)
    })
    .finally(() => {
      setLoading(false)
    })
  }

  return {
    songs,
    loading
  }
}