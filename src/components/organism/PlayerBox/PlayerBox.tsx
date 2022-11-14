import styled from "@emotion/styled"
import Placeholder from "@assets/placeholder.png"
import { keyframes } from "@emotion/react"
import { useEffect, useState } from "react"

import { ReactComponent as Play } from "@assets/icons/PlayButton.svg"
import { ReactComponent as Pause } from "@assets/icons/PauseButton.svg"
import { ReactComponent as Forward } from "@assets/icons/Forward.svg"
import { ReactComponent as Backward } from "@assets/icons/Backward.svg"
import { ReactComponent as Volume } from "@assets/icons/Volume.svg"
import { ReactComponent as Mute } from "@assets/icons/Mute.svg"
import { ReactComponent as Chevronn } from "@assets/icons/Chevron.svg"
import { Song } from "@/libs/@ramen-music/types"
import { Spinner } from "@/components/atoms/Spinner"

export const PlayerBox = styled.section`
  position: relative;
  width: 512px;
  height: 545px;
  background: #181818;
  border-radius: 1em;
  box-shadow: -1px 15px 24px -4px rgba(0,0,0,0.64);
`

const scroll = keyframes`
  0% {
    transform: translateX(0%);
  }
  50% {
    transform: translateX(-110%);
  }
  50.00001% {
    transform: translateX(110%);
  }
  100% {
    transform: translateX(0%);
  }
`

type PlayerProps = {
  songs?: Song[]
  loading: boolean
  error?: string
}

export const Player = ({songs, loading, error}: PlayerProps) => {

  const [song, setSong] = useState<Song | undefined>(undefined)
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(0)
  
  const audioPlayer: any = document.getElementById('audioPlayer')
  const audioSource: any = document.getElementById('audioSource')

  // Get Address
  const [progress, setProgress] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [playing, setPlaying] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(50)
  const [muted, setMuted] = useState<boolean>(false)

  // Change Song
  const [changingSong, setChangingSong] = useState<boolean>(false)

  const changeSong = (val: number) => {
    setChangingSong(true)
    if (selectedIndex !== undefined && song && songs) {
      const newIndex = selectedIndex + val
      
      // if the song is the last one, go back to the first one
      if (newIndex >= songs.length) {
        setSelectedIndex(0)
        setSong(songs[0])
        audioSource.src = songs[0]?.src
      } else if (newIndex < 0) {
        // if the song is the first one, go to the last one
        setSelectedIndex(songs.length - 1)
        setSong(songs[songs.length - 1])
        audioSource.src = songs[songs.length - 1]?.src
      } else {
        setSelectedIndex(newIndex)
        setSong(songs[newIndex])
        audioSource.src = songs[newIndex]?.src
      }

      audioPlayer.load()
      setDuration(audioPlayer.duration)
      if(playing) {
        audioPlayer.play()
      }
    }
  }

  useEffect(() => {
    if (songs && !song && !loading && !error) {
      setSong(songs[0])
      audioSource.src = songs[0]?.src
      audioPlayer.load()
    }
  }, [songs])

  const handlePlay = () => {
    if (audioPlayer) {
      if (audioPlayer.paused) {
        audioPlayer.play()
        setPlaying(true)
      } else {
        audioPlayer.pause()
        setPlaying(false)
      }
    }
  }

  useEffect(() => {
    if (audioPlayer) {
      audioPlayer.addEventListener('timeupdate', () => {
        setProgress(audioPlayer.currentTime / audioPlayer.duration * 100)
      })
    }
  }, [audioPlayer?.currentTime])

  useEffect(() => {
    // handle song end
    if (audioPlayer) {
      audioPlayer.addEventListener('ended', () => {
        changeSong(1)
      })
    }
  }, [audioPlayer?.ended])

  return (
    <> 
      <audio id="audioPlayer">
        <source id="audioSource" src="" />
      </audio>
      { changingSong && (
        <div style={{
        position: "absolute",
        objectFit: "cover",
        top: "-20%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "302px",
        height: "302px",
        backgroundColor: "#111111",
        borderRadius: "0.9em",
        zIndex: 100,
        }}>
          <div css={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
            <Spinner />
          </div>
        </div>
      )}
      <img src={song?.thumb} alt={song?.name} onLoad={() => setChangingSong(false)} css={{
        position: "absolute",
        objectFit: "cover",
        top: "-20%",
        left: "50%",
        transform: "translateX(-50%)",
        width: '300px',
        height: '300px',
        borderRadius: '1em',
        boxShadow: '-1px 15px 24px -4px rgba(0,0,0,0.64)',
        "&:hover": {
          transform: "translateX(-50%) scale(1.01)",
        },
        transition: "transform 0.3s ease-in-out",
        zIndex: 5,
      }}/>

      <img src={song?.thumb} alt={song?.name} css={{
        position: "absolute",
        objectFit: "cover",
        top: "0",
        left: "0",
        width: '100%',
        height: '100%',
        zIndex: 1,
        borderRadius: '1em',
        filter: 'blur(10px)',
        opacity: 0.05,
      }}/>

      <div css={{
        position: "absolute",
        top: "48%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: '360px',
        height: '40px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          '> #scrollText': {
          animation: `${scroll} 5s linear infinite`,
          },
        },
        zIndex: 5,
      }}>
        <span id="scrollText" css={{
          textAlign: 'center',
          whiteSpace: 'nowrap',
          fontSize: '24px'
        }}>
          {song?.name}
        </span>
      </div>
      <span css={{
        position: "absolute",
        top: "56%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: '360px',
        height: '40px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        color: 'var(--color-secondary)',
        zIndex: 5,
      }}>
        {song?.collection}
      </span>

      <div css={{
        position: "absolute",
        top: "70%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: '300px',
        height: '80px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 5,
        '> *:hover': {
          cursor: 'pointer',
          opacity: 0.5,
          transition: 'opacity 0.2s ease-in-out',
        },
      }}>
        <Backward onClick={() => changeSong(-1)}/>
        <div onClick={() => {
          handlePlay()
        }}>
          {!playing ? <Play /> : <Pause />}
        </div>
        <Forward onClick={() => changeSong(1)}/>
      </div>

      <div css={{
        position: "absolute",
        bottom: "5%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: '90%',
        height: '20px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 5,
        '> *': {
          fontSize: '16px',
        },
      }}>
        <span css={{
          color: 'var(--color-primary)',
          userSelect: 'none',
        }}>{
          audioPlayer && `${Math.floor(audioPlayer.currentTime / 60)}:${Math.floor(audioPlayer.currentTime % 60) < 10 ? `0${Math.floor(audioPlayer.currentTime % 60)}` : Math.floor(audioPlayer.currentTime % 60)}`
        }</span>
        <span css={{
          color: 'var(--color-secondary)',
          userSelect: 'none',
        }}>{
          audioPlayer && `${Math.floor(audioPlayer.duration / 60)}:${Math.floor(audioPlayer.duration % 60) < 10 ? `0${Math.floor(audioPlayer.duration % 60)}` : Math.floor(audioPlayer.duration % 60)}`
        }</span>
      </div>


      {/* Progress Bar Background */}
      <div css={{
        position: "absolute",
        bottom: '0',
        left: '0',
        width: '100%',
        height: '25px',
        backgroundColor: '#0D0D0D',
        borderRadius: '0 0 1em 1em',
        overflow: 'hidden',
        zIndex: 5,
      }}>
              {/* Progress Bar */}
        <div css={{
          position: "absolute",
          bottom: '0',
          left: '0',
          width: progress + '%',
          height: '25px',
          backgroundColor: 'var(--color-primary)',
          borderRadius: progress !== 100 ? '0 1em 1em 1em' : '0 0 1em 1em',
          zIndex: 5,
        }}>
        </div>
      </div>


    </>
  )
}
