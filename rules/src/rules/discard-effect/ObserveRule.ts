import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { RuleId } from '../RuleId'

export class ObserveRule extends PlayerTurnRule {

  onRuleStart() {
    console.warn("Implements observe rule")
    return [
      this.rules().startRule(RuleId.PlayerTurn)
    ]
  }

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    return super.getPlayerMoves()
  }
}
