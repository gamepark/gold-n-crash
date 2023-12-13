import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { RuleId } from './RuleId'
import { MaterialType } from '../material/MaterialType'

export class StrengthenRule extends PlayerTurnRule {

  onRuleStart() {
    const deck = this.deck

    const moves: MaterialMove[] = deck
      .sort((item) => -item.location.x!)
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

  get deck() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.CrewDeck)
      .player(this.player)
  }
}
