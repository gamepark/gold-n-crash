import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'

export class CrackTheTreasureChestRule extends PlayerTurnRule {
  onRuleStart() {
    const topTreasure = this
      .material(MaterialType.Card)
      .location(LocationType.Treasure)
      .player((player) => player !== this.player)
      .maxBy((item) => item.location.x!)

    const moves: MaterialMove[] = []
    moves.push(
      topTreasure.moveItem((item) => ({
        type: LocationType.Discard,
        player: item.location.player
      }))
    )

    moves.push(this.startRule(RuleId.PlayerTurn))
    return moves
  }
}
