/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react'
import { FailuresDialog, FullscreenDialog, LoadingScreen, MaterialHeader, Menu, useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { useEffect, useState } from 'react'
import { GameDisplay } from './GameDisplay'
import { Headers } from './headers/Headers'

export default function App() {
  const game = useGame<MaterialGame>()
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), 2000)
  }, [])
  const loading = !game || isJustDisplayed
  return (
    <>
      { !!game && <GameDisplay players={game.players.length} /> }
      <LoadingScreen display={loading} author="Someone" artist="Somebody" publisher="Nobody" developer="You"/>
      <MaterialHeader rulesStepsHeaders={Headers} loading={loading}/>
      <Menu/>
      <FailuresDialog/>
      <FullscreenDialog/>
      <Global styles={style}/>
    </>
  )
}

const style = css`
  @supports(padding:max(0px)) {
    html, body, header, footer {
      padding-left: min(0dvmin, env(safe-area-inset-left));
      padding-right: min(0dvmin, env(safe-area-inset-right));
    }
  }
`
