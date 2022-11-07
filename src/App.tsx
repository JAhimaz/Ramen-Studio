import { Header } from "./layout"
import { ReactComponent as BackgroundLogo } from "@assets/logo.svg"

const App = () => {
  return (
    <div>
      <Header />
      <BackgroundLogo css={{
        position: "fixed",
        bottom: "0",
        right: "0",
        width: "40em",
        height: "auto",
        opacity: "0.03",
        // make it go half way off the screen
        transform: "translate(20%, 10%)",
      }} />
    </div>
  )
}

export default App
