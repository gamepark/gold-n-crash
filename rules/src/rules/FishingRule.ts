import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { RuleId } from './RuleId'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'

export class FishingRule extends PlayerTurnRule {
  onRuleStart() {
    const discard = this.discard

    const moves: MaterialMove[] = discard
      .limit(1)
      .moveItems({
        type: LocationType.Hand,
        player: this.player
      })

    moves.push(
      this.rules().startPlayerTurn(RuleId.PlayerTurn, this.player)
    )

    return moves
  }

  get discard() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Discard)
      .player(this.player)
  }
}
