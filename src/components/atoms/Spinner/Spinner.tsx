import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"

const spinnerAnim = keyframes`
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
`

const Spinner = () => {
  return (
    <Loader>
      <div></div><div></div><div></div>
    </Loader>
  )
}

const Loader = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  > div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 16px;
    background: var(--color-primary);
    animation: ${spinnerAnim} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }

  > div:nth-of-type(1) {
    left: 8px;
    animation-delay: -0.24s;
  }
  > div:nth-of-type(2) {
    left: 32px;
    animation-delay: -0.12s;
  }
  > div:nth-of-type(3) {
    left: 56px;
    animation-delay: 0;
  }
`

export default Spinner