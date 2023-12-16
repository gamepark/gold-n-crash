/** @jsxImportSource @emotion/react */
import { FailuresDialog, FullscreenDialog, LoadingScreen, MaterialHeader, Menu, useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { useEffect, useState } from 'react'
import { GameDisplay } from './GameDisplay'
import { Headers } from './headers/Headers'
import { css, Global } from '@emotion/react'

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
      <LoadingScreen display={loading} author="Antoine Bauza, Corentin Lebrat, Ludovic Maublanc et Théo Rivière" artist="Camille Chaussy et Valériane Holley" publisher="GRRRE GAMES" developer="Game Park"/>
      <MaterialHeader rulesStepsHeaders={Headers} loading={loading}/>
      <Menu/>
      <FailuresDialog/>
      <FullscreenDialog/>
      <Global styles={styles} />
    </>
  )
}

const styles = css`
  .react-transform-wrapper {
    margin: 7em calc(0em + ${getComputedStyle(document.documentElement).getPropertyValue("--sar")}) 0 calc(0em + ${getComputedStyle(document.documentElement).getPropertyValue("--sal")}) !important;
  }
  [aria-label="Menu"], [title="Go to full screen"], [title="Passer en plein écran"], [title="Annuler mon dernier coup"], [title="Undo my last move"] {
    width: max(calc(env(safe-area-inset-right) + 0.5em), 2.5em) !important;
  }

  [aria-label="Menu"] > svg {
    margin-right: max(env(safe-area-inset-right) * 0.5, 0px) !important;
  }
  
  .css-1uhw33p-Menu, .css-1nms1n5 {
    padding-right: max(env(safe-area-inset-right), 0.75em) !important;
  }
  :root {
    --sat: env(safe-area-inset-top);
    --sar: env(safe-area-inset-right);
    --sab: env(safe-area-inset-bottom);
    --sal: env(safe-area-inset-left);
  }
`
