import { Content, Header } from "@layouts"
import { ReactComponent as BackgroundLogo } from "@assets/logo.svg"
import { MusicPlayer } from "@components/organism/MusicPlayer"

const App = () => {
  return (
    <div css={{
      height: "100%",
    }}>
      <Header />
      <BackgroundLogo css={{ position: "fixed", bottom: "0", right: "0", width: "40em", height: "auto", opacity: "0.03", transform: "translate(20%, 10%)", 'zIndex': -1}} />
      <Content>
        <MusicPlayer />
      </Content>
    </div>
  )
}

export default App
