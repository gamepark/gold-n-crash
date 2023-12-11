import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'

export class BombingRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove<number, number, number>[] {
    return super.getPlayerMoves()
  }
}
