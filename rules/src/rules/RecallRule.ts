import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'

export class RecallRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove<number, number, number>[] {
    return super.getPlayerMoves()
  }
}
