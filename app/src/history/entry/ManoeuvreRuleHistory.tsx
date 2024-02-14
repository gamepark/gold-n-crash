/** @jsxImportSource @emotion/react */
import { Flag } from '@gamepark/gold-n-crash/material/Flag'
import { MaterialType } from '@gamepark/gold-n-crash/material/MaterialType'
import { MaterialHistoryProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import IconManoeuvre from '../../images/help/icons/discard/manoeuvre.jpg'
import { ActionHistory } from './ActionHistory'

export type ManoeuvreRuleHistoryProps = {

} & MaterialHistoryProps

export const ManoeuvreRuleHistory: FC<ManoeuvreRuleHistoryProps> = (props) => {
  const { move, context } = props
  const playerId = usePlayerId()
  const action = context.action
  const actionPlayer = action.playerId
  const itsMyAction = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  const opponent = context.game.players.find((p: Flag) => p !== actionPlayer)
  const opponentName = usePlayerName(opponent)
  if (!isMoveItemType(MaterialType.Card)(move)) return null
  const item = context.game.items[move.itemType][move.itemIndex]

  return (
    <ActionHistory consequence picture={IconManoeuvre} context={context}>
      <Trans defaults={itsMyAction ? 'history.manoeuvre.me' : 'history.manoeuvre'} values={{
        player: name,
        opponent: opponentName,
        from: item.location.id,
        to: move.location.id
      }}>
        <strong/>
      </Trans>
    </ActionHistory>
  )
}
