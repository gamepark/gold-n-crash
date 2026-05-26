import { css } from '@emotion/react'
import { isPrestigiousGuest } from '@gamepark/gold-n-crash/material/Card'
import { Flag } from '@gamepark/gold-n-crash/material/Flag'
import { MaterialType } from '@gamepark/gold-n-crash/material/MaterialType'
import { RuleId } from '@gamepark/gold-n-crash/rules/RuleId'
import { linkButtonCss, LogDescription, MoveComponentContext, MovePlayedLogDescription } from '@gamepark/react-game'
import { isMoveItemType, isStartPlayerTurn, isStartRule, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { BoardingRuleHistory } from './entry/BoardingRuleHistory'
import { BombingRuleHistory } from './entry/BombingRuleHistory'
import { CrackTheTreasureRuleHistory } from './entry/CrackTheTreasureRuleHistory'
import { FishingRuleHistory } from './entry/FishingRuleHistory'
import { LootRuleHistory } from './entry/LootRuleHistory'
import { ManoeuvreRuleHistory } from './entry/ManoeuvreRuleHistory'
import { NewRoundHistory } from './entry/NewRoundHistory'
import { ObserveRuleHistory } from './entry/ObserveRuleHistory'
import { PlayerTurnRuleHistory } from './entry/PlayerTurnRuleHIstory'
import { RecallRuleHistory } from './entry/RecallRuleHistory'
import { SecureGuestHistory } from './entry/SecureGuestHistory'
import { SecureRuleHistory } from './entry/SecureRuleHistory'
import { StrengthenRuleHistory } from './entry/StrengthenRuleHistory'

export class GoldNCrashHistory implements LogDescription<MaterialMove, Flag, MaterialGame<Flag>> {
  getMovePlayedLogDescription(
    move: MaterialMove,
    context: MoveComponentContext<MaterialMove, Flag, MaterialGame<Flag>>
  ): MovePlayedLogDescription | undefined {
    const game = context.game
    const player = context.action.playerId

    if (isStartPlayerTurn(move) && move.id === RuleId.PlayerTurn && move.player === game.players[0]) {
      return { Component: NewRoundHistory }
    }

    if (isMoveItemType(MaterialType.Card)(move)) {
      const item = game.items[move.itemType]![move.itemIndex]
      if (isPrestigiousGuest(item.id?.front)) {
        return { Component: SecureGuestHistory, player }
      }
    }

    if (isStartRule(move) && move.id === RuleId.Strengthen) return { Component: StrengthenRuleHistory, player }
    if (isStartRule(move) && move.id === RuleId.Fishing) return { Component: FishingRuleHistory, player }
    if (isStartRule(move) && move.id === RuleId.Boarding) return { Component: BoardingRuleHistory, player }
    if ((isStartRule(move) && move.id === RuleId.Observe) || game.rule?.id === RuleId.Observe) return { Component: ObserveRuleHistory, player }
    if (game.rule?.id === RuleId.CrackTheTreasureChest) return { Component: CrackTheTreasureRuleHistory, player }
    if (game.rule?.id === RuleId.Recall) return { Component: RecallRuleHistory, player }
    if (game.rule?.id === RuleId.Loot) return { Component: LootRuleHistory, player }
    if (game.rule?.id === RuleId.Manoeuvre) return { Component: ManoeuvreRuleHistory, player }
    if (game.rule?.id === RuleId.Secure) return { Component: SecureRuleHistory, player }
    if (game.rule?.id === RuleId.Bombing) return { Component: BombingRuleHistory, player }
    if (game.rule?.id === RuleId.PlayerTurn) return { Component: PlayerTurnRuleHistory, player }

    return undefined
  }
}

export const rulesLinkButton = [linkButtonCss, css`
  color: inherit;
  background-color: transparent;
  font-style: italic;
`]
