/** @jsxImportSource @emotion/react */
import { Flag } from '@gamepark/gold-n-crash/material/Flag'
import { MaterialType } from '@gamepark/gold-n-crash/material/MaterialType'
import { MaterialHistoryProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api/dist/material/moves/items/MoveItem'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import IconCrack from '../../images/help/icons/discard/crack.jpg'
import IconLoot from '../../images/help/icons/discard/loot.jpg'
import { ActionHistory } from './ActionHistory'

export type LootRuleHistoryProps = {

} & MaterialHistoryProps

export const LootRuleHistory: FC<LootRuleHistoryProps> = (props) => {
  const { move, context } = props
  const playerId = usePlayerId()
  const action = context.action
  const actionPlayer = action.playerId
  const itsMyAction = playerId && actionPlayer === playerId
  const opponent = context.game.players.find((p: Flag) => p !== actionPlayer)!
  const name = usePlayerName(actionPlayer)
  const opponentName = usePlayerName(opponent)
  if (!isMoveItemType(MaterialType.Card)(move)) return null

  if (opponent === playerId) {
    return (
      <ActionHistory consequence picture={IconCrack} context={context}>
        <Trans defaults={'history.loot.target.me'} values={{
          player: name,
          opponent: opponentName
        }}>
          <strong/>
        </Trans>
      </ActionHistory>
    )
  }

  return (
    <ActionHistory consequence picture={IconLoot} context={context}>
      <Trans defaults={itsMyAction ? 'history.loot.me' : 'history.loot'} values={{
        player: name,
        opponent: opponentName
      }}>
        <strong/>
      </Trans>
    </ActionHistory>
  )
}
