/** @jsxImportSource @emotion/react */
import { GoldNCashRules } from '@gamepark/gold-n-crash/GoldNCashRules'
import { Flag } from '@gamepark/gold-n-crash/material/Flag'
import { MaterialType } from '@gamepark/gold-n-crash/material/MaterialType'
import { ZeppelinState } from '@gamepark/gold-n-crash/material/Zeppelin'
import { MaterialHistoryProps, PlayMoveButton, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { displayMaterialHelp, isMoveItemType } from '@gamepark/rules-api'
import { FC, useEffect } from 'react'
import { Trans } from 'react-i18next'
import IconBomb from '../../images/help/icons/play/bombard.jpg'
import { rulesLinkButton } from '../GoldNCrashHistory'
import { ActionHistory } from './ActionHistory'

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
  useEffect(() => {
    rules.play(move)
  }, [])
  if (isMoveItemType(MaterialType.ZeppelinCard)(move)) {
    const zeppelin = context.game.items[MaterialType.ZeppelinCard][move.itemIndex]!
    const imTheTarget = playerId && zeppelin.location.player === playerId

    if (move.location.rotation === ZeppelinState.PENDING_REVELATION) {
      if (imTheTarget) {
        return (
          <ActionHistory consequence picture={IconBomb} context={context}>
            <Trans defaults="history.bombing.me" values={{ player: name, opponent: opponentName, column: zeppelin.location.id }}>
              <strong/>
              <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.ZeppelinCard, zeppelin)} local/>
            </Trans>
          </ActionHistory>
        )
      }
      return (
        <ActionHistory consequence picture={IconBomb} context={context}>
          <Trans defaults={itsMyAction ? 'history.bombing.opponent.me' : 'history.bombing.opponent'}
                 values={{ player: name, opponent: opponentName, column: zeppelin.location.id }}>
            <strong/>
            <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.ZeppelinCard, zeppelin)} local/>
          </Trans>
        </ActionHistory>
      )
    }

    if (move.location.rotation === ZeppelinState.VISIBLE) {

      if (imTheTarget) {
        return (
          <ActionHistory consequence depth={2} context={context}>
            <Trans defaults="history.bombing.me.destroy" values={{ player: name, opponent: opponentName, column: zeppelin.location.id }}>
              <strong/>
              <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.ZeppelinCard, zeppelin)} local/>
            </Trans>
          </ActionHistory>
        )
      }
      return (
        <ActionHistory consequence depth={2} context={context}>
          <Trans defaults={itsMyAction ? 'history.bombing.opponent.destroy.me' : 'history.bombing.opponent.destroy'}
                 values={{ player: name, opponent: opponentName, column: zeppelin.location.id }}>
            <strong/>
            <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.ZeppelinCard, zeppelin)} local/>
          </Trans>
        </ActionHistory>
      )

    }
  }

  return null
}
