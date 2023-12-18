/** @jsxImportSource @emotion/react */
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
      <LoadingScreen display={loading} author="Antoine Bauza, Corentin Lebrat, Ludovic Maublanc et Théo Rivière" artist="Camille Chaussy et Valériane Holley" publisher="GRRRE GAMES" developer="Game Park"/>
      <MaterialHeader rulesStepsHeaders={Headers} loading={loading}/>
      <Menu/>
      <FailuresDialog/>
      <FullscreenDialog/>
    </>
  )
}
