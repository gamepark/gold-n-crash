import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'

export class LootRule extends PlayerTurnRule {
  onRuleStart() {
    const topTreasure = this
      .material(MaterialType.Card)
      .location(LocationType.Discard)
      .player((player) => player !== this.player)
      .maxBy((item) => item.location.x!)

    const moves: MaterialMove[] = []
    moves.push(
      topTreasure.moveItem({
        type: LocationType.Treasure,
        player: this.player
      })
    )

    moves.push(this.rules().startRule(RuleId.PlayerTurn))
    return moves
  }
}
