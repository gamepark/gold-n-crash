import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { DiscardColumn } from '../helper/DiscardColumn'
import { Memory } from '../Memory'
import { PrestigiousGuestRule } from '../prestigious-guests/PrestigiousGuestRule'
import { RuleId } from '../RuleId'

export class EndOfCardResolutionRule extends PlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove[] = []
    moves.push(...new PrestigiousGuestRule(this.game, this.column).secureGuestMoves)
    moves.push(...new DiscardColumn(this.game, this.column).discardMoves)
    moves.push(this.rules().startRule(RuleId.PlayerTurn))
    return moves
  }

  get column() {
    return this.remind(Memory.Column)
  }
}
