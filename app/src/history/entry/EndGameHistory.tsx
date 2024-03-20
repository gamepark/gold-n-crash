/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GoldNCashRules } from '@gamepark/gold-n-crash/GoldNCashRules'
import { HistoryEntry, MaterialHistoryProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const EndGameHistory: FC<MaterialHistoryProps> = (props) => {
  const { move, context } = props
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const [playerA, playerB] = context.game.players
  const rules = new GoldNCashRules(context.game)
  const score = rules.rankPlayers(playerA, playerB)
  const winner = score < 0 ? playerA : playerB
  const winnerName = usePlayerName(winner)
  rules.play(move)

  if (score !== 0 && winner === playerId) {
    return (
      <>
        <HistoryEntry borderBottom css={winnerStyle}>{t('result.comp.victory')}</HistoryEntry>
        <HistoryEntry css={endOfGameStyle}>{t('history.game.end')}</HistoryEntry>
      </>
    )
  }

  if (score === 0) {
    return (
      <>
        <HistoryEntry borderBottom css={winnerStyle}>{t('result.comp.tie.all')}</HistoryEntry>
        <HistoryEntry css={endOfGameStyle}>{t('history.game.end')}</HistoryEntry>
      </>
    )
  }

  return (
    <>
      <HistoryEntry borderBottom css={winnerStyle}>{t('result.comp.winner', { player: winnerName })}</HistoryEntry>
      <HistoryEntry css={endOfGameStyle}>{t('history.game.end')}</HistoryEntry>
    </>
  )
}

const winnerStyle = css`
  color: green;
  text-align: center;
  font-weight: bold;
  font-style: italic;
`

const endOfGameStyle = css`
  color: grey;
  text-align: center;
  font-style: italic
`