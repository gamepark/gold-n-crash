import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'

export class StrengthenRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove<number, number, number>[] {
    return super.getPlayerMoves()
  }
}
