/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Flag } from '@gamepark/gold-n-crash/material/Flag'
import { Score } from '@gamepark/gold-n-crash/rules/helper/Score'
import { PlayerPanel, usePlayerId, usePlayers, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import IconGold from '../images/help/icons/gold.png'

export const PlayerPanels: FC<any> = () => {
  const playerId = usePlayerId() ?? Flag.Poulpirate
  const players = usePlayers({ sortFromMe: true })
  const rules = useRules()!
  const isOver = rules.game.rule === undefined
  return (
    <>
      {players.map((player) =>
        <PlayerPanel key={player.id} playerId={player.id} color={playerColorCode[player.id]} css={[panelPosition, player.id === playerId? bottomPosition: topPosition ]}>
          {isOver && <div css={goldIndicator}><p>{new Score(rules.game, player.id).gold}</p></div>}

        </PlayerPanel>
      )}
    </>
  )
}

const panelPosition = css`
  position: absolute;
  right: 1em;
  width: 28em;
  height: 8.4em;
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

const goldIndicator = css`
  color: black;
  margin-top: 1em;
  padding-left: 3.5em;
  height: 3em;
  display: flex;
  align-items: center;
  position: absolute;
  right: 1em;
  bottom: 0.5em;
  
  
  background-image: url(${IconGold});
  background-size: contain;
  background-repeat: no-repeat;
  
  > p {
    font-size: 2.5em;
  }
`