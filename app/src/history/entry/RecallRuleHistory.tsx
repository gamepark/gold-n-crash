/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/gold-n-crash/material/MaterialType'
import { MaterialHistoryProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import IconRecall from '../../images/help/icons/discard/recall.jpg'
import { PictureHistoryEntry } from './PictureHistoryEntry'
import { getFlagColor } from './PlayerTurnRuleHIstory'

export type RecallRuleHistoryProps = {

} & MaterialHistoryProps

export const RecallRuleHistory: FC<RecallRuleHistoryProps> = (props) => {
  const { move, context } = props
  const playerId = usePlayerId()
  const action = context.action
  const actionPlayer = action.playerId
  const itsMyAction = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  if (!isMoveItemType(MaterialType.Card)(move)) return null
  const item = context.game.items[move.itemType][move.itemIndex]
  return (
    <PictureHistoryEntry depth={1} picture={IconRecall} backgroundColor={getFlagColor(actionPlayer)}>
      <Trans defaults={itsMyAction ? 'history.recall.me' : 'history.recall'} values={{
        player: name,
        column: item.location.id
      }}>
        <strong/>
      </Trans>
    </PictureHistoryEntry>
  )
}
