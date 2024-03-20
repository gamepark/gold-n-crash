/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/gold-n-crash/material/LocationType'
import { MaterialType } from '@gamepark/gold-n-crash/material/MaterialType'
import { MaterialHistoryProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import StrengthenPlayIcon from '../../images/help/icons/play/strengthen.jpg'
import { PictureHistoryEntry } from './PictureHistoryEntry'
import { getFlagColor } from './PlayerTurnRuleHIstory'

export type StrengthenRuleHistoryProps = {

} & MaterialHistoryProps

export const StrengthenRuleHistory: FC<StrengthenRuleHistoryProps> = (props) => {
  const { context } = props
  const playerId = usePlayerId()
  const action = context.action
  const actionPlayer = action.playerId
  const itsMyAction = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  const drawnCount = context.action.consequences
    .filter((move) => isMoveItemType(MaterialType.Card)(move) && move.location?.type === LocationType.Hand && move.location?.player === actionPlayer)
    .length

  if (!drawnCount) return null

  return (
    <PictureHistoryEntry depth={1} picture={StrengthenPlayIcon} backgroundColor={getFlagColor(actionPlayer)}>
      <Trans defaults={itsMyAction ? 'history.strengthen.me' : 'history.strengthen'} values={{ player: name, count: drawnCount }}>
        <strong />
      </Trans>
    </PictureHistoryEntry>
  )
}
