/** @jsxImportSource @emotion/react */
import { GameTable } from '@gamepark/react-game'
import { FC } from 'react'
import { PlayerPanels } from './panels/PlayerPanels'
import { css } from '@emotion/react'

type GameDisplayProps = {
  players: number
}

export const GameDisplay: FC<GameDisplayProps> = () => {
  return <>
    <GameTable
      xMin={-50}
      xMax={50}
      yMin={-35}
      yMax={35}
      margin={{ top: 7, left: 0, right: 30, bottom: 0 }}
      css={css`background-color: rgba(255, 255, 255, 0.52)`}
    />
    <PlayerPanels/>
  </>
}
