/** @jsxImportSource @emotion/react */
import { GoldNCashRules } from '@gamepark/gold-n-crash/GoldNCashRules'
import { Flag } from '@gamepark/gold-n-crash/material/Flag'
import { MaterialType } from '@gamepark/gold-n-crash/material/MaterialType'
import { ZeppelinState } from '@gamepark/gold-n-crash/material/Zeppelin'
import { HistoryEntry, MaterialHistoryProps, PlayMoveButton, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType, MaterialMoveBuilder } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import IconBomb from '../../images/help/icons/play/bombard.jpg'
import { rulesLinkButton } from '../GoldNCrashHistory'
import { PictureHistoryEntry } from './PictureHistoryEntry'
import { getFlagColor } from './PlayerTurnRuleHIstory'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export type BombingRuleHistoryProps = {} & MaterialHistoryProps

export const BombingRuleHistory: FC<BombingRuleHistoryProps> = (props) => {
  const { move, context } = props
  const playerId = usePlayerId()
  const action = context.action
  const actionPlayer = action.playerId
  const itsMyAction = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  const opponentName = usePlayerName(context.game.players.find((p: Flag) => p !== actionPlayer))
  const rules = new GoldNCashRules(context.game)
  rules.play(move)
  if (isMoveItemType(MaterialType.ZeppelinCard)(move)) {
    const zeppelin = context.game.items[MaterialType.ZeppelinCard][move.itemIndex]!
    const imTheTarget = playerId && zeppelin.location.player === playerId

    if (zeppelin.location.rotation === ZeppelinState.PENDING_REVELATION) {
      if (imTheTarget) {
        return (
          <PictureHistoryEntry depth={1} picture={IconBomb} backgroundColor={getFlagColor(actionPlayer)}>
            <Trans defaults="history.bombing.me" values={{ player: name, opponent: opponentName, column: zeppelin.location.id }}>
              <strong/>
              <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.ZeppelinCard, zeppelin)} local/>
            </Trans>
          </PictureHistoryEntry>
        )
      }
      return (
        <PictureHistoryEntry depth={1} picture={IconBomb} backgroundColor={getFlagColor(actionPlayer)}>
          <Trans defaults={itsMyAction ? 'history.bombing.opponent.me' : 'history.bombing.opponent'}
                 values={{ player: name, opponent: opponentName, column: zeppelin.location.id }}>
            <strong/>
            <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.ZeppelinCard, zeppelin)} local/>
          </Trans>
        </PictureHistoryEntry>
      )
    }

    if (zeppelin.location.rotation === ZeppelinState.VISIBLE) {

      if (imTheTarget) {
        return (
          <HistoryEntry depth={2} backgroundColor={getFlagColor(actionPlayer)}>
            <Trans defaults="history.bombing.me.destroy" values={{ player: name, opponent: opponentName, column: zeppelin.location.id }}>
              <strong/>
              <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.ZeppelinCard, zeppelin)} local/>
            </Trans>
          </HistoryEntry>
        )
      }

      return (
        <HistoryEntry depth={2} backgroundColor={getFlagColor(actionPlayer)}>
          <Trans defaults={itsMyAction ? 'history.bombing.opponent.destroy.me' : 'history.bombing.opponent.destroy'}
                 values={{ player: name, opponent: opponentName, column: zeppelin.location.id }}>
            <strong/>
            <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.ZeppelinCard, zeppelin)} local/>
          </Trans>
        </HistoryEntry>
      )

    }
  }

  return null
}
