/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/gold-n-crash/material/LocationType'
import { MaterialType } from '@gamepark/gold-n-crash/material/MaterialType'
import { MaterialHistoryProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api/dist/material/moves/items/MoveItem'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import StrengthenPlayIcon from '../../images/help/icons/play/strengthen.jpg'
import { ActionHistory } from './ActionHistory'

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
    <ActionHistory consequence picture={StrengthenPlayIcon} context={context}>
      <Trans defaults={itsMyAction ? 'history.strengthen.me' : 'history.strengthen'} values={{ player: name, count: drawnCount }}>
        <strong />
      </Trans>
    </ActionHistory>
  )
}
