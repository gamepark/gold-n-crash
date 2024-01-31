/** @jsxImportSource @emotion/react */
//import { css } from '@emotion/react'
import { GameTable, GameTableNavigation, usePlayerId } from '@gamepark/react-game'
import { FC } from 'react'
import { PlayerPanels } from './panels/PlayerPanels'

type GameDisplayProps = {
  players: number
}

export const GameDisplay: FC<GameDisplayProps> = () => {
  const playerId = usePlayerId()
  return <>
    <GameTable
      xMin={-52}
      xMax={52}
      yMin={!playerId? -34: -30}
      yMax={34}
      margin={{ top: 7, left: 0, right: 0, bottom: 0 }}
      //css={css`background-color: rgba(255, 255, 255, 0.7)`}
    >
      <GameTableNavigation />
    </GameTable>
    <PlayerPanels/>
  </>
}
