/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Flag } from '@gamepark/gold-n-crash/material/Flag'
import { PlayerPanel, usePlayerId, usePlayers } from '@gamepark/react-game'
import { FC } from 'react'

export const PlayerPanels: FC<any> = () => {
  const playerId = usePlayerId() ?? Flag.Poulpirate
  const players = usePlayers({ sortFromMe: true })
  return (
    <>
      {players.map((player) =>
        <PlayerPanel key={player.id} playerId={player.id} color={playerColorCode[player.id]} css={[panelPosition, player.id === playerId? bottomPosition: topPosition ]} />
      )}
    </>
  )
}

const panelPosition = css`
  position: absolute;
  right: 1em;
  width: 28em;
  height: 8em;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-radius: 3em 1.5em 1.5em 3.2em;
`

const topPosition = css`
  top: 8.5em;
`

const bottomPosition = css`
  top: 85em;
`

export const playerColorCode: Record<Flag, string> = {
  [Flag.Chamourai]: '#f49833',
  [Flag.Poulpirate]: '#3ab5b0'
}
