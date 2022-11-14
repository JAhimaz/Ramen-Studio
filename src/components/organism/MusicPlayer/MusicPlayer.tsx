import { useFetchMusicNFTs } from "@/libs/@ramen-music/hooks"
import { Player, PlayerBox } from "../PlayerBox"
import { SelectorBox } from "../SelectorBox"

const fetchAddress = () : string => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const tempAddress = urlParams.get('address')
  if(tempAddress) {
    return tempAddress
  }

  return "ESMddXAAxypPjiRnFinnHWfmG5V4H2sZB5P6g3QFXjzUwYF"
}

const MusicPlayer = () => {

  const address = fetchAddress()

  const { songs, loading, error } = useFetchMusicNFTs(address)

  return (
    <PlayerBox>
      <Player 
        songs={songs}
        loading={loading}
        error={error}
      />
    </PlayerBox>
  )
}

export default MusicPlayer

function useParams<T>(): { address: any } {
  throw new Error("Function not implemented.")
}
