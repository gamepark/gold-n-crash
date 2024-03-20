/** @jsxImportSource @emotion/react */
import { Flag } from '@gamepark/gold-n-crash/material/Flag'
import { MaterialType } from '@gamepark/gold-n-crash/material/MaterialType'
import { MaterialHistoryProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import IconCrack from '../../images/help/icons/discard/crack.jpg'
import IconLoot from '../../images/help/icons/discard/loot.jpg'
import { PictureHistoryEntry } from './PictureHistoryEntry'
import { getFlagColor } from './PlayerTurnRuleHIstory'

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
      <PictureHistoryEntry depth={1} picture={IconCrack} backgroundColor={getFlagColor(actionPlayer)}>
        <Trans defaults={'history.loot.target.me'} values={{
          player: name,
          opponent: opponentName
        }}>
          <strong/>
        </Trans>
      </PictureHistoryEntry>
    )
  }

  return (
    <PictureHistoryEntry depth={1} picture={IconLoot} backgroundColor={getFlagColor(actionPlayer)}>
      <Trans defaults={itsMyAction ? 'history.loot.me' : 'history.loot'} values={{
        player: name,
        opponent: opponentName
      }}>
        <strong/>
      </Trans>
    </PictureHistoryEntry>
  )
}
