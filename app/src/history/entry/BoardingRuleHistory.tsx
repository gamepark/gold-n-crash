/** @jsxImportSource @emotion/react */
import { Flag } from '@gamepark/gold-n-crash/material/Flag'
import { LocationType } from '@gamepark/gold-n-crash/material/LocationType'
import { MaterialType } from '@gamepark/gold-n-crash/material/MaterialType'
import { MaterialHistoryProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType, MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import IconBoarding from '../../images/help/icons/play/boarding.jpg'
import { ActionHistory } from './ActionHistory'

export type BoardingRuleHistoryProps = {

} & MaterialHistoryProps

export const BoardingRuleHistory: FC<BoardingRuleHistoryProps> = (props) => {
  const { context } = props
  const playerId = usePlayerId()
  const action = context.action
  const actionPlayer = action.playerId
  const itsMyAction = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  const opponent = context.game.players.find((p: Flag) => p !== actionPlayer)!
  const opponentName = usePlayerName(opponent)
  const discards: MoveItem[] = context.action.consequences
    .filter((move) => isMoveItemType(MaterialType.Card)(move) && move.location?.type === LocationType.Discard && move.location?.player === opponent)

  const discardCount = discards.length
  if (!discardCount) return null
  const imTheTarget = playerId && opponent === playerId

  const firstDiscard = context.game.items[discards[0].itemType][discards[0].itemIndex]!
  if (imTheTarget) {
    return (
      <ActionHistory consequence picture={IconBoarding} context={context}>
        <Trans defaults="history.boarding.target.me" values={{
          player: name,
          count: discardCount,
          column: firstDiscard.location.id,
          opponent: opponentName
        }}>
          <strong />
        </Trans>
      </ActionHistory>
    )
  }

  return (
    <ActionHistory consequence picture={IconBoarding} context={context}>
      <Trans defaults={itsMyAction ? 'history.boarding.me' : 'history.boarding'} values={{
        player: name,
        count: discardCount,
        column: firstDiscard.location.id,
        opponent: opponentName
      }}>
        <strong/>
      </Trans>
    </ActionHistory>
  )
}
