import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const slideIn = keyframes`
  100% {
    transform: translateX(0%);
  }
`
    
export const SelectorBox = styled.section`
  position: relative;
  width: 512px;
  height: 545px;
  background: #181818;
  border-radius: 1em;
  box-shadow: -1px 15px 24px -4px rgba(0,0,0,0.64);
  margin-right: 2em;
  transform: translateX(100%);
  animation: ${slideIn} 0.5s ease-in-out;
  animation-fill-mode: forwards;
`
