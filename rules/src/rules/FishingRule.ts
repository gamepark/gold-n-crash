import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'

export class FishingRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove<number, number, number>[] {
    return super.getPlayerMoves()
  }
}
