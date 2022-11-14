import { gql } from '@apollo/client'

export const QUERY = gql`
  query ($address: String!) {
    nfts(
			where: { 
				owner: { _eq: $address }, 
				burned: { _eq: "" },
				resources: { metadata_content_type: { _eq: "audio"}}
			}
		){			
      metadata_name
			collection {
				metadata_name
			}
      resources (where: {metadata_content_type: { _eq: "audio" }}){
        metadata_content_type
        src
				nft_id
				thumb
      }
    }
  }
`

export const ConvertIPFS = (ipfs: string) => {
	return ipfs.replace('ipfs://', 'https://talisman.mypinata.cloud/')
}