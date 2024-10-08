/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/gold-n-crash/material/LocationType'
import { MaterialType } from '@gamepark/gold-n-crash/material/MaterialType'
import { MaterialHistoryProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType, MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import IconFishing from '../../images/help/icons/play/fishing.jpg'
import { PictureHistoryEntry } from './PictureHistoryEntry'
import { getFlagColor } from './PlayerTurnRuleHIstory'

export type FishingRuleHistoryProps = {

} & MaterialHistoryProps

export const FishingRuleHistory: FC<FishingRuleHistoryProps> = (props) => {
  const { context } = props
  const playerId = usePlayerId()
  const action = context.action
  const actionPlayer = action.playerId
  const itsMyAction = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  const fishing: MoveItem[] = context.action.consequences
    .filter((move) => isMoveItemType(MaterialType.Card)(move) && move.location?.type === LocationType.Hand && move.location?.player === actionPlayer)
  if (!fishing.length) return null

  return (
    <PictureHistoryEntry depth={1} picture={IconFishing} backgroundColor={getFlagColor(actionPlayer)}>
      <Trans defaults={itsMyAction ? 'history.fishing.me' : 'history.fishing'} values={{
        player: name,
        count: fishing.length,
      }}>
        <strong/>
      </Trans>
    </PictureHistoryEntry>
  )
}
