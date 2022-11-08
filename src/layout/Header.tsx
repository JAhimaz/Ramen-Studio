import styled from "@emotion/styled"
import { keyframes } from '@emotion/react'
import { ReactComponent as Logo } from "@assets/logo.svg"

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const Header = () => {
  return (
    <Navigation>
      <div css={{
        display: "flex",
        alignItems: "flex-end",
        flexDirection: "row",
      }}>
        <Logo css={{
          width: "3em",
          height: "auto",

          // On hover spin 360deg
          "&:hover": {
            animation: `${spin} 3s linear infinite`,
          },
        }} />
        <article css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginLeft: "1em",
        }}>
          <span css={{
            fontSize: "2em",
            fontWeight: "500",
          }}>
            <span css={{
              color: "var(--color-primary)",
            }}>Ramen</span> Studio
          </span>
          <span css={{
            fontSize: "1em",
            fontWeight: "500",
            marginLeft: "0.1em",
          }}>
            RMRK Music Player
          </span>
        </article>
      </div>
    </Navigation>
  )
}

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
`

export default Header