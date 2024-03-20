/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/gold-n-crash/material/MaterialType'
import { RuleId } from '@gamepark/gold-n-crash/rules/RuleId'
import { MaterialHistoryProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType, MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { PictureHistoryEntry } from './PictureHistoryEntry'
import PrestigiousGuestBack from '../../images/prestigious-guest/PrestigiousGuestBack.jpg'
import { getFlagColor } from './PlayerTurnRuleHIstory'

export type SecureGuestHistoryProps = {
  move: MoveItem
} & Omit<MaterialHistoryProps, 'move'>

export const SecureGuestHistory: FC<SecureGuestHistoryProps> = (props) => {
  const { move, context } = props
  const playerId = usePlayerId()
  const action = context.action
  const actionPlayer = action.playerId
  const itsMyAction = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  if (!isMoveItemType(MaterialType.Card)(move)) return null
  const depth = context.game.rule?.id === RuleId.EndOfCardResolution? 1: 2

  return (
    <PictureHistoryEntry depth={depth} picture={PrestigiousGuestBack} pictureCss={guestIcon} backgroundColor={getFlagColor(actionPlayer)}>
      <Trans defaults={itsMyAction ? 'history.secure-guest.me' : 'history.secure-guest'} values={{
        player: name
      }}>
        <strong/>
      </Trans>
    </PictureHistoryEntry>
  )
}

const guestIcon = css`
  border-radius: 0.2em;
  border: 0.03em solid black;
  margin-right: 0.5em;
  width: 2.2em;
  height: auto;
  transform: rotateZ(-90deg);
`
