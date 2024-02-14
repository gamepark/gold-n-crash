/** @jsxImportSource @emotion/react */
import { GoldNCashRules } from '@gamepark/gold-n-crash/GoldNCashRules'
import { LocationType } from '@gamepark/gold-n-crash/material/LocationType'
import { MaterialType } from '@gamepark/gold-n-crash/material/MaterialType'
import { MaterialHistoryProps, PlayMoveButton, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { displayMaterialHelp, isMoveItemType, MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { getColorText } from '../../utils/color.utils'
import { rulesLinkButton } from '../GoldNCrashHistory'
import { ActionHistory } from './ActionHistory'

export type PlayerTurnRuleHistoryProps = {

} & MaterialHistoryProps

export const PlayerTurnRuleHistory: FC<PlayerTurnRuleHistoryProps> = (props) => {
  const { move, context } = props
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const actionPlayer = context.action.playerId
  const itsMe = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  const rules = new GoldNCashRules(context.game)
  rules.play(move);

  if (isMoveItemType(MaterialType.Card)(move)) {
    const game = context.game
    const item = game.items[MaterialType.Card]![move.itemIndex]
    const itemId = item.id?.front ?? move.reveal?.id?.front
    item.id = { ...item.id, front: itemId }

    if (move.location.type === LocationType.Column) {
      return (
        <ActionHistory context={context}>
          <Trans defaults={itsMe? 'history.player-turn.place.me': 'history.player-turn.place'} values={{ player: name, color: getColorText(t, itemId), column: move.location.id }}>
            <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.Card, item)} local/>
          </Trans>
        </ActionHistory>
      )
    }

    if (move.location.type === LocationType.Discard) {
      return (
        <ActionHistory context={context}>
          <Trans defaults={itsMe? 'history.player-turn.discard.me': 'history.player-turn.discard'} values={{ player: name, color: getColorText(t, itemId)}}>
            <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.Card, item)} local/>
          </Trans>
        </ActionHistory>
      )
    }

    if (move.location.type === LocationType.Hand) {
      return (
        <ActionHistory context={context}>
          <Trans defaults={itsMe? 'history.player-turn.draw.me': itemId? 'history.player-turn.draw.visible': 'history.player-turn.draw'} values={itemId? { player: name, color: getColorText(t, itemId)}: { player: name }}>
            {itemId && <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.Card, item)} local/>}
          </Trans>
        </ActionHistory>
      )
    }

  }

  return null;

}

export type CardHistoryProps = {
  move: MoveItem
} & Omit<MaterialHistoryProps, 'move'>
