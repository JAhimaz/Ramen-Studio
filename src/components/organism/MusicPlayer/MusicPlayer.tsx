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

const MusicPlayer = () => {
  return (
    <PlayerBox>
      <Player />
    </PlayerBox>
  )
}

const PlayerBox = styled.section`
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

const Player = () => {
  
  // Get Address
  const [progress, setProgress] = useState(50)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const [muted, setMuted] = useState(false)


  return (
    <>
      <img src={Placeholder} alt={"Placeholder Image"} css={{
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

      <img src={Placeholder} alt={"Placeholder Image"} css={{
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
          Rich Valentino - Midnight Club T1
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
        Rich Valentino - Midnight Club
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
        <Backward />
        {playing ? <Play /> : <Pause />}
        <Forward />
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
        }}>0:00</span>
        <span css={{
          color: 'var(--color-secondary)',
        }}>3:00</span>
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
          transition: 'width 1s ease-in-out',
          zIndex: 5,
        }}>
        </div>
      </div>


    </>
  )
}

export default MusicPlayer