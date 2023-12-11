import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'

export class CrackTheTreasureChestRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove<number, number, number>[] {
    return super.getPlayerMoves()
  }
}
