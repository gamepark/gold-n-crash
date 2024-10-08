/** @jsxImportSource @emotion/react */
import { GoldNCashRules } from '@gamepark/gold-n-crash/GoldNCashRules'
import { Flag } from '@gamepark/gold-n-crash/material/Flag'
import { MaterialType } from '@gamepark/gold-n-crash/material/MaterialType'
import { MaterialHistoryProps, PlayMoveButton, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType, MaterialMoveBuilder } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import IconCrack from '../../images/help/icons/discard/crack.jpg'
import { rulesLinkButton } from '../GoldNCrashHistory'
import { PictureHistoryEntry } from './PictureHistoryEntry'
import { getFlagColor } from './PlayerTurnRuleHIstory'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export type CrackTheTreasureRuleHistoryProps = {} & MaterialHistoryProps

export const CrackTheTreasureRuleHistory: FC<CrackTheTreasureRuleHistoryProps> = (props) => {
  const { move, context } = props
  const playerId = usePlayerId()
  const action = context.action
  const actionPlayer = action.playerId
  const itsMyAction = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  const opponent = context.game.players.find((p: Flag) => p !== actionPlayer)
  const opponentName = usePlayerName(opponent)
  const rules = new GoldNCashRules(context.game)
  rules.play(move)
  if (!isMoveItemType(MaterialType.Card)(move)) return null

  const card = context.game.items[MaterialType.Card][move.itemIndex]!

  if (opponent === playerId) {
    return (
      <PictureHistoryEntry depth={1} picture={IconCrack} backgroundColor={getFlagColor(actionPlayer)}>
        <Trans defaults={'history.crack-the-treasure.target.me'} values={{
          player: name,
          opponent: opponentName
        }}>
          <strong/>
          <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.Card, card)} local/>
        </Trans>
      </PictureHistoryEntry>
    )
  }

  return (
    <PictureHistoryEntry depth={1} picture={IconCrack} backgroundColor={getFlagColor(actionPlayer)}>
      <Trans defaults={itsMyAction ? 'history.crack-the-treasure.me' : 'history.crack-the-treasure'} values={{
        player: name,
        opponent: opponentName
      }}>
        <strong/>
        <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.Card, card)} local/>
      </Trans>
    </PictureHistoryEntry>
  )
}
